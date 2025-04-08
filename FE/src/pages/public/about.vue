<template>
    <div class="about-container bg-gray-50">
        <!-- Hero Section -->
        <section class="relative bg-gradient-to-r from-blue-600 to-indigo-800 text-white">
            <!-- Hero Background Pattern -->
            <div class="absolute inset-0 opacity-10">
                <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                        <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
                            <path d="M 8 0 L 0 0 0 8" fill="none" stroke="white" stroke-width="0.5" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>

            <div class="container mx-auto px-6 md:px-12 py-20 md:py-32 relative z-10">
                <div class="max-w-4xl mx-auto text-center">
                    <h1 class="text-4xl md:text-5xl font-bold mb-6">About Us</h1>
                    <p class="text-lg md:text-xl opacity-90 leading-relaxed">
                        Welcome to NT Salon. We're dedicated to providing exceptional service and a seamless
                        appointment experience.
                    </p>
                </div>
            </div>
        </section>

        <!-- Mission & Vision -->
        <section class="py-16 bg-white">
            <div class="container mx-auto px-6 md:px-12">
                <div class="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <img src="/api/placeholder/600/400" alt="Our mission" class="rounded-lg shadow-lg w-full" />
                    </div>
                    <div>
                        <h2 class="text-3xl font-bold mb-6 text-gray-800">Our Mission & Vision</h2>
                        <p class="text-gray-600 mb-6 leading-relaxed">
                            Our mission is to simplify the appointment booking process and help our customers save time.
                            We believe in creating efficient solutions that make everyday tasks easier.
                        </p>
                        <p class="text-gray-600 leading-relaxed">
                            Our vision is to become the leading appointment booking platform, known for reliability,
                            ease of use, and exceptional customer service. We're constantly innovating to improve your
                            experience.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Personal Bio -->
        <!-- <section class="py-16 bg-gray-50">
            <div class="container mx-auto px-6 md:px-12">
                <div class="max-w-3xl mx-auto">
                    <h2 class="text-3xl font-bold mb-8 text-center text-gray-800">About the Founder</h2>

                    <div class="bg-white rounded-xl shadow-md overflow-hidden mb-8">
                        <div class="md:flex">
                            <div class="md:shrink-0">
                                <img src="/api/placeholder/300/300" alt="Founder"
                                    class="h-full w-full object-cover md:w-48" />
                            </div>
                            <div class="p-8">
                                <div class="text-indigo-600 font-semibold text-sm mb-1">Founder & CEO</div>
                                <h3 class="text-2xl font-bold text-gray-800">Your Name</h3>
                                <p class="mt-4 text-gray-600">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. In hac
                                    habitasse platea dictumst. Vivamus in diam eu urna mattis feugiat. Nullam tortor
                                    nisi, bibendum eget nisl id, ultrices semper orci.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="prose prose-lg max-w-none text-gray-600">
                        <p>
                            I started this service because I noticed a common problem many businesses and clients face -
                            the inefficiency and frustration that often comes with scheduling appointments. My
                            background in [your field] gave me the insights needed to create a solution that works for
                            everyone.
                        </p>
                        <p>
                            My professional journey began with [brief career story]. Throughout my career, I've been
                            passionate about [your interests/specialties] and have always focused on [your values or
                            approach].
                        </p>
                        <p>
                            When I'm not working on improving our booking system, I enjoy [your hobbies or interests]. I
                            believe that [personal philosophy or belief].
                        </p>
                    </div>
                </div>
            </div>
        </section> -->

        <!-- Our Values -->
        <section class="py-16 bg-white">
            <div class="container mx-auto px-6 md:px-12">
                <h2 class="text-3xl font-bold mb-12 text-center text-gray-800">Our Core Values</h2>

                <div class="grid md:grid-cols-3 gap-8">
                    <!-- Value 1 -->
                    <div
                        class="bg-blue-50 rounded-lg p-8 text-center transition-transform duration-300 hover:transform hover:scale-105">
                        <div class="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-600" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <h3 class="text-xl font-bold mb-3 text-gray-800">Reliability</h3>
                        <p class="text-gray-600">
                            We prioritize dependability and consistency in all our services. You can count on us to
                            deliver what we promise.
                        </p>
                    </div>

                    <!-- Value 2 -->
                    <div
                        class="bg-indigo-50 rounded-lg p-8 text-center transition-transform duration-300 hover:transform hover:scale-105">
                        <div class="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-indigo-600" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h3 class="text-xl font-bold mb-3 text-gray-800">Efficiency</h3>
                        <p class="text-gray-600">
                            We value your time and strive to create streamlined processes that maximize productivity and
                            minimize hassle.
                        </p>
                    </div>

                    <!-- Value 3 -->
                    <div
                        class="bg-purple-50 rounded-lg p-8 text-center transition-transform duration-300 hover:transform hover:scale-105">
                        <div class="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-purple-600" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 class="text-xl font-bold mb-3 text-gray-800">Innovation</h3>
                        <p class="text-gray-600">
                            We're committed to continuous improvement and finding creative solutions to enhance the
                            booking experience.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Call to Action -->
        <section class="py-16 bg-gradient-to-r from-blue-600 to-indigo-800 text-white">
            <div class="container mx-auto px-6 md:px-12 text-center">
                <h2 class="text-3xl font-bold mb-6">Ready to Experience Our Service?</h2>
                <p class="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
                    Join our growing list of satisfied customers and discover how our booking system can transform your
                    experience.
                </p>
                <router-link to="/booking"
                    class="inline-block bg-white text-indigo-700 font-medium py-3 px-8 rounded-lg shadow-md hover:bg-gray-100 transition duration-300">
                    Book an Appointment
                </router-link>
            </div>
        </section>

        <!-- Contact Section -->
        <section class="py-16 bg-white">
            <div class="container mx-auto px-6 md:px-12">
                <div class="max-w-3xl mx-auto text-center">
                    <h2 class="text-3xl font-bold mb-6 text-gray-800">Get in Touch</h2>
                    <p class="text-gray-600 mb-8">
                        Have questions or need more information? We'd love to hear from you!
                    </p>

                    <div class="grid md:grid-cols-3 gap-6 text-center">
                        <!-- Email -->
                        <div class="p-6">
                            <div
                                class="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 class="text-lg font-semibold mb-2 text-gray-800">Email</h3>
                            <p class="text-gray-600">contact@yourcompany.com</p>
                        </div>

                        <!-- Phone -->
                        <div class="p-6">
                            <div
                                class="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                            <h3 class="text-lg font-semibold mb-2 text-gray-800">Phone</h3>
                            <p class="text-gray-600">+1 (123) 456-7890</p>
                        </div>

                        <!-- Address -->
                        <div class="p-6">
                            <div
                                class="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-orange-600" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <h3 class="text-lg font-semibold mb-2 text-gray-800">Address</h3>
                            <p class="text-gray-600">123 Booking Street, Suite 101<br>City, State 12345</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    name: 'AboutPage',
    metaInfo: {
        title: 'About Us'
    }
}
</script>