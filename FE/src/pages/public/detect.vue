<template>
    <div class="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style="background-image: url('https://images.pexels.com/photos/705255/pexels-photo-705255.jpeg');">

        <!-- Overlay để làm mờ nền -->
        <div class="absolute inset-0 bg-black bg-opacity-15 z-0"></div>

        <div class=" bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg z-10">
            <h1 class="text-3xl font-extrabold text-center text-gray-800 mb-6">
                Face Shape Detector
            </h1>

            <h3 class="text-center text-blue-800 bg-blue-100 border-l-4 border-blue-500 p-4 mb-6">
                Note: Results may be less accurate if the face is partially covered by hair.
            </h3>

            <!-- Upload File -->
            <div class="mb-6">
                <input type="file" id="fileInput" accept="image/*" class="hidden" @change="previewImage">
                <label for="fileInput"
                    class="block text-center bg-blue-600 text-white py-3 rounded-xl shadow-md hover:bg-blue-700 transition-all cursor-pointer">
                    📤 Upload Image
                </label>
            </div>

            <!-- Mobile Direct Camera Access -->
            <div v-if="isMobile" class="mb-6">
                <input type="file" id="mobileCameraInput" accept="image/*" capture="user" class="hidden"
                    @change="previewImage">
                <label for="mobileCameraInput"
                    class="block text-center bg-purple-600 text-white py-3 rounded-xl shadow-md hover:bg-purple-700 transition-all cursor-pointer">
                    📸 Take Photo with Camera
                </label>
            </div>

            <!-- Desktop/Web Camera -->
            <div v-if="!isMobile" class="mb-6 text-center">
                <button @click="toggleCamera"
                    class="w-full bg-purple-600 text-white py-3 rounded-xl shadow-md hover:bg-purple-700 transition-all">
                    📸 Take a Photo
                </button>

                <div v-if="isCameraOn" class="relative mt-4">
                    <video ref="video" class="w-full rounded-xl shadow-md" autoplay playsinline
                        :style="facingMode === 'user' ? 'transform: scaleX(-1)' : ''"></video>

                    <button v-if="isCameraOn" @click="captureImage"
                        class="w-full bg-green-500 text-white py-3 mt-4 rounded-xl shadow-md hover:bg-green-600 transition-all">
                        ✅ Capture
                    </button>
                </div>
            </div>

            <!-- Preview Image -->
            <div v-if="imagePreview" class="mb-6">
                <div class="flex justify-center">
                    <img :src="imagePreview" class="w-64 h-64 object-cover rounded-xl shadow-md"
                        :style="isMirrorMode ? 'transform: scaleX(-1)' : ''" alt="Preview">
                </div>
                <!-- Nút điều chỉnh mirror mode khi đã chụp ảnh -->
                <div class="flex justify-center mt-3">
                    <button @click="toggleMirrorMode"
                        class="bg-indigo-500 text-white px-4 py-2 rounded-xl shadow-md hover:bg-indigo-600 transition-all">
                        {{ isMirrorMode ? '🔄 Normal Mode' : '🪞 Mirror Mode' }}
                    </button>
                </div>
            </div>

            <!-- Camera Status Info -->
            <div v-if="cameraError" class="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-center">
                {{ cameraError }}
            </div>

            <!-- Submit Button -->
            <button id="uploadBtn" @click="predictFaceShape" :disabled="loading || !selectedFile"
                class="w-full bg-green-600 text-white py-3 rounded-xl shadow-md hover:bg-green-700 transition-all flex items-center justify-center"
                :class="{ 'opacity-50 cursor-not-allowed': loading || !selectedFile }">
                <svg v-if="loading" class="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                    </path>
                </svg>
                🚀 Submit
            </button>

            <!-- Kết quả -->
            <div id="result" class="mt-6">
                <div v-if="result"
                    class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl shadow-md"
                    role="alert">
                    <strong class="font-bold">Result: </strong>
                    <span class="block sm:inline">{{ result }}</span>
                </div>
                <div v-else-if="error"
                    class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl shadow-md" role="alert">
                    ❌ {{ error }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { FACE_DETECT_API } from '@/config/api';

export default {
    data() {
        return {
            selectedFile: null,
            imagePreview: null,
            loading: false,
            result: null,
            error: null,
            isCameraOn: false,
            videoStream: null,
            facingMode: "user", // Mặc định là camera trước
            cameraError: null, // Thông báo lỗi về camera
            isMirrorMode: false, // Chế độ gương cho hình ảnh đã chụp
            originalImageBlob: null, // Lưu blob gốc của hình ảnh
            isMobile: false, // Biến xác định thiết bị di động
        };
    },
    mounted() {
        // Kiểm tra xem có phải thiết bị di động không
        this.checkIfMobile();
    },
    methods: {
        checkIfMobile() {
            // Kiểm tra thiết bị di động dựa trên user agent
            const userAgent = navigator.userAgent || navigator.vendor || window.opera;
            this.isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
            console.log("Device is mobile:", this.isMobile);
        },
        previewImage(event) {
            // Reset previous image
            this.imagePreview = null;
            this.selectedFile = null;
            this.originalImageBlob = null;

            this.loading = true;
            this.cameraError = null;

            this.selectedFile = event.target.files[0];
            if (this.selectedFile) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.imagePreview = e.target.result;

                    this.processImageOrientation(e.target.result, (processedImageDataUrl) => {
                        if (processedImageDataUrl) {
                            this.imagePreview = processedImageDataUrl;

                            this.dataURLtoBlob(processedImageDataUrl, (blob) => {
                                this.selectedFile = new File([blob], 'processed.jpg', { type: 'image/jpeg' });
                                this.originalImageBlob = blob;
                            });
                        } else {
                            this.originalImageBlob = this.selectedFile;
                        }

                        this.isMirrorMode = false;
                        this.loading = false;
                    });
                };
                reader.onerror = () => {
                    this.cameraError = "Failed to read the image file";
                    this.loading = false;
                };
                reader.readAsDataURL(this.selectedFile);
            } else {
                this.loading = false;
            }
        },
        // Xử lý định hướng của ảnh từ camera điện thoại (fix lỗi ảnh bị xoay)
        processImageOrientation(dataUrl, callback) {
            const img = new Image();
            img.onload = () => {
                // Chỉ cần xử lý nếu ảnh lớn
                if (img.width <= 1 || img.height <= 1) {
                    callback(null); // Không có gì để xử lý
                    return;
                }

                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                // Lúc này chỉ cần vẽ ảnh bình thường, không xoay
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);

                // Trả về ảnh đã xử lý
                callback(canvas.toDataURL('image/jpeg', 0.95));
            };
            img.onerror = () => {
                callback(null); // Trả về null nếu có lỗi
            };
            img.src = dataUrl;
        },
        dataURLtoBlob(dataUrl, callback) {
            const binary = atob(dataUrl.split(',')[1]);
            const array = [];
            for (let i = 0; i < binary.length; i++) {
                array.push(binary.charCodeAt(i));
            }
            callback(new Blob([new Uint8Array(array)], { type: 'image/jpeg' }));
        },
        toggleCamera() {
            if (this.isMobile) {
                document.getElementById('mobileCameraInput').click();
                return;
            }

            this.isCameraOn = !this.isCameraOn;
            if (this.isCameraOn) {
                this.startCamera();
            } else {
                this.stopCamera();
                // Reset image preview when camera is turned off
                this.imagePreview = null;
                this.selectedFile = null;
                this.originalImageBlob = null;
            }
        },
        async startCamera() {
            this.cameraError = null;
            try {
                if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                    throw new Error("Your browser doesn't support camera access");
                }

                const constraints = {
                    video: {
                        width: { ideal: 1280 },
                        height: { ideal: 720 },
                        facingMode: this.facingMode
                    },
                    audio: false
                };

                const stream = await navigator.mediaDevices.getUserMedia(constraints);
                this.videoStream = stream;
                const video = this.$refs.video;
                if (video) {
                    video.srcObject = stream;
                    video.setAttribute('playsinline', true);
                    video.setAttribute('autoplay', true);
                    await video.play();
                }
            } catch (error) {
                console.error("Camera access error:", error);
                this.cameraError = `Could not access the camera: ${error.message || "Unknown error"}`;
                this.isCameraOn = false;
            }
        },
        stopCamera() {
            if (this.videoStream) {
                this.videoStream.getTracks().forEach(track => {
                    track.stop();
                });
                this.videoStream = null;
            }
        },
        captureImage() {
            const video = this.$refs.video;
            if (!video) return;

            try {
                const canvas = document.createElement('canvas');
                canvas.width = video.videoWidth || 640;
                canvas.height = video.videoHeight || 480;
                const context = canvas.getContext('2d');

                // Draw image from video to canvas
                context.drawImage(video, 0, 0, canvas.width, canvas.height);

                // Reset previous image preview
                this.imagePreview = null;
                this.selectedFile = null;
                this.originalImageBlob = null;

                // Set new image preview
                this.imagePreview = canvas.toDataURL('image/jpeg', 0.95);

                // Create blob and file from canvas
                canvas.toBlob((blob) => {
                    if (blob) {
                        this.selectedFile = new File([blob], 'captured.jpg', { type: 'image/jpeg' });
                        this.originalImageBlob = blob;
                    }
                }, 'image/jpeg', 0.95);

                // Set mirror mode based on camera
                this.isMirrorMode = this.facingMode === "user";

                this.stopCamera();
                this.isCameraOn = false;
            } catch (error) {
                console.error("Error capturing image:", error);
                this.cameraError = "Failed to capture image from camera";
            }
        },
        toggleMirrorMode() {
            this.isMirrorMode = !this.isMirrorMode;

            // Cập nhật selectedFile dựa trên chế độ mirror mới
            if (this.originalImageBlob) {
                const canvas = document.createElement('canvas');
                const img = new Image();

                img.onload = () => {
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const ctx = canvas.getContext('2d');

                    if (this.isMirrorMode) {
                        // Áp dụng hiệu ứng gương
                        ctx.translate(canvas.width, 0);
                        ctx.scale(-1, 1);
                    }

                    ctx.drawImage(img, 0, 0);

                    canvas.toBlob((blob) => {
                        if (blob) {
                            this.selectedFile = new File([blob], 'processed.jpg', { type: 'image/jpeg' });
                        }
                    }, 'image/jpeg', 0.95);
                };

                img.src = URL.createObjectURL(this.originalImageBlob);
            }
        },
        async predictFaceShape() {
            if (!this.selectedFile) {
                alert('Please select or take a photo');
                return;
            }

            this.loading = true;
            this.result = null;
            this.error = null;

            const formData = new FormData();
            formData.append('file', this.selectedFile);

            try {
                const response = await axios.post(FACE_DETECT_API, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                if (response.data.class) {
                    this.result = response.data.class;
                } else {
                    this.error = "Unable to recognize face shape";
                }
            } catch (error) {
                if (error.response && error.response.status === 413) {
                    this.error = "The image size is too large, please choose a smaller image";
                } else {
                    this.error = `Error: ${error.message}`;
                }
            } finally {
                this.loading = false;
            }
        },
    },
    beforeUnmount() {
        // Đảm bảo camera được tắt khi component bị hủy
        this.stopCamera();
    },
};
</script>

<style scoped>
#uploadBtn[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
}
</style>