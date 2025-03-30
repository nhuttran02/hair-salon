<template>
    <div class="staff-container">
        <!-- Removed outer padding since it will be handled by master layout -->
        <div class="mb-4 flex justify-between items-center">
            <h1 class="text-2xl px-5">STAFF MANAGEMENT</h1>
            <!-- button to add new staff -->
            <button @click="showAddModal = true" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                Add New Staff
            </button>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="text-center py-4">
            Loading staff...
        </div>

        <!-- Error State -->
        <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {{ error }}
        </div>

        <!-- Staff Table -->
        <div v-if="staff.length" class="bg-white rounded-lg shadow overflow-x-auto">
            <table class="min-w-full">
                <thead>
                    <tr class="bg-gray-50 border-b">
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone
                        </th>
                        <!-- <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email
                        </th> -->
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role
                        </th>
                        <!-- <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Gender</th> -->
                        <!-- <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DOB
                        </th> -->
                        <!-- <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Address</th> -->
                        <!-- <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hire
                            Date</th> -->
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Salary</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="staffMember in staff" :key="staffMember.staff_id">
                        <td class="px-6 py-4 whitespace-nowrap">{{ staffMember.staff_id }}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{{ staffMember.staff_name }}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{{ staffMember.staff_phone }}</td>
                        <!-- <td class="px-6 py-4 whitespace-nowrap">{{ staffMember.staff_email }}</td> -->
                        <td class="px-6 py-4 whitespace-nowrap">{{ staffMember.staff_role }}</td>
                        <!-- <td class="px-6 py-4 whitespace-nowrap">{{ staffMember.staff_gender }}</td> -->
                        <!-- <td class="px-6 py-4 whitespace-nowrap">{{ staffMember.staff_dob }}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{{ staffMember.staff_address }}</td> -->
                        <!-- <td class="px-6 py-4 whitespace-nowrap">{{ staffMember.staff_hire_date }}</td> -->
                        <td class="px-6 py-4 whitespace-nowrap">{{ staffMember.staff_salary }}</td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <button @click="editStaff(staffMember)"
                                class="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600">
                                Edit
                            </button>
                            <button @click="deleteStaff(staffMember.staff_id)"
                                class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                                Delete
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>

            <!-- Pagination -->
            <div class="px-6 py-4 bg-gray-50 border-t flex justify-between items-center">
                <div class="text-sm text-gray-500">
                    Total Records: {{ metadata.totalRecords }}
                </div>
                <div class="flex gap-2">
                    <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1"
                        class="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-100">
                        Previous
                    </button>
                    <span class="px-3 py-1">Page {{ currentPage }} of {{ metadata.totalPages }}</span>
                    <button @click="changePage(currentPage + 1)" :disabled="currentPage === metadata.lastPage"
                        class="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-100">
                        Next
                    </button>
                </div>
            </div>
        </div>

        <!-- No Data State -->
        <div v-else-if="!loading" class="text-center py-4 bg-white rounded-lg shadow">
            No staff found.
        </div>

        <!-- Add/Edit Modal -->
        <div v-if="showEditModal || showAddModal"
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div class="bg-white p-6 rounded-lg w-96">
                <h2 class="text-xl font-bold mb-4">{{ showAddModal ? 'Add New Staff' : 'Edit Staff' }}</h2>
                <form @submit.prevent="showAddModal ? createStaff() : updateStaff()">
                    <div class="mb-4">
                        <label class="block mb-2">Name</label>
                        <input v-model="editedStaff.staff_name" class="w-full px-3 py-2 border rounded" required />
                    </div>
                    <div class="mb-4">
                        <label class="block mb-2">Phone</label>
                        <input v-model="editedStaff.staff_phone" class="w-full px-3 py-2 border rounded" required />
                    </div>
                    <div class="mb-4">
                        <label class="block mb-2">Email</label>
                        <input v-model="editedStaff.staff_email" type="email" class="w-full px-3 py-2 border rounded"
                            required />
                    </div>
                    <div class="mb-4">
                        <label class="block mb-2">Role</label>
                        <input v-model="editedStaff.staff_role" class="w-full px-3 py-2 border rounded" required />
                    </div>
                    <div class="mb-4">
                        <label class="block mb-2">Gender</label>
                        <select v-model="editedStaff.staff_gender" class="w-full px-3 py-2 border rounded" required>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div class="mb-4">
                        <label class="block mb-2">Date of Birth</label>
                        <input v-model="editedStaff.staff_dob" type="date" class="w-full px-3 py-2 border rounded"
                            required />
                    </div>
                    <div class="mb-4">
                        <label class="block mb-2">Address</label>
                        <input v-model="editedStaff.staff_address" class="w-full px-3 py-2 border rounded" required />
                    </div>
                    <div class="mb-4">
                        <label class="block mb-2">Hire Date</label>
                        <input v-model="editedStaff.staff_hire_date" type="date" class="w-full px-3 py-2 border rounded"
                            required />
                    </div>
                    <div class="mb-4">
                        <label class="block mb-2">Salary</label>
                        <input v-model="editedStaff.staff_salary" type="number" class="w-full px-3 py-2 border rounded"
                            required />
                    </div>
                    <div class="flex justify-end gap-2">
                        <button type="button" @click="closeModal" class="px-4 py-2 border rounded hover:bg-gray-100">
                            Cancel
                        </button>
                        <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                            {{ showAddModal ? 'Create' : 'Save' }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
    name: 'StaffPage',
    setup() {
        const staff = ref([])
        const metadata = ref({
            totalRecords: 0,
            totalPages: 1,
            lastPage: 1,
            page: 1,
            limit: 5
        })
        const loading = ref(false)
        const error = ref(null)
        const currentPage = ref(1)
        const showEditModal = ref(false)
        const showAddModal = ref(false)
        const editedStaff = ref({
            staff_name: '',
            staff_phone: '',
            staff_email: '',
            staff_role: '',
            staff_gender: 'male',
            staff_dob: '',
            staff_address: '',
            staff_hire_date: '',
            staff_salary: ''
        })

        const fetchStaff = async (page = 1) => {
            loading.value = true
            error.value = null
            try {
                const response = await fetch(`/api/v1/staff?page=${page}&limit=10`)
                const data = await response.json()

                if (data.status === 'success') {
                    staff.value = data.data.staff
                    metadata.value = data.data.metadata
                    currentPage.value = page
                } else {
                    throw new Error('Failed to fetch staff')
                }
            } catch (err) {
                error.value = 'Error loading staff: ' + err.message
            } finally {
                loading.value = false
            }
        }

        const changePage = (page) => {
            if (page >= 1 && page <= metadata.value.lastPage) {
                fetchStaff(page)
            }
        }

        const closeModal = () => {
            showEditModal.value = false
            showAddModal.value = false
            editedStaff.value = {
                staff_name: '',
                staff_phone: '',
                staff_email: '',
                staff_role: '',
                staff_gender: 'male',
                staff_dob: '',
                staff_address: '',
                staff_hire_date: '',
                staff_salary: ''
            }
        }

        const editStaff = (staffMember) => {
            editedStaff.value = { ...staffMember }
            showEditModal.value = true
        }

        const createStaff = async () => {
            try {
                const response = await fetch('/api/v1/staff', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(editedStaff.value),
                })

                const data = await response.json()

                if (data.status === 'success') {
                    await fetchStaff(currentPage.value)
                    closeModal()
                } else {
                    throw new Error('Failed to create staff')
                }
            } catch (err) {
                error.value = 'Error creating staff: ' + err.message
            }
        }

        const updateStaff = async () => {
            try {
                const response = await fetch(`/api/v1/staff/${editedStaff.value.staff_id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(editedStaff.value),
                })

                const data = await response.json()

                if (data.status === 'success') {
                    const index = staff.value.findIndex(s => s.staff_id === editedStaff.value.staff_id)
                    if (index !== -1) {
                        staff.value[index] = data.data.staff
                    }
                    closeModal()
                } else {
                    throw new Error('Failed to update staff')
                }
            } catch (err) {
                error.value = 'Error updating staff: ' + err.message
            }
        }

        const deleteStaff = async (staffId) => {
            if (!confirm('Are you sure you want to delete this staff?')) {
                return
            }

            try {
                const response = await fetch(`/api/v1/staff/${staffId}`, {
                    method: 'DELETE',
                })

                const data = await response.json()

                if (data.status === 'success') {
                    // Refresh current page
                    await fetchStaff(currentPage.value)
                } else {
                    throw new Error('Failed to delete staff')
                }
            } catch (err) {
                error.value = 'Error deleting staff: ' + err.message
            }
        }

        onMounted(() => {
            fetchStaff()
        })

        return {
            staff,
            metadata,
            loading,
            error,
            currentPage,
            showEditModal,
            showAddModal,
            editedStaff,
            changePage,
            editStaff,
            createStaff,
            updateStaff,
            deleteStaff,
            closeModal
        }
    }
}
</script>
