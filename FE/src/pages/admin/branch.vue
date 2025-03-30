<template>
    <div class="branches-container">
        <div class="mb-4 flex justify-between items-center">
            <h1 class="text-2xl px-5">BRANCH MANAGEMENT</h1>
            <!-- Button to add a new branch -->
            <button @click="showAddModal = true" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                Add New Branch
            </button>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="text-center py-4">
            Loading branches...
        </div>

        <!-- Error State -->
        <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {{ error }}
        </div>

        <!-- Branch Table -->
        <div v-if="branches.length" class="bg-white rounded-lg shadow">
            <table class="min-w-full">
                <thead>
                    <tr class="bg-gray-50 border-b">
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Address</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="branch in branches" :key="branch.branch_id">
                        <td class="px-6 py-4 whitespace-nowrap text-left">{{ branch.branch_id }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-left">{{ branch.branch_name }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-left">
                            {{ branch.branch_street }},
                            {{ branch.ward_name }},
                            {{ branch.district_name }},
                            {{ branch.province_name }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-left">
                            <button @click="editBranch(branch)"
                                class="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600">Edit</button>
                            <button @click="deleteBranch(branch.branch_id)"
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
        <div v-else-if="!loading" class="text-center py-4 bg-white rounded-lg shadow">No branches found.</div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
    name: 'BranchesPage',
    setup() {
        const branches = ref([]);
        const metadata = ref({
            totalRecords: 0,
            totalPages: 1,
            lastPage: 1,
        });
        const loading = ref(false);
        const error = ref(null);
        const currentPage = ref(1);

        const fetchBranches = async (page = 1) => {
            loading.value = true;
            error.value = null;
            try {
                const response = await fetch(`/api/v1/branch?page=${page}`);
                const data = await response.json();

                if (data.status === 'success') {
                    branches.value = data.data.branches.map(branch => ({
                        ...branch,
                        branch_street: branch.branch_street || "Unknown Street",
                        ward_name: branch.ward_name || "Unknown Ward",
                        district_name: branch.district_name || "Unknown District",
                        province_name: branch.province_name || "Unknown Province"
                    }));
                    metadata.value = data.data.metadata;
                    currentPage.value = page;
                } else {
                    throw new Error('Failed to fetch branches');
                }
            } catch (err) {
                error.value = 'Error loading branches: ' + err.message;
            } finally {
                loading.value = false;
            }
        };

        const changePage = (page) => {
            if (page >= 1 && page <= metadata.value.totalPages) {
                fetchBranches(page);
            }
        };

        const deleteBranch = async (branchId) => {
            if (!confirm('Are you sure you want to delete this branch?')) return;

            try {
                const response = await fetch(`/api/v1/branch/${branchId}`, {
                    method: 'DELETE',
                });
                const data = await response.json();

                if (data.status === 'success') {
                    await fetchBranches(currentPage.value);
                } else {
                    throw new Error('Failed to delete branch');
                }
            } catch (err) {
                error.value = 'Error deleting branch: ' + err.message;
            }
        };

        onMounted(() => {
            fetchBranches();
        });

        return {
            branches,
            metadata,
            loading,
            error,
            currentPage,
            fetchBranches,
            changePage,
            deleteBranch,
        };
    },
};
</script>
