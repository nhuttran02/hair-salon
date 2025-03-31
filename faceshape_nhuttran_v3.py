from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import torch
import torchvision.transforms as T
from PIL import Image
import io
import numpy as np
import onnxruntime as ort
import os

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Get current directory
current_dir = os.path.dirname(os.path.abspath(__file__))

# Image preprocessing
transform = T.Compose([
    T.Resize((224, 224)),
    T.ToTensor(),
    T.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])

# Load ONNX model
class_names = ['Heart', 'Oblong', 'Oval', 'Round', 'Square']
model_path = os.path.join(current_dir, 'classify_face_shape_model_by_nhuttran.onnx')

try:
    ort_session = ort.InferenceSession(model_path)
except Exception as e:
    print(f"🔥 Cannot load ONNX model: {e}")
    ort_session = None

def preprocess_image(image_bytes):
    """Preprocess input image"""
    try:
        # Open and convert image
        image = Image.open(io.BytesIO(image_bytes)).convert('RGB')
        
        # Check image size
        if image.size[0] > 2000 or image.size[1] > 2000:
            # Resize large images while maintaining aspect ratio
            ratio = min(2000 / image.size[0], 2000 / image.size[1])
            new_size = (int(image.size[0] * ratio), int(image.size[1] * ratio))
            image = image.resize(new_size, Image.Resampling.LANCZOS)
        
        # Convert to tensor
        image_tensor = transform(image).unsqueeze(0)
        return image_tensor.numpy()
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error processing image: {str(e)}")

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    if ort_session is None:
        return JSONResponse(content={"error": "Model not loaded"}, status_code=500)

    try:
        # Check file size (e.g., 5MB limit)
        MAX_FILE_SIZE = 5 * 1024 * 1024  # 5MB in bytes
        file_size = 0
        contents = await file.read()
        file_size = len(contents)
        
        if file_size > MAX_FILE_SIZE:
            return JSONResponse(
                content={"error": f"File too large. Maximum size is {MAX_FILE_SIZE/1024/1024}MB"},
                status_code=413
            )

        input_tensor = preprocess_image(contents)

        # Predict
        inputs = {ort_session.get_inputs()[0].name: input_tensor}
        outputs = ort_session.run(None, inputs)

        # Process results
        predicted_class_index = np.argmax(outputs[0])
        predicted_class = class_names[predicted_class_index]

        return JSONResponse(content={"class": predicted_class})

    except HTTPException as he:
        return JSONResponse(content={"error": he.detail}, status_code=he.status_code)
    except IOError:
        return JSONResponse(content={"error": "Cannot read image file"}, status_code=400)
    except RuntimeError as e:
        return JSONResponse(content={"error": f"Model runtime error: {str(e)}"}, status_code=500)
    except Exception as e:
        return JSONResponse(content={"error": f"Unknown error: {str(e)}"}, status_code=500)