<template>
    <div class="booking-container max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-lg my-8">
        <h1 class="text-3xl font-bold mb-8 text-center text-gray-800">Book an Appointment</h1>

        <form @submit.prevent="submitBooking" class="space-y-6">

            <div class="space-y-2">
                <label for="name" class="block text-sm font-medium text-gray-700">Your Name</label>
                <input v-model="booking.apm_customer_name" id="name" type="text" required
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200">
            </div>
            <!-- Two column layout for personal info -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">


                <div class="space-y-2">
                    <label for="phone" class="block text-sm font-medium text-gray-700">Phone Number</label>
                    <div class="relative">
                        <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path
                                    d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                            </svg>
                        </span>
                        <input v-model="booking.apm_phone" id="phone" type="tel" required
                            class="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200">
                    </div>
                </div>


                <div class="space-y-2">
                    <label for="gender" class="block text-sm font-medium text-gray-700">Gender</label>
                    <select v-model="booking.apm_gender" id="gender" required
                        class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-white">
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
            </div>


            <!-- Service selection with icons -->
            <div class="space-y-2">
                <label for="service" class="block text-sm font-medium text-gray-700">Service</label>
                <div class="relative">
                    <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                clip-rule="evenodd" />
                        </svg>
                    </span>
                    <select v-model="booking.apm_service_id" id="service" required
                        class="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-white">
                        <option value="" disabled selected>Select a service</option>
                        <option v-for="service in services" :key="service.services_id" :value="service.services_id">
                            {{ service.services_name }}
                        </option>
                    </select>
                </div>
            </div>

            <!-- Branch selection with map icon -->
            <div class="space-y-2">
                <label for="branch" class="block text-sm font-medium text-gray-700">Branch</label>
                <div class="relative">
                    <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                clip-rule="evenodd" />
                        </svg>
                    </span>
                    <select v-model="booking.apm_branch" id="branch" required
                        class="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-white">
                        <option value="" disabled selected>Select a branch</option>
                        <option v-for="branch in branches" :key="branch.branch_id" :value="branch.branch_id">
                            {{ branch.branch_name }}
                        </option>
                    </select>
                </div>
            </div>

            <!-- Date and time -->
            <div class="space-y-2">
                <label for="time" class="block text-sm font-medium text-gray-700">Preferred Date and Time</label>
                <div class="relative">
                    <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                clip-rule="evenodd" />
                        </svg>
                    </span>
                    <input v-model="booking.apm_time" id="time" type="datetime-local" required
                        class="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200">
                </div>
            </div>

            <div class="pt-4">
                <button type="submit"
                    class="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300 transform hover:-translate-y-1 shadow-md">
                    Book Your Appointment
                </button>
            </div>
        </form>

        <!-- Success Toast -->
        <div v-if="bookingSuccess"
            class="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-4 rounded-lg shadow-xl transition-all duration-300 ease-in-out flex items-center">
            <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span class="font-medium">Appointment booked successfully!</span>
        </div>

        <!-- Error Toast -->
        <div v-if="error"
            class="fixed top-4 right-4 z-50 bg-red-500 text-white px-6 py-4 rounded-lg shadow-xl transition-all duration-300 ease-in-out flex items-center">
            <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span class="font-medium">{{ error }}</span>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
    name: 'BookingPage',
    setup() {
        const services = ref([])
        const branches = ref([])
        const booking = ref({
            apm_customer_name: '',
            apm_gender: 'male',
            apm_phone: '',
            apm_service_id: '',
            apm_branch: '',
            apm_time: '',
            apm_status: 'pending'
        })
        const bookingSuccess = ref(false)
        const error = ref(null)

        const fetchServices = async () => {
            try {
                const response = await fetch('/api/v1/services')
                const data = await response.json()
                if (data.status === 'success') {
                    services.value = data.data.services
                } else {
                    throw new Error('Failed to fetch services')
                }
            } catch (err) {
                console.error('Error loading services:', err)
                error.value = 'Unable to load services. Please try again later.'
            }
        }

        const fetchBranches = async () => {
            try {
                const response = await fetch('/api/v1/branch')
                const data = await response.json()
                if (data.status === 'success') {
                    branches.value = data.data.branch
                } else {
                    throw new Error('Failed to fetch branch')
                }
            } catch (err) {
                console.error('Error loading branch:', err)
                error.value = 'Unable to load branches. Please try again later.'
            }
        }

        const submitBooking = async () => {
            try {
                const response = await fetch('/api/v1/appointments', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(booking.value),
                })
                const data = await response.json()

                if (data.status === 'success') {
                    bookingSuccess.value = true

                    // Tự động ẩn toast sau 3 giây
                    setTimeout(() => {
                        bookingSuccess.value = false
                    }, 3000)

                    // Reset form
                    booking.value = {
                        apm_customer_name: '',
                        apm_gender: 'male',
                        apm_phone: '',
                        apm_service_id: '',
                        apm_branch: '',
                        apm_time: '',
                        apm_status: 'pending'
                    }
                } else {
                    throw new Error('Failed to book appointment')
                }
            } catch (err) {
                error.value = 'Error booking appointment: ' + err.message

                // Tự động ẩn error toast sau 3 giây
                setTimeout(() => {
                    error.value = null
                }, 3000)
            }
        }

        onMounted(() => {
            fetchServices()
            fetchBranches()
        })

        return {
            services,
            branches,
            booking,
            bookingSuccess,
            error,
            submitBooking,
        }
    }
}
</script>