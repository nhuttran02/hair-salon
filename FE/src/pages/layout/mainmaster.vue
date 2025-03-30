<!-- src/pages/layout/mainmaster.vue -->
<template>
    <div class="flex flex-col min-h-screen">
        <!-- Header component -->
        <MainHeader />
        
        

        <!-- Main content -->
        <main class="flex-grow">
            <router-view></router-view>
        </main>


        <MainFooter />
    </div>
</template>

<script>
import MainHeader from './../../components/public/mainheader.vue'
import MainFooter from './../../components/public/mainfooter.vue' // Nếu bạn có component footer

export default {
    name: 'MainMaster',
    components: {
        MainHeader,
        MainFooter
    },
    data() {
        return {
            // Thêm các state nếu cần
        }
    },
    methods: {
        // Thêm các methods nếu cần
    }
}
</script>

<style scoped>
/* Thêm styles nếu cần */
</style>