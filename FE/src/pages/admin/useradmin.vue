<template>
    <div class="useradmin-container">
        <div class="mb-4 flex justify-between items-center">
            <h1 class="text-2xl px-5">USER ADMINISTRATION</h1>
            <button @click="showAddModal = true" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                Add New User
            </button>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="text-center py-4">
            Loading users...
        </div>

        <!-- Error State -->
        <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {{ error }}
        </div>

        <!-- User Table -->
        <div v-if="users.length" class="bg-white rounded-lg shadow">
            <table class="min-w-full">
                <thead>
                    <tr class="bg-gray-50 border-b">
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Username</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Gender</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="user in users" :key="user.user_id">
                        <td class="px-6 py-4 whitespace-nowrap text-left">{{ user.user_id }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-left">{{ user.user_username }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-left">{{ user.user_name }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-left">{{ user.user_gender }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-left">{{ user.user_phone }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-left">
                            <button @click="editUser(user)"
                                class="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600">Edit</button>
                            <button @click="deleteUser(user.user_id)"
                                class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>

            <!-- Pagination -->
            <div class="px-6 py-4 bg-gray-50 border-t flex justify-between items-center">
                <div class="text-sm text-gray-500">Total Records: {{ metadata.totalRecords }}</div>
                <div class="flex gap-2">
                    <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1"
                        class="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-100">Previous</button>
                    <span class="px-3 py-1">Page {{ currentPage }} of {{ metadata.totalPages }}</span>
                    <button @click="changePage(currentPage + 1)" :disabled="currentPage === metadata.lastPage"
                        class="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-100">Next</button>
                </div>
            </div>
        </div>

        <!-- No Data State -->
        <div v-else-if="!loading" class="text-center py-4 bg-white rounded-lg shadow">No users found.</div>

        <!-- Add/Edit Modal -->
        <div v-if="showEditModal || showAddModal"
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div class="bg-white p-6 rounded-lg w-96">
                <h2 class="text-xl font-bold mb-4">{{ showAddModal ? 'Add New User' : 'Edit User' }}</h2>
                <form @submit.prevent="showAddModal ? addUser() : updateUser()">
                    <div class="mb-4">
                        <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
                        <input v-model="form.user_username" type="text" id="username" required
                            class="w-full px-3 py-2 border rounded focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div class="mb-4">
                        <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                        <input v-model="form.user_password" type="password" id="password" :required="showAddModal"
                            class="w-full px-3 py-2 border rounded focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div class="mb-4">
                        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                        <input v-model="form.user_email" type="email" id="email" required
                            class="w-full px-3 py-2 border rounded focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div class="mb-4">
                        <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
                        <input v-model="form.user_name" type="text" id="name" required
                            class="w-full px-3 py-2 border rounded focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div class="mb-4">
                        <label for="gender" class="block text-sm font-medium text-gray-700">Gender</label>
                        <select v-model="form.gender_id" id="gender"
                            class="w-full px-3 py-2 border rounded focus:ring-blue-500 focus:border-blue-500">
                            <option value="" disabled>Select Gender</option>
                            <option value="1">Male</option>
                            <option value="2">Female</option>
                        </select>
                    </div>
                    <div class="mb-4">
                        <label for="phone" class="block text-sm font-medium text-gray-700">Phone</label>
                        <input v-model="form.user_phone" type="text" id="phone" required
                            class="w-full px-3 py-2 border rounded focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div class="mb-4">
                        <label for="address" class="block text-sm font-medium text-gray-700">Address</label>
                        <input v-model="form.user_address_id" type="number" id="address"
                            class="w-full px-3 py-2 border rounded focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div class="mb-4">
                        <label for="role" class="block text-sm font-medium text-gray-700">Role</label>
                        <select v-model="form.user_role" id="role" required
                            class="w-full px-3 py-2 border rounded focus:ring-blue-500 focus:border-blue-500">
                            <option value="1">Admin</option>
                            <option value="2">Customer</option>
                        </select>
                    </div>
                    <div class="flex justify-end">
                        <button type="button" @click="closeModal"
                            class="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400">Cancel</button>
                        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                            {{ showAddModal ? 'Add User' : 'Save Changes' }}
                        </button>
                    </div>
                </form>
            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios';

// Thiết lập interceptor cho Axios để tự động thêm JWT token vào headers
axios.interceptors.request.use(
    config => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default {
    data() {
        return {
            users: [],
            loading: false,
            error: null,
            showAddModal: false,
            showEditModal: false,
            form: {
                user_username: '',
                user_password: '',
                user_email: '',
                user_name: '',
                gender_id: null,
                user_phone: '',
                user_address_id: null,
                user_role: 2,
            },
            currentPage: 1,
            metadata: {
                totalRecords: 0,
                totalPages: 1,
            },
        };
    },

    methods: {
        // async fetchUsers() {
        //     this.loading = true;
        //     this.error = null;
        //     try {
        //         const response = await axios.get(`/api/v1/users?page=${this.currentPage}`);
        //         const data = response.data;
        //         this.users = data.data.users;
        //         this.metadata = data.data.metadata;
        //     } catch (err) {
        //         this.error = 'Failed to load users.';
        //     } finally {
        //         this.loading = false;
        //     }
        // },
        async fetchUsers() {
            this.loading = true;
            this.error = null;
            try {
                // Thêm tham số filter user_role === 1 vào API request
                const response = await axios.get(`/api/v1/users?page=${this.currentPage}&user_role=1`);
                const data = response.data;
                this.users = data.data.users;  // Chỉ lấy users có user_role === 1
                this.metadata = data.data.metadata;
            } catch (err) {
                this.error = 'Failed to load users.';
            } finally {
                this.loading = false;
            }
        },
        async addUser() {
            try {
                // Chuyển đổi user_role từ tên sang ID trước khi gửi
                const userForm = {
                    ...this.form,
                    user_role: this.form.user_role === 'Admin' ? 1 : 2,
                };
                const response = await axios.post('/api/v1/users', userForm);
                const data = response.data;
                this.users.push(data.data.user);
                this.closeModal();
            } catch (err) {
                this.error = 'Failed to add user.';
            }
        },
        async updateUser() {
            try {
                // Chuyển đổi user_role từ tên sang ID trước khi gửi
                const userForm = {
                    ...this.form,
                    user_role: this.form.user_role === 'Admin' ? 1 : 2,
                };
                const response = await axios.put(`/api/v1/users/${this.form.user_id}`, userForm);
                const data = response.data;
                const index = this.users.findIndex(user => user.user_id === this.form.user_id);
                if (index !== -1) {
                    this.users.splice(index, 1, data.data.user);
                }
                this.closeModal();
            } catch (err) {
                this.error = 'Failed to update user.';
            }
        },
        async deleteUser(user_id) {
            try {
                await axios.delete(`/api/v1/users/${user_id}`);
                this.users = this.users.filter(user => user.user_id !== user_id);
            } catch (err) {
                this.error = 'Failed to delete user.';
            }
        },
        editUser(user) {
            this.form = { ...user };
            this.form.user_role = user.user_role === 1 ? 'Admin' : 'Customer';
            this.showEditModal = true;
            this.showAddModal = false;
        },
        changePage(page) {
            this.currentPage = page;
            this.fetchUsers();
        },
        closeModal() {
            this.showAddModal = false;
            this.showEditModal = false;
            this.form = {
                user_username: '',
                user_name: '',
                user_gender: '',
                user_phone: '',
                user_address: '',
                user_password: '',
                user_role: '',
            };
        },
    },
    mounted() {
        this.fetchUsers();
    },
};
</script>

<style scoped>
.useradmin-container {
    padding: 20px;
}
</style>