<template>
    <div class="booking-container max-w-2xl mx-auto p-6">
        <h1 class="text-3xl font-bold mb-6 text-center">Book an Appointment</h1>

        <form @submit.prevent="submitBooking" class="space-y-6">
            <div>
                <label for="name" class="block mb-2 font-medium">Your Name</label>
                <input v-model="booking.apm_customer_name" id="name" type="text" required
                    class="w-full px-3 py-2 border rounded-md">
            </div>

            <div>
                <label for="gender" class="block mb-2 font-medium">Gender</label>
                <select v-model="booking.apm_gender" id="gender" required class="w-full px-3 py-2 border rounded-md">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
            </div>

            <div>
                <label for="phone" class="block mb-2 font-medium">Phone Number</label>
                <input v-model="booking.apm_phone" id="phone" type="tel" required
                    class="w-full px-3 py-2 border rounded-md">
            </div>

            <div>
                <label for="service" class="block mb-2 font-medium">Service</label>
                <select v-model="booking.apm_service_id" id="service" required
                    class="w-full px-3 py-2 border rounded-md">
                    <option v-for="service in services" :key="service.services_id" :value="service.services_id">
                        {{ service.services_name }}
                    </option>
                </select>
            </div>

            <div>
                <label for="branch" class="block mb-2 font-medium">Branch</label>
                <select v-model="booking.apm_branch" id="branch" required class="w-full px-3 py-2 border rounded-md">
                    <option v-for="branch in branches" :key="branch.branch_id" :value="branch.branch_id">
                        {{ branch.branch_name }}
                    </option>
                </select>
            </div>

            <div>
                <label for="time" class="block mb-2 font-medium">Preferred Date and Time</label>
                <input v-model="booking.apm_time" id="time" type="datetime-local" required
                    class="w-full px-3 py-2 border rounded-md">
            </div>

            <div>
                <button type="submit"
                    class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
                    Book Appointment
                </button>
            </div>
        </form>

        <!-- Success Message -->
        <!-- <div v-if="bookingSuccess" class="mt-6 p-4 bg-green-100 text-green-700 rounded-md">
            Your appointment has been successfully booked. We will contact you shortly to confirm.
        </div> -->

        <!-- Error Message -->
        <!-- <div v-if="error" class="mt-6 p-4 bg-red-100 text-red-700 rounded-md">
            {{ error }}
        </div> -->

        <!-- Success Toast -->
        <div v-if="bookingSuccess"
            class="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg transition-all duration-300 ease-in-out">
            <div class="flex items-center">
                <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Appointment booked successfully!</span>
            </div>
        </div>

        <!-- Error Toast -->
        <div v-if="error"
            class="fixed top-4 right-4 z-50 bg-red-500 text-white px-6 py-4 rounded-lg shadow-lg transition-all duration-300 ease-in-out">
            <div class="flex items-center">
                <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>{{ error }}</span>
            </div>
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
                console.log('Branch data:', data)  // Thêm log để kiểm tra dữ liệu trả về
                if (data.status === 'success') {
                    branches.value = data.data.branch
                    console.log('Branch:', branches.value)  // Log giá trị branches
                } else {
                    throw new Error('Failed to fetch branch')
                }
            } catch (err) {
                console.error('Error loading branch:', err)
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