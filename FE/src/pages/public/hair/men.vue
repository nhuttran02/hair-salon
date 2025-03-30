<template>
    <div class="bg-gray-100 flex flex-col items-center justify-center min-h-screen">
        <!-- Remove or comment out the Face Swapping section -->
        <!-- <h1 class="text-2xl font-bold mb-5">Face Swapping API Test</h1>
        <form @submit.prevent="submitForm" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            ... form content ...
        </form>
        <div id="result" class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            ... result content ...
        </div> -->

        <!-- Add a message about temporary unavailability -->
        <div class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-8" role="alert">
            <p class="font-bold">Notice</p>
            <p>The face swapping feature is temporarily unavailable due to system maintenance. Please check back later.</p>
        </div>

        <!-- Keep the hairstyles section -->
        <div class="mt-12 w-full px-8">
            <h2 class="text-xl font-bold mb-5 text-center">Male Hairstyles</h2>

            <!-- Loading State -->
            <div v-if="loading" class="flex justify-center items-center">
                <div class="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
            </div>

            <!-- Error State -->
            <div v-if="error" class="text-center text-red-500 bg-red-100 p-4 rounded">
                {{ error }}
            </div>

            <!-- Hairstyles Grid -->
            <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <div v-for="hairstyle in maleHairstyles" :key="hairstyle.hs_id"
                    class="bg-white shadow-md rounded-lg overflow-hidden transform transition hover:scale-105">
                    <img :src="formatImageUrl(hairstyle.hs_image_url)" :alt="hairstyle.hs_name"
                        class="w-full h-48 object-cover" />
                    <div class="p-4">
                        <h3 class="font-bold text-lg mb-2">{{ hairstyle.hs_name }}</h3>
                        <p class="text-gray-600 text-sm line-clamp-3">
                            {{ hairstyle.hs_des }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
// Remove REFACE_API import since we're not using it
// import { REFACE_API } from "@/config/api";

export default {
    data() {
        return {
            // Remove faceswap related data
            // img1: null,
            // img2: null,
            // resultImageUrl1: null,
            // resultImageUrl2: null,
            maleHairstyles: [],
            loading: true,
            error: null,
        };
    },
    methods: {
        // Remove faceswap related methods
        // handleFileChange(event, imageKey) { ... },
        // submitForm() { ... },

        // Keep other methods
        formatImageUrl(url) {
            if (!url) return 'path/to/default/image.jpg';
            const cleanUrl = url.replace(/\\/g, '/');
            return `http://localhost:3000/${cleanUrl}`;
        },

        async fetchMaleHairstyles() {
            this.loading = true;
            this.error = null;

            try {
                const response = await axios.get("http://localhost:3000/api/v1/hairstyles/male");

                // Kiểm tra cấu trúc response
                if (response.data && response.data.data && response.data.data.hairstyles) {
                    this.maleHairstyles = response.data.data.hairstyles;
                } else {
                    throw new Error("Invalid response structure");
                }
            } catch (error) {
                console.error("Detailed error:", error);

                if (error.response) {
                    // Server responded with an error
                    this.error = error.response.data.message || "Server error occurred";
                } else if (error.request) {
                    // Request made but no response received
                    this.error = "No response from server. Please check your connection.";
                } else {
                    // Something else went wrong
                    this.error = "An unexpected error occurred";
                }
            } finally {
                this.loading = false;
            }
        },
    },
    created() {
        this.fetchMaleHairstyles();
    },
};
</script>

<style scoped>
/* Optional: Add line-clamp for description */
.line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* Optional: Add smooth transition for hover effects */
.transform {
    transition: transform 0.3s ease;
}
</style>