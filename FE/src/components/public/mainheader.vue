<template>
    <header class="bg-white shadow-sm">
        <div class="container mx-auto px-4 py-4 flex justify-between items-center">
            <!-- Logo Section -->
            <div class="flex items-center">
                <img :src="logo" :alt="brandName" class="mr-2 w-10 h-10" />
                <span class="text-2xl font-bold">{{ brandName }}</span>
            </div>

            <!-- Mobile Menu Button (hidden on desktop) -->
            <button @click="toggleMobileMenu" class="lg:hidden text-gray-700 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

            <!-- Desktop Navigation (hidden on mobile) -->
            <nav class="hidden lg:flex items-center space-x-4">
                <div v-for="(item, index) in menuItems" :key="index" class="relative group">
                    <div class="px-5">
                        <button v-if="item.submenu"
                            class="text-gray-700 font-medium hover:text-red-500 transition-colors">
                            <i v-if="item.icon" :class="item.icon"></i>
                            {{ item.label }}
                        </button>
                        <router-link v-else :to="item.path"
                            class="text-gray-700 font-medium hover:text-red-500 transition-colors">
                            <i v-if="item.icon" :class="item.icon"></i>
                            {{ item.label }}
                        </router-link>
                    </div>

                    <!-- Dropdown Menu -->
                    <div v-if="item.submenu"
                        class="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md hidden group-hover:block z-50">
                        <router-link v-for="(subItem, subIndex) in item.submenu" :key="subIndex" :to="subItem.path"
                            class="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors">
                            <i v-if="subItem.icon" :class="subItem.icon"></i>
                            {{ subItem.label }}
                        </router-link>
                    </div>
                </div>
            </nav>

            <!-- Desktop Action Buttons (hidden on mobile) -->
            <div class="hidden lg:flex items-center space-x-2">
                <template v-if="isLoggedIn && userRole === 2">
                    <span class="text-gray-700">Hello, {{ username }}</span>
                    <button @click="logout"
                        class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors">
                        LOGOUT
                    </button>
                </template>
                <template v-else>
                    <button @click="$router.push('/register')"
                        class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors">
                        REGISTER
                    </button>
                    <button @click="$router.push('/login')"
                        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                        LOGIN
                    </button>
                </template>
            </div>
        </div>

        <!-- Mobile Menu (Slide from right) -->
        <div v-if="mobileMenuOpen" class="fixed inset-0 z-50 flex">
            <!-- Backdrop -->
            <div @click="toggleMobileMenu" class="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300">
            </div>

            <!-- Sidebar -->
            <div class="fixed right-0 top-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out"
                :class="{ 'translate-x-0': mobileMenuOpen, 'translate-x-full': !mobileMenuOpen }">

                <!-- Close button -->
                <div class="p-4 flex justify-end">
                    <button @click="toggleMobileMenu"
                        class="text-gray-700 transition-transform duration-300 hover:rotate-90">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <!-- Mobile Menu Items -->
                <div class="px-4 py-2">
                    <div v-for="(item, index) in menuItems" :key="index" class="py-2">
                        <!-- Menu items without submenu -->
                        <router-link v-if="!item.submenu" :to="item.path" @click="toggleMobileMenu"
                            class="flex items-center py-2 text-gray-700 hover:text-red-500 transition-colors duration-300">
                            <i v-if="item.icon" :class="[item.icon, 'w-8 text-center']"></i>
                            <span>{{ item.label }}</span>
                        </router-link>

                        <!-- Menu items with submenu -->
                        <div v-else>
                            <button @click="toggleSubmenu(index)"
                                class="flex justify-between items-center w-full py-2 text-gray-700 hover:text-red-500 transition-colors duration-300">
                                <div class="flex items-center">
                                    <i v-if="item.icon" :class="[item.icon, 'w-8 text-center']"></i>
                                    <span>{{ item.label }}</span>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    class="h-4 w-4 transition-transform duration-300"
                                    :class="{ 'transform rotate-180': openSubmenu === index }" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            <!-- Submenu items -->
                            <div v-show="openSubmenu === index"
                                class="pl-8 mt-2 border-l-2 border-gray-200 overflow-hidden transition-all duration-300"
                                :style="{ maxHeight: openSubmenu === index ? '200px' : '0' }">

                                <router-link v-for="(subItem, subIndex) in item.submenu" :key="subIndex"
                                    :to="subItem.path" @click="toggleMobileMenu"
                                    class="flex items-center py-2 text-gray-700 hover:text-red-500 transition-colors duration-300">
                                    <i v-if="subItem.icon" :class="[subItem.icon, 'w-8 text-center']"></i>
                                    <span>{{ subItem.label }}</span>
                                </router-link>
                            </div>
                        </div>
                    </div>

                    <!-- Mobile Action Buttons -->
                    <div class="mt-4 pt-4 border-t border-gray-200">
                        <template v-if="isLoggedIn && userRole === 2">
                            <div class="text-gray-700 mb-2 pl-8">Hello, {{ username }}</div>
                            <button @click="mobileLogout"
                                class="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-300">
                                LOGOUT
                            </button>
                        </template>
                        <template v-else>
                            <button @click="navigateAndClose('/register')"
                                class="w-full mb-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-300">
                                REGISTER
                            </button>
                            <button @click="navigateAndClose('/login')"
                                class="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300">
                                LOGIN
                            </button>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    name: 'MainHeader',
    data() {
        return {
            brandName: 'NT SALON',
            logo: 'https://static.vecteezy.com/system/resources/previews/015/236/461/large_2x/male-hairstyle-design-illustration-vector.jpg',
            menuItems: [
                {
                    label: 'HOME',
                    path: '/home',
                    icon: 'pi pi-home',
                },
                {
                    label: 'BOOKING',
                    path: '/booking',
                    icon: 'pi pi-calendar',
                },
                {
                    label: 'HAIR STYLE',
                    path: '/hair',
                    icon: 'pi pi-star',
                    submenu: [
                        { label: 'Men', path: '/hair/men' },
                        { label: 'Women', path: '/hair/women' }
                    ]
                },
                {
                    label: 'DETECT',
                    path: '/detect',
                    icon: 'pi pi-image',
                },
                {
                    label: 'ABOUT US',
                    path: '/about',
                    icon: 'pi pi-info-circle',
                },
            ],
            isLoggedIn: false,
            username: '',
            userRole: null,
            mobileMenuOpen: false,
            openSubmenu: null
        };
    },
    methods: {
        toggleMobileMenu() {
            this.mobileMenuOpen = !this.mobileMenuOpen;
            // Close any open submenu when toggling the main menu
            if (!this.mobileMenuOpen) {
                this.openSubmenu = null;
            }
            // Prevent scrolling on body when mobile menu is open
            document.body.style.overflow = this.mobileMenuOpen ? 'hidden' : '';
        },
        toggleSubmenu(index) {
            this.openSubmenu = this.openSubmenu === index ? null : index;
        },
        navigateAndClose(path) {
            this.toggleMobileMenu();
            this.$router.push(path);
        },
        mobileLogout() {
            this.logout();
            this.toggleMobileMenu();
        },
        logout() {
            this.isLoggedIn = false;
            this.username = '';
            this.userRole = null;

            // Xóa thông tin đăng nhập khỏi localStorage
            localStorage.removeItem('user');
            localStorage.removeItem('jwtToken');

            // Chuyển hướng người dùng về trang chủ
            this.$router.push('/home');

            // Hiển thị thông báo đăng xuất thành công
            this.$toast.add({
                severity: 'success',
                summary: 'Logout',
                detail: 'Logged out successfully',
                life: 3000
            });
        },
        checkLoginStatus() {
            // Lấy thông tin từ localStorage và cập nhật trạng thái đăng nhập
            const user = JSON.parse(localStorage.getItem('user'));
            if (user && user.user_role === 2) {
                this.isLoggedIn = true;
                this.username = user.user_username;
                this.userRole = user.user_role;
            } else {
                this.isLoggedIn = false;
                this.username = '';
                this.userRole = null;
            }
        }
    },
    mounted() {
        // Kiểm tra trạng thái đăng nhập khi component được mount
        this.checkLoginStatus();

        // Kiểm tra trạng thái đăng nhập mỗi khi có sự thay đổi
        window.addEventListener('storage', this.checkLoginStatus);

        // Close mobile menu when window is resized to desktop size
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 1300 && this.mobileMenuOpen) { // 1300px là điểm ngắt mới
                this.mobileMenuOpen = false;
                document.body.style.overflow = '';
            }
        });
    },
    beforeUnmount() {
        // Loại bỏ sự kiện khi component bị hủy
        window.removeEventListener('storage', this.checkLoginStatus);
        window.removeEventListener('resize', () => { });
        // Ensure body overflow is restored
        document.body.style.overflow = '';
    }
};
</script>

<style scoped>
.group:hover .group-hover\:block {
    display: block;
}

.transition-colors {
    transition: all 0.3s ease;
}

.group {
    padding-bottom: 0.5rem;
}

.group>div[class*="absolute"] {
    margin-top: 0.5rem;
    margin-left: 0.5rem;
}

.group>div[class*="absolute"] {
    opacity: 0;
    transform: translateY(-10px);
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.group:hover>div[class*="absolute"] {
    opacity: 1;
    transform: translateY(0);
}

.group>div[class*="absolute"] a {
    display: flex;
    align-items: center;
}

/* Mobile menu animations */
.translate-x-0 {
    transform: translateX(0);
}

.translate-x-full {
    transform: translateX(100%);
}

/* Custom transitions for mobile menu */
.transition-all {
    transition-property: all;
}
</style>