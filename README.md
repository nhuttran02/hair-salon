# 💇‍♀️ Hair-Salon
A comprehensive solution for personalized hairstyle recommendations based on face shape analysis.

## 🌟 Overview
Hair-Salon is a application that leverages machine learning to provide users with personalized hairstyle suggestions. By analyzing the user's face shape, the system recommends hairstyles that best suit their features.

## 🛠️ Features
* Face Shape Detection: Classifies user-uploaded images into one of five face shapes: Heart, Oblong, Oval, Round, or Square.

* Personalized Recommendations: Suggests hairstyles tailored to the detected face shape.

* User-Friendly Interface: Simplifies the process of uploading images and viewing recommendations.

* Scalable Architecture: Utilizes modern frameworks and tools to ensure scalability and maintainability.

## 🧰 Tech Stack
### Frontend
* Framework: Vue.js

* Styling: Tailwind CSS

* State Management: Vuex

* Routing: Vue Router

### Backend
* Framework: FastAPI, Vuejs

* Machine Learning: TensorFlow/Keras

* Image Processing: OpenCV

* Model Serving: ONNX Runtime

### Deployment
* Containerization: Docker

* Web Server: Nginx

* CI/CD: GitHub Actions

* Domain & SSL: Certbot

## 🚀 Getting Started
### Prerequisites
* Node.js: Ensure you have Node.js installed for the frontend.

* Python 3.8+: Required for the backend.

* Docker: For containerization and deployment.

### Installation
#### Frontend
##### 1.Navigate to the frontend directory:

```
cd FE
```
##### 2.Install dependencies:

```
npm install
```
##### 3.Start the development server:

```
npm run serve
```
#### Backend
##### 1.Navigate to the backend directory:
```
cd BE
```
##### 2.Create and activate a virtual environment:
```
python -m venv env
source env/bin/activate 
```
##### 3.Install dependencies:

```
pip install -r requirements.txt
```
##### 4.Start the FastAPI server:
```
uvicorn main:app --reload
``` 
### Deployment with Docker
#### 1.Build and run the Docker containers:

```
docker-compose up --build
```
#### 2.Access the application:

* Frontend: http://localhost:8080

* Backend API: http://localhost:8000/docs

### 📂 Project Structure
```
Copy
Edit
hair-salon/
├── BE/                      # Backend directory
│   ├── models/              # Pre-trained models
│   ├── routers/             # API route definitions
│   ├── services/            # Business logic and services
│   ├── main.py              # FastAPI application entry point
│   ├── controllers/
│   └── requirements.txt     # Backend dependencies
└── FE/                      # Frontend directory
    ├── public/              # Public assets
    ├── src/
    │   ├── assets/          # Image and media assets
    │   ├── components/      # Vue.js components
    │   ├── views/           # Vue.js views
    │   ├── App.vue          # Root Vue component
    │   └── main.js          # Entry point for Vue application
    └── package.json         # Frontend dependencies
```
### 🤝 Contributing
Contributions are welcome! Please fork this repository and submit a pull request for any enhancements or bug fixes.

## 👤 FaceShape Detector
Automatic face shape classification for personalized hairstyle recommendations.

### 📌 Overview
FaceShape Detector is a machine learning model designed to classify face shapes into Heart, Oblong, Oval, Round, and Square. This model is integrated into a hairstyle recommendation system to provide personalized suggestions for users based on their face shape.

#### 🚀 Features
* Face Shape Classification (5 categories: Heart, Oblong, Oval, Round, Square)

* Pretrained EfficientNetV2 Model (Optimized for high accuracy)

* FastAPI Backend for API Deployment

* ONNX Runtime for Efficient Inference

* Dockerized for Seamless Deployment on VPS

* Secured with Nginx & HTTPS (SSL with Certbot)

#### 🛠 Installation
🔹 Clone the repository
```
git clone https://github.com/nhuttran02/hair-salon.git  
cd hair-salon
```
🔹 Install dependencies
```
pip install -r requirements.txt
```
🔹 Run the API
```
uvicorn app.main:app --host 0.0.0.0 --port 8000
```
Access API at: http://localhost:8000/docs

#### ⚡ Technologies Used
* Python (FastAPI, ONNX, PyTorch, EfficientNetV2)

* Computer Vision (Image preprocessing, OpenCV)

* Deployment (Docker, VPS, Nginx, Certbot for HTTPS)

* CI/CD (GitHub Actions)

#### 🔗 Live Demo
Try it here: https://salon.nhuttran.id.vn/detect

#### 🔗Link Faceshape Detector Model Images
https://hub.docker.com/repository/docker/sadeyes/faceshape_bynhuttran_v4/general

### 📬 Contact
* Author: Nhut Tran

* Email: nhuttran170802@gmail.com

* GitHub: nhuttran02

* LinkedIn: tnhnhut
