<template>
    <div class="services-container">
        <!-- Removed outer padding since it will be handled by master layout -->
        <div class="mb-4 flex justify-between items-center">
            <h1 class="text-2xl px-5">SERVICE MANAGEMENT</h1>
            <!-- button de them moi service -->
            <button @click="showAddModal = true" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                Add New Service
            </button>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="text-center py-4">
            Loading services...
        </div>

        <!-- Error State -->
        <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {{ error }}
        </div>

        <!-- Service Table -->
        <div v-if="services.length" class="bg-white rounded-lg shadow">
            <table class="min-w-full">
                <thead>
                    <tr class="bg-gray-50 border-b">
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Description</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Duration</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="service in services" :key="service.services_id">
                        <td class="px-6 py-4 whitespace-nowrap text-left">{{ service.services_id }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-left">{{ service.services_name }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-left">{{ service.services_des }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-left">{{ service.services_price }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-left">{{ service.services_duration }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-left">
                            <button @click="editService(service)"
                                class="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600">
                                Edit
                            </button>
                            <button @click="deleteService(service.services_id)"
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
            No services found.
        </div>

        <!-- Add/Edit Modal -->
        <div v-if="showEditModal || showAddModal"
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div class="bg-white p-6 rounded-lg w-96">
                <h2 class="text-xl font-bold mb-4">{{ showAddModal ? 'Add New Service' : 'Edit Service' }}</h2>
                <form @submit.prevent="showAddModal ? createService() : updateService()">
                    <div class="mb-4">
                        <label class="block mb-2">Name</label>
                        <input v-model="editedService.services_name" class="w-full px-3 py-2 border rounded" required />
                    </div>
                    <div class="mb-4">
                        <label class="block mb-2">Description</label>
                        <textarea v-model="editedService.services_des" class="w-full px-3 py-2 border rounded"
                            required></textarea>
                    </div>
                    <div class="mb-4">
                        <label class="block mb-2">Price</label>
                        <input v-model="editedService.services_price" type="number"
                            class="w-full px-3 py-2 border rounded" required />
                    </div>
                    <div class="mb-4">
                        <label class="block mb-2">Duration (minutes)</label>
                        <input v-model="editedService.services_duration" type="number"
                            class="w-full px-3 py-2 border rounded" required />
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
    name: 'ServicesPage',
    setup() {
        const services = ref([])
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
        const editedService = ref({
            services_name: '',
            services_des: '',
            services_price: '',
            services_duration: ''
        })

        const fetchServices = async (page = 1) => {
            loading.value = true
            error.value = null
            try {
                const response = await fetch(`/api/v1/services?page=${page}`)
                const data = await response.json()

                if (data.status === 'success') {
                    services.value = data.data.services
                    metadata.value = data.data.metadata
                    currentPage.value = page
                } else {
                    throw new Error('Failed to fetch services')
                }
            } catch (err) {
                error.value = 'Error loading services: ' + err.message
            } finally {
                loading.value = false
            }
        }

        const changePage = (page) => {
            if (page >= 1 && page <= metadata.value.lastPage) {
                fetchServices(page)
            }
        }

        const closeModal = () => {
            showEditModal.value = false
            showAddModal.value = false
            editedService.value = {
                services_name: '',
                services_des: '',
                services_price: '',
                services_duration: ''
            }
        }

        const editService = (service) => {
            editedService.value = { ...service }
            showEditModal.value = true
        }

        const createService = async () => {
            try {
                const response = await fetch('/api/v1/services', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(editedService.value),
                })

                const data = await response.json()

                if (data.status === 'success') {
                    await fetchServices(currentPage.value)
                    closeModal()
                } else {
                    throw new Error('Failed to create service')
                }
            } catch (err) {
                error.value = 'Error creating service: ' + err.message
            }
        }

        const updateService = async () => {
            try {
                const response = await fetch(`/api/v1/services/${editedService.value.services_id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(editedService.value),
                })

                const data = await response.json()

                if (data.status === 'success') {
                    const index = services.value.findIndex(s => s.services_id === editedService.value.services_id)
                    if (index !== -1) {
                        services.value[index] = data.data.service
                    }
                    closeModal()
                } else {
                    throw new Error('Failed to update service')
                }
            } catch (err) {
                error.value = 'Error updating service: ' + err.message
            }
        }

        const deleteService = async (serviceId) => {
            if (!confirm('Are you sure you want to delete this service?')) {
                return
            }

            try {
                const response = await fetch(`/api/v1/services/${serviceId}`, {
                    method: 'DELETE',
                })

                const data = await response.json()

                if (data.status === 'success') {
                    // Refresh current page
                    await fetchServices(currentPage.value)
                } else {
                    throw new Error('Failed to delete service')
                }
            } catch (err) {
                error.value = 'Error deleting service: ' + err.message
            }
        }

        onMounted(() => {
            fetchServices()
        })

        return {
            services,
            metadata,
            loading,
            error,
            currentPage,
            showEditModal,
            showAddModal,
            editedService,
            changePage,
            editService,
            createService,
            updateService,
            deleteService,
            closeModal
        }
    }
}
</script>
