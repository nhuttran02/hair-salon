<template>
    <div class="appointments-container">
        <div class="mb-4 flex justify-between items-center">
            <h1 class="text-2xl px-5">APPOINTMENT MANAGEMENT</h1>
            <button @click="showAddModal = true" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                Add New Appointment
            </button>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="text-center py-4">
            Loading appointments...
        </div>

        <!-- Error State -->
        <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {{ error }}
        </div>

        <!-- Appointment Table -->
        <div v-if="appointments.length" class="bg-white rounded-lg shadow">
            <table class="min-w-full">
                <thead>
                    <tr class="bg-gray-50 border-b">
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Customer Name</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Gender</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Service</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="appointment in appointments" :key="appointment.apm_id">
                        <td class="px-6 py-4 whitespace-nowrap text-left">{{ appointment.apm_id }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-left">{{ appointment.apm_customer_name }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-left">{{ appointment.apm_gender }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-left">{{ appointment.apm_phone }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-left">{{ getServiceName(appointment.apm_service_id)
                            }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-left">{{ appointment.apm_time }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-left">{{ appointment.apm_status }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-left">
                            <button @click="editAppointment(appointment)"
                                class="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600">
                                Edit
                            </button>
                            <button @click="deleteAppointment(appointment.apm_id)"
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
            No appointments found.
        </div>

        <!-- Add/Edit Modal -->
        <div v-if="showEditModal || showAddModal"
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div class="bg-white p-6 rounded-lg w-96">
                <h2 class="text-xl font-bold mb-4">{{ showAddModal ? 'Add New Appointment' : 'Edit Appointment' }}</h2>
                <form @submit.prevent="showAddModal ? createAppointment() : updateAppointment()">
                    <div class="mb-4">
                        <label class="block mb-2">Customer Name</label>
                        <input v-model="editedAppointment.apm_customer_name" class="w-full px-3 py-2 border rounded"
                            required />
                    </div>
                    <div class="mb-4">
                        <label class="block mb-2">Gender</label>
                        <select v-model="editedAppointment.apm_gender" class="w-full px-3 py-2 border rounded" required>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div class="mb-4">
                        <label class="block mb-2">Phone</label>
                        <input v-model="editedAppointment.apm_phone" class="w-full px-3 py-2 border rounded" required />
                    </div>
                    <div class="mb-4">
                        <label class="block mb-2">Service</label>
                        <select v-model="editedAppointment.apm_service_id" class="w-full px-3 py-2 border rounded"
                            required>
                            <option v-for="service in services" :key="service.services_id" :value="service.services_id">
                                {{ service.services_name }}
                            </option>
                        </select>
                    </div>
                    <div class="mb-4">
                        <label class="block mb-2">Branch</label>
                        <select v-model="editedAppointment.apm_branch" class="w-full px-3 py-2 border rounded" required>
                            <option v-for="branch in branches" :key="branch.branch_id" :value="branch.branch_id">
                                {{ branch.branch_name }}
                            </option>
                        </select>
                    </div>
                    <div class="mb-4">
                        <label class="block mb-2">Time</label>
                        <input v-model="editedAppointment.apm_time" type="datetime-local"
                            class="w-full px-3 py-2 border rounded" required />
                    </div>
                    <div class="mb-4">
                        <label class="block mb-2">Status</label>
                        <select v-model="editedAppointment.apm_status" class="w-full px-3 py-2 border rounded" required>
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
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
    name: 'AppointmentsPage',
    setup() {
        const appointments = ref([])
        const services = ref([])
        const branches = ref([])
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
        const editedAppointment = ref({
            apm_customer_name: '',
            apm_gender: 'male',
            apm_phone: '',
            apm_service_id: '',
            apm_branch: '',
            apm_time: '',
            apm_status: 'pending'
        })

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
            }
        }

        // const fetchBranches = async () => {
        //     try {
        //         const response = await fetch('/api/v1/branch')  // Thay đổi endpoint thành branch
        //         const data = await response.json()
        //         if (data.status === 'success') {
        //             branches.value = data.data.branch  // Thay đổi key thành branch
        //         } else {
        //             throw new Error('Failed to fetch branches')
        //         }
        //     } catch (err) {
        //         console.error('Error loading branches:', err)
        //     }
        // }

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

        const fetchAppointments = async (page = 1) => {
            loading.value = true
            error.value = null
            try {
                const response = await fetch(`/api/v1/appointments?page=${page}`)
                const data = await response.json()

                if (data.status === 'success') {
                    appointments.value = data.data.appointments
                    metadata.value = data.data.metadata
                    currentPage.value = page
                } else {
                    throw new Error('Failed to fetch appointments')
                }
            } catch (err) {
                error.value = 'Error loading appointments: ' + err.message
            } finally {
                loading.value = false
            }
        }

        const changePage = (page) => {
            if (page >= 1 && page <= metadata.value.lastPage) {
                fetchAppointments(page)
            }
        }

        const closeModal = () => {
            showEditModal.value = false
            showAddModal.value = false
            editedAppointment.value = {
                apm_customer_name: '',
                apm_gender: 'male',
                apm_phone: '',
                apm_service_id: '',
                apm_branch: '',
                apm_time: '',
                apm_status: 'pending'
            }
        }

        const editAppointment = (appointment) => {
            editedAppointment.value = { ...appointment }
            showEditModal.value = true
        }

        const createAppointment = async () => {
            try {
                const response = await fetch('/api/v1/appointments', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(editedAppointment.value),
                })
                const data = await response.json()

                if (data.status === 'success') {
                    await fetchAppointments(currentPage.value)
                    closeModal()
                } else {
                    throw new Error('Failed to create appointment')
                }
            } catch (err) {
                error.value = 'Error creating appointment: ' + err.message
            }
        }

        const updateAppointment = async () => {
            try {
                const response = await fetch(`/api/v1/appointments/${editedAppointment.value.apm_id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(editedAppointment.value),
                })
                const data = await response.json()

                if (data.status === 'success') {
                    const index = appointments.value.findIndex(a => a.apm_id === editedAppointment.value.apm_id)
                    if (index !== -1) {
                        appointments.value[index] = data.data.appointment
                    }
                    closeModal()
                } else {
                    throw new Error('Failed to update appointment')
                }
            } catch (err) {
                error.value = 'Error updating appointment: ' + err.message
            }
        }

        const deleteAppointment = async (appointmentId) => {
            if (!confirm('Are you sure you want to delete this appointment?')) {
                return
            }

            try {
                const response = await fetch(`/api/v1/appointments/${appointmentId}`, {
                    method: 'DELETE',
                })
                const data = await response.json()

                if (data.status === 'success') {
                    // Refresh current page
                    await fetchAppointments(currentPage.value)
                } else {
                    throw new Error('Failed to delete appointment')
                }
            } catch (err) {
                error.value = 'Error deleting appointment: ' + err.message
            }
        }

        const getServiceName = (serviceId) => {
            const service = services.value.find(s => s.services_id === serviceId)
            return service ? service.services_name : 'Unknown Service'
        }

        onMounted(() => {
            fetchServices()
            fetchBranches()
            fetchAppointments()
        })

        return {
            appointments,
            services,
            metadata,
            loading,
            error,
            currentPage,
            showEditModal,
            showAddModal,
            editedAppointment,
            changePage,
            editAppointment,
            createAppointment,
            updateAppointment,
            deleteAppointment,
            closeModal,
            getServiceName,
            branches,
            fetchBranches
        }
    }
}
</script>