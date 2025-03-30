<template>
    <div class="bg-gray-100 flex flex-col items-center justify-center min-h-screen">
        <h1 class="text-2xl font-bold mb-5">Face Swapping API Test</h1>
        <form @submit.prevent="submitForm" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="img1">Upload Image 1:</label>
                <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="file" id="img1" name="img1" @change="handleFileChange($event, 'img1')" accept="image/*"
                    required />
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="img2">Upload Image 2:</label>
                <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="file" id="img2" name="img2" @change="handleFileChange($event, 'img2')" accept="image/*"
                    required />
            </div>
            <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit">
                Swap Faces
            </button>
        </form>

        <div id="result" class="mt-6">
            <img v-if="resultImageUrl" :src="resultImageUrl" class="mx-auto shadow-lg rounded w-1/2 max-w-md"
                alt="Result Image" />
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
            resultImageUrl: null,
        };
    },
    methods: {
        handleFileChange(event, imageKey) {
            this[imageKey] = event.target.files[0];
        },
        async submitForm() {
            if (!this.img1 || !this.img2) {
                alert("Please upload both images.");
                return;
            }

            const formData = new FormData();
            formData.append("img1", this.img1);
            formData.append("img2", this.img2);

            try {
                const response = await axios.post(`${REFACE_API}/swap`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

                if (response.status === 200) {
                    const blob = response.data;
                    this.resultImageUrl = URL.createObjectURL(blob);
                } else {
                    alert("Failed to swap faces. Please check your input images.");
                }
            } catch (error) {
                console.error(error);
                alert("An error occurred while processing your request.");
            }
        },
    },
};
</script>

<style scoped>
/* Optional custom styles */
</style>
