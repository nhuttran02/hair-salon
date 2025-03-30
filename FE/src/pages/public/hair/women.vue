<template>
    <div class="bg-gray-100 flex flex-col items-center justify-center min-h-screen">
        <h1 class="text-2xl font-bold mb-5">Face Swapping for Women</h1>

        <!-- Form Swap -->
        <form @submit.prevent="submitForm" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="img1">
                    Upload Image 1:
                </label>
                <div class="flex items-center">
                    <input ref="img1Input"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="file" id="img1" name="img1" @change="handleFileChange($event, 'img1')" accept="image/*"
                        required />
                    <div v-if="img1Preview" class="ml-4 w-20 h-20">
                        <img :src="img1Preview" class="w-full h-full object-cover rounded-md shadow-sm"
                            alt="Image 1 Preview" />
                    </div>
                </div>
            </div>

            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="img2">
                    Upload Image 2:
                </label>
                <div class="flex items-center">
                    <input ref="img2Input"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="file" id="img2" name="img2" @change="handleFileChange($event, 'img2')" accept="image/*"
                        required />
                    <div v-if="img2Preview" class="ml-4 w-20 h-20">
                        <img :src="img2Preview" class="w-full h-full object-cover rounded-md shadow-sm"
                            alt="Image 2 Preview" />
                    </div>
                </div>
            </div>
            <button
                class="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit">
                Swap Faces
            </button>
        </form>

        <!-- Kết quả Face Swapping -->
        <div id="result" class="mt-6">
            <img v-if="resultImageUrl" :src="resultImageUrl" class="mx-auto shadow-lg rounded w-1/2 max-w-md"
                alt="Result Image" />
        </div>

        <!-- Hiển thị hình ảnh -->
        <img v-if="resultImage" :src="resultImage" alt="Swap Result" @error="handleImageError" />

        <!-- Thêm log trực tiếp -->
        <div v-if="resultImage">
            Result Image URL: {{ resultImage }}
        </div>

        <!-- Danh sách kiểu tóc Nữ -->
        <div class="mt-12 w-full px-8">
            <h2 class="text-xl font-bold mb-5 text-center">Women Hairstyles</h2>

            <!-- Loading State -->
            <div v-if="loading" class="flex justify-center items-center">
                <div class="animate-spin rounded-full h-10 w-10 border-t-2 border-pink-500"></div>
            </div>

            <!-- Error State -->
            <div v-if="error" class="text-center text-red-500 bg-red-100 p-4 rounded">
                {{ error }}
            </div>

            <!-- Hairstyles Grid -->
            <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <div v-for="hairstyle in femaleHairstyles" :key="hairstyle.hs_id"
                    class="bg-white shadow-md rounded-lg overflow-hidden transform transition hover:scale-105">
                    <img :src="formatImageUrl(hairstyle.hs_image_url)" :alt="hairstyle.hs_name"
                        class="w-full h-48 object-cover" />
                    <div class="p-4">
                        <h3 class="font-bold text-lg mb-2">{{ hairstyle.hs_name }}</h3>
                        <p class="text-gray-600 text-sm line-clamp-3 mb-4">
                            {{ hairstyle.hs_des }}
                        </p>
                        <button @click="selectHairstyleImage(hairstyle.hs_image_url)"
                            class="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded transition duration-300">
                            Swap This Image
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { REFACE_API } from "@/config/api";

export default {
    data() {
        return {
            img1: null,
            img2: null,
            img1Preview: null,
            img2Preview: null,
            resultImageUrl: null,
            femaleHairstyles: [],
            loading: true,
            error: null,
            selectedImageToSwap: null,
        };
    },
    methods: {
        handleFileChange(event, imageKey) {
            const file = event.target.files[0];

            // Lưu file
            this[imageKey] = file;

            // Tạo preview
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    // Động từ imageKey để set preview
                    this[`${imageKey}Preview`] = e.target.result;
                };
                reader.readAsDataURL(file);
            } else {
                // Nếu không có file, reset preview
                this[`${imageKey}Preview`] = null;
            }

            // Reset selectedImageToSwap nếu cần
            if (this.selectedImageToSwap) {
                this.selectedImageToSwap = null;
            }
        },

        // Điều chỉnh selectHairstyleImage để cập nhật preview
        async selectHairstyleImage(imageUrl) {
            try {
                const fullImageUrl = this.formatImageUrl(imageUrl);

                const response = await axios({
                    method: 'get',
                    url: fullImageUrl,
                    responseType: 'blob'
                });

                const file = new File([response.data], 'hairstyle-image.jpg', {
                    type: response.headers['content-type']
                });

                if (file.size > 0) {
                    this.img2 = file;

                    // Tạo preview
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        this.img2Preview = e.target.result;
                    };
                    reader.readAsDataURL(file);

                    // Tạo DataTransfer để set files cho input
                    const dataTransfer = new DataTransfer();
                    dataTransfer.items.add(file);
                    this.$refs.img2Input.files = dataTransfer.files;

                    // Cuộn lên đầu form
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                } else {
                    throw new Error('Invalid file size');
                }
            } catch (error) {
                console.error("Error selecting hairstyle image:", error);
                alert("Could not select this image. Please try a different image.");
            }
        },

        async submitForm() {
            const formData = new FormData();
            formData.append("file1", this.img1);
            formData.append("file2", this.img2);

            try {
                const response = await axios.post(REFACE_API, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

                if (response.status === 200) {
                    // Handle the response with both swapped images
                    const { img1_swapped, img2_swapped } = response.data;
                    // Convert base64 to image URLs
                    this.resultImageUrl = `data:image/jpeg;base64,${img1_swapped}`;
                    this.resultImageUrl2 = `data:image/jpeg;base64,${img2_swapped}`;
                }
            } catch (error) {
                console.error(error);
                alert("An error occurred while processing your request.");
            }
        },

        // Hàm cleanup để tránh rò rỉ bộ nhớ
        beforeUnmount() {
            if (this.resultImage) {
                console.log('Revoking Object URL:', this.resultImage);
                URL.revokeObjectURL(this.resultImage);
            }
        },

        formatImageUrl(url) {
            if (!url) return 'path/to/default/image.jpg';

            const cleanUrl = url.replace(/\\/g, '/');
            return `http://localhost:3000/${cleanUrl}`;
        },

        async fetchFemaleHairstyles() {
            this.loading = true;
            this.error = null;

            try {
                const response = await axios.get("http://localhost:3000/api/v1/hairstyles/female");

                if (response.data && response.data.data && response.data.data.hairstyles) {
                    this.femaleHairstyles = response.data.data.hairstyles;
                } else {
                    throw new Error("Invalid response structure");
                }
            } catch (error) {
                console.error("Detailed error:", error);

                if (error.response) {
                    this.error = error.response.data.message || "Server error occurred";
                } else if (error.request) {
                    this.error = "No response from server. Please check your connection.";
                } else {
                    this.error = "An unexpected error occurred";
                }
            } finally {
                this.loading = false;
            }
        },
        handleImageError(event) {
            console.error('Image display error:', event);
            console.log('Image source:', event.target.src);
        }
    },
    created() {
        this.fetchFemaleHairstyles();
    },
};
</script>

<style scoped>
.line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.transform {
    transition: transform 0.3s ease;
}
</style>