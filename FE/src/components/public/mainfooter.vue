<!-- src/components/mainfooter.vue -->
<template>
    <footer class="bg-gray-800 text-white py-8">
        <div class="container mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                <!-- Column 1 -->
                <div>
                    <h3 class="text-xl font-bold mb-4">About Us</h3>
                    <p class="text-gray-300 text-justify">
                        NT Salon is the ideal destination for those who love style and attentive care. We specialize in
                        providing consulting services, haircuts, and hair styling according to the latest trends,
                        helping customers find the style that best suits their personality and beauty. With a team of
                        experienced professionals and a luxurious space, NT Salon is committed to bringing you a
                        relaxing, comfortable, and satisfying beauty experience.
                    </p>
                </div>

                <!-- Column 2 -->
                <div>
                    <h3 class="text-xl font-bold mb-4">Quick Links</h3>
                    <ul class="space-y-4">
                        <li><router-link to="/" class="text-gray-300 hover:text-white">HOME</router-link></li>
                        <li><router-link to="/booking" class="text-gray-300 hover:text-white">BOOKING</router-link></li>
                        <li><router-link to="/hair/men" class="text-gray-300 hover:text-white">MEN'S HAIR</router-link>
                        </li>
                        <li><router-link to="/hair/women" class="text-gray-300 hover:text-white">WOMEN'S
                                HAIR</router-link> </li>
                        <li><router-link to="/about" class="text-gray-300 hover:text-white">ABOUT US</router-link> </li>
                    </ul>
                </div>

                <!-- Column 3 -->
                <div>
                    <h3 class="text-xl font-bold mb-4">Contact Info</h3>
                    <ul class="space-y-4 text-gray-300">
                        <li>Email: nhutsalon@gmail.com</li>
                        <li>Phone: 0922008052</li>
                        <li>Address: 3/2 Street, Xuan Khanh Ward, Ninh Kieu District, Can Tho City</li>
                    </ul>
                </div>

                <!-- Column 4 -->
                <div>
                    <h3 class="text-xl font-bold mb-4">Follow Us</h3>
                    <div class="flex space-x-4">
                        <!-- Social media -->
                        <a href="https://www.facebook.com/nhut.tran.1708" class="text-gray-300 hover:text-white">
                            <i class="pi pi-facebook"></i>
                        </a>
                        <a href="https://x.com/TrnHngNht4" class="text-gray-300 hover:text-white">
                            <i class="pi pi-twitter"></i>
                        </a>
                        <a href="https://www.instagram.com/nhuttran02/" class="text-gray-300 hover:text-white">
                            <i class="pi pi-instagram"></i>
                        </a>
                    </div>
                </div>
            </div>

            <div class="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
                <p>&copy; {{ new Date().getFullYear() }} NHUT SALON . All rights reserved.</p>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    name: 'MainFooter'
}
</script>