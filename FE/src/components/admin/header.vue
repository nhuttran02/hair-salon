<template>
    <div class="w-full bg-gray-100">
        <div class="flex justify-between items-center h-[50px]">
            <div class="p-4 cursor-pointer hover:bg-gray-50" @click="clickHambuger">
                <i class="pi pi-bars"></i>
            </div>
            <!-- <div class="py-2">
                <InputText type="text" v-model="value" class="h-[35px]" placeholder="Search" />
            </div> -->

            <div class="flex space-x-3 items-center justify-center px-3">
                <div class="text-md">ADMIN</div>
                <div class="text-md">{{ username }}</div>
                <Avatar icon="pi pi-user" class="mr-2" style="background-color: #46a7db; color: #2a1261" shape="circle"
                    @click="toggle" aria-haspopup="true" aria-controls="overlay_menu" />
                <Menu id="overlay_menu" ref="menu" :model="items" :popup="true" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        dataOpenSideBar: Boolean,
        clickHambuger: Function
    },
    data() {
        return {
            username: '',
            items: [
                {
                    label: 'Logout',
                    icon: 'pi pi-sign-out',
                    command: () => {
                        this.handleLogout();
                    }
                }
            ]
        }
    },
    methods: {
        toggle(event) {
            this.$refs.menu.toggle(event);
        },
        handleLogout() {
            // Xóa JWT token khỏi localStorage
            localStorage.removeItem('jwtToken');

            // Xóa thông tin user khỏi localStorage
            localStorage.removeItem('userInfo');

            // Hiển thị thông báo đăng xuất
            this.$toast.add({
                severity: 'success',
                summary: 'Logout',
                detail: 'Logged out successfully',
                life: 3000
            });

            // Chuyển hướng về trang chính
            this.$router.push('/home');
        }
    },
    mounted() {
        // Lấy thông tin username từ localStorage khi component được khởi tạo
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (userInfo) {
            this.username = userInfo.user_username;
        }
    }
}
</script>