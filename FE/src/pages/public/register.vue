<template>
    <Toast />
    <div class="bg-gray-100 flex justify-center items-center h-screen">
        <!-- Left: Image -->
        <div class="w-2/3 h-screen hidden lg:block">
            <img src="https://images.pexels.com/photos/705255/pexels-photo-705255.jpeg"
                class="object-cover w-full h-full contrast-50">
        </div>

        <!-- Right: Register Form -->
        <div class="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/3">
            <h1 class="text-2xl font-semibold mb-4">Register</h1>
            <form @submit.prevent="handleRegister">
                <!-- Username Input -->
                <div class="mb-4">
                    <label for="username" class="block text-gray-600">Username</label>
                    <input v-model="username" type="text" id="username" name="username"
                        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        autocomplete="off" required>
                </div>

                <!-- Email Input -->
                <div class="mb-4">
                    <label for="email" class="block text-gray-600">Email</label>
                    <input v-model="email" type="email" id="email" name="email"
                        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        autocomplete="off" required>
                </div>

                <!-- Password Input -->
                <div class="mb-4">
                    <label for="password" class="block text-gray-600">Password</label>
                    <input v-model="password" type="password" id="password" name="password"
                        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        autocomplete="off" required>
                </div>

                <!-- Confirm Password Input -->
                <div class="mb-4">
                    <label for="confirm-password" class="block text-gray-600">Confirm Password</label>
                    <input v-model="confirmPassword" type="password" id="confirm-password" name="confirm-password"
                        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        autocomplete="off" required>
                </div>

                <!-- Register Button -->
                <button type="submit"
                    class="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
                    :disabled="loading">
                    {{ loading ? 'Registering...' : 'Register' }}
                </button>
            </form>

            <!-- Login Link -->
            <div class="mt-6 text-blue-500 text-center">
                <router-link to="/login" class="hover:underline">Already have an account? Login</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { useToast } from 'primevue/usetoast';

export default {
    data() {
        return {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            user_role: 2, // role mặc định là Customer
            loading: false
        };
    },
    created() {
        this.toast = useToast();
    },
    methods: {
        async handleRegister() {
            // Kiểm tra xem password và confirm password có khớp nhau không
            if (this.password !== this.confirmPassword) {
                this.toast.add({
                    severity: 'error',
                    summary: 'Registration Failed',
                    detail: 'Passwords do not match',
                    life: 3000
                });
                return;
            }

            this.loading = true;
            try {
                // Gửi dữ liệu đăng ký lên server
                await axios.post('/api/v1/users', {
                    user_username: this.username,
                    user_email: this.email,
                    user_password: this.password,
                    user_role: this.user_role, // Role mặc định là Customer (2)
                    user_name: null,
                    gender_id: null,
                    user_phone: null,
                    user_address_id: null
                });

                // Nếu đăng ký thành công
                this.toast.add({
                    severity: 'success',
                    summary: 'Registration Successful',
                    detail: 'You can now login',
                    life: 3000
                });

                // Chuyển hướng đến trang login
                this.$router.push('/login');
            } catch (error) {
                if (error.response) {
                    switch (error.response.status) {
                        case 400:
                            this.toast.add({
                                severity: 'error',
                                summary: 'Registration Failed',
                                detail: error.response.data.message || 'Invalid registration data',
                                life: 3000
                            });
                            break;
                        case 409:
                            this.toast.add({
                                severity: 'warn',
                                summary: 'Username/Email Exists',
                                detail: 'Username or email already registered',
                                life: 3000
                            });
                            break;
                        default:
                            this.toast.add({
                                severity: 'error',
                                summary: 'Error',
                                detail: 'An unexpected error occurred',
                                life: 3000
                            });
                    }
                } else {
                    this.toast.add({
                        severity: 'error',
                        summary: 'Network Error',
                        detail: 'Unable to connect to server',
                        life: 3000
                    });
                }
            } finally {
                this.loading = false;
            }
        }
    }
};
</script>