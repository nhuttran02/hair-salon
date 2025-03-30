<template>
    <div class="h-screen bg-gray-800" id="side-bar"
        :class="dataOpenSideBar == true ? 'side-bar-visible' :'side-bar-close'">
        <div class="bg-gray-700 h-[50px] flex justify-center items-center">
            <div class="text-xl font-bold text-center flex items-center justify-center text-white h-full"
                v-show="dataOpenSideBar">
                NT SALON
            </div>
            <img src="https://avatars.githubusercontent.com/u/52994557?" v-show="!dataOpenSideBar"
                class="p-1 w-8 h-8 rounded-full ring-2 ring-gray-100 dark:ring-gray-500" alt="Avatar">
        </div>

        <div class="flex flex-col justify-between h-[calc(100vh-3rem)] bg-gray-900">
            <div class="menu-man text-left px-2 whitespace-nowrap">
                <div class="profile flex justify-center items-center text-center p-5">
                    <div class="text-center text-white" v-show="dataOpenSideBar">
                        <img src="https://avatars.githubusercontent.com/u/52994557?"
                            class="p-1 w-24 h-24 rounded-full ring-2 ring-gray-300 dark:ring-gray-500 mb-4"
                            alt="Avatar">
                        <h5 class="text-xl font-medium leading-tight mb-2 text-center text-white">tranhongnhut</h5>
                        <p class="text-gray-500">ADMIN</p>
                    </div>
                </div>
                <div class="py-3 rounded-sm cursor-pointer text-gray-300 hover:text-white">
                    <router-link to="/admin" class="px-2 flex space-x-2 items-center"><span class="pi pi-microsoft"
                            v-tooltip.right="'DASHBOARD'"></span><span
                            v-show="dataOpenSideBar">DASHBOARD</span></router-link>
                </div>
                <div class="py-3 rounded-md cursor-pointer text-gray-300 hover:text-white">
                    <router-link to="/admin/useradmin" class="px-2 flex space-x-2 items-center"><span class="pi pi-user"
                            v-tooltip.right="'ADMIN'"></span><span v-show="dataOpenSideBar">ADMIN</span></router-link>
                </div>
                <div class="py-3 rounded-md cursor-pointer text-gray-300 hover:text-white">
                    <router-link to="/admin/service" class="px-2 flex space-x-2 items-center"><span
                            class="pi pi-cart-plus" v-tooltip.right="'SERVICES'"></span><span
                            v-show="dataOpenSideBar">SERVICES</span></router-link>
                </div>
                <div class="py-3 rounded-md cursor-pointer text-gray-300 hover:text-white">
                    <router-link to="/admin/staff" class="px-2 flex space-x-2 items-center"><span class="pi pi-whatsapp"
                            v-tooltip.right="'STAFF'"></span><span v-show="dataOpenSideBar">STAFF</span></router-link>
                </div>
                <div class="py-3 rounded-md cursor-pointer text-gray-300 hover:text-white">
                    <router-link to="/admin/customer" class="px-2 flex space-x-2 items-center"><span
                            class="pi pi-shield" v-tooltip.right="'CUSTOMER'"></span><span
                            v-show="dataOpenSideBar">CUSTOMER</span></router-link>
                </div>
                <div class="py-3 rounded-md cursor-pointer text-gray-300 hover:text-white">
                    <router-link to="/admin/appointment" class="px-2 flex space-x-2 items-center"><span
                            class="pi pi-check-circle" v-tooltip.right="'APPOINTMENT'"></span><span
                            v-show="dataOpenSideBar">APPOINTMENT</span></router-link>
                </div>
                <div class="py-3 rounded-md cursor-pointer text-gray-300 hover:text-white">
                    <router-link to="/admin/hairstyles" class="px-2 flex space-x-2 items-center"><span
                            class="pi pi-prime" v-tooltip.right="'HAIRSTYLES'"></span><span
                            v-show="dataOpenSideBar">HAIRSTYLES</span></router-link>
                </div>
                <div class="py-3 rounded-md cursor-pointer text-gray-300 hover:text-white">
                    <router-link to="/admin/branch" class="px-2 flex space-x-2 items-center"><span
                            class="pi pi-building" v-tooltip.right="'BRANCH'"></span><span
                            v-show="dataOpenSideBar">BRANCH</span></router-link>
                </div>
                <!-- <div class="py-3 rounded-md text-gray-300">
                    <div class="px-2 flex space-x-2 items-center cursor-pointer" v-tooltip.right="'HAIRSTYLES'">
                        <span class="pi pi-check-circle"></span><span v-show="dataOpenSideBar">HAIRSTYLES</span>
                    </div>
                    <div v-show="dataOpenSideBar" class="pl-6">
                        <div class="py-2 hover:text-white">
                            <router-link to="/admin/hairstyles/men" class="flex space-x-2 items-center">
                                <span class="pi pi-user" v-tooltip.right="'MEN HAIRSTYLES'"></span><span>MEN</span>
                            </router-link>
                        </div>
                        <div class="py-2 hover:text-white">
                            <router-link to="/admin/hairstyles/women" class="flex space-x-2 items-center">
                                <span class="pi pi-user" v-tooltip.right="'WOMEN HAIRSTYLES'"></span><span>WOMEN</span>
                            </router-link>
                        </div>
                    </div>
                </div> -->
                <div class="py-3 rounded-md cursor-pointer text-gray-300 hover:text-white">
                    <div class="px-2 flex space-x-2 items-center"><span class="pi pi-slack"
                            v-tooltip.right="'SETTING'"></span><span v-show="dataOpenSideBar">SETTING</span></div>
                </div>
            </div>
            <!-- <div class="menu-man text-left px-2 justify-self-end whitespace-nowrap">
                <div class="py-3 rounded-md cursor-pointer text-gray-300 hover:text-white">
                    <a href="https://website-nuxt-front.vercel.app/" target="_blank"
                        class="px-2 flex space-x-2 items-center"><span class="pi pi-question"
                            v-tooltip.right="'ABOUT ME'"></span><span v-show="dataOpenSideBar">ABOUT ME</span></a>
                </div>
            </div> -->
        </div>
    </div>
</template>

<script>
export default{
    props: {
        dataOpenSideBar: Boolean
    },
}
</script>

<style>
.p-tooltip-text{
    font-size: 15px !important;
}

#side-bar{
    overflow: hidden;
    transition: 300ms;
}

.side-bar-visible{
    width: 250px !important;
}

.side-bar-close{
    width: 50px !important;
}
</style>