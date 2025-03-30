// export default [
//   {
//     name: "Master",
//     path: "/admin",
//     component: () => import("../pages/layout/master.vue"), // Correct import syntax
//     redirect: "/admin/dashboard",
//     // meta: { requiresAuth: true }, //required login
//     }
//     children: [
//       {
//         name: "dashboard",
//         path: "/admin/dashboard",
//         component: () => import("./../pages/admin/dashboard.vue"), // Correct import syntax
//         // meta: { requiresAuth: true }, //required login
//       },
//       {
//         name: "admin",
//         path: "/admin/useradmin",
//         component: () => import("./../pages/admin/useradmin.vue"), // Correct import syntax
//         // meta: { requiresAuth: true }, //required login
//       },
//       {
//         name: "service",
//         path: "/admin/service",
//         component: () => import("./../pages/admin/service.vue"), // Correct import syntax
//         // meta: { requiresAuth: true }, //required login
//       },
//       {
//         name: "staff",
//         path: "/admin/staff",
//         component: () => import("./../pages/admin/staff.vue"), // Correct import syntax
//         // meta: { requiresAuth: true }, //required login
//       },
//       {
//         name: "customer",
//         path: "/admin/customer",
//         component: () => import("./../pages/admin/customer.vue"), // Correct import syntax
//         // meta: { requiresAuth: true }, //required login
//       },
//       {
//         name: "appointment",
//         path: "/admin/appointment",
//         component: () => import("./../pages/admin/appointment.vue"), // Correct import syntax
//         // meta: { requiresAuth: true }, //required login
//       },
//     ],
//   },
//   //mainpage
//   {
//     path: "/",
//     component: () => import("../pages/layout/mainmaster.vue"),
//     redirect: "/home",
//     children: [
//       {
//         path: "/home",
//         name: "home",
//         component: () => import("../pages/public/home.vue"),
//       },
//       {
//         path: "/booking",
//         name: "booking",
//         component: () => import("../pages/public/booking.vue"),
//       },
//       {
//         path: "/hair",
//         name: "hair",
//         component: () => import("../pages/public/hair/hair.vue"),
//         children: [
//           {
//             path: "men",
//             name: "hair-men",
//             component: () => import("../pages/public/hair/men.vue"),
//           },
//           {
//             path: "women",
//             name: "hair-women",
//             component: () => import("../pages/public/hair/women.vue"),
//           },
//         ],
//       },
//       {
//         path: "/detect",
//         name: "detect",
//         component: () => import("../pages/public/detect.vue"),
//       },
//       {
//         path: "/about",
//         name: "about",
//         component: () => import("../pages/public/about.vue"),
//       },
//       {
//         path: "/login",
//         name: "login",
//         component: () => import("../pages/public/login.vue"),
//       },
//     ],
//   },


// import { createRouter, createWebHistory } from "vue-router";
// import store from "../store"; // Import store để kiểm tra authentication

// const routes = [
//   {
//     name: "Master",
//     path: "/admin",
//     component: () => import("../pages/layout/master.vue"),
//     redirect: "/admin/dashboard",
//     meta: {
//       requiresAuth: true, // Yêu cầu đăng nhập
//       requiresAdmin: true, // Yêu cầu quyền admin
//     },
//     children: [
//       {
//         name: "dashboard",
//         path: "/admin/dashboard",
//         component: () => import("./../pages/admin/dashboard.vue"),
//         meta: {
//           requiresAuth: true,
//           requiresAdmin: true,
//         },
//       },
//       {
//         name: "admin",
//         path: "/admin/useradmin",
//         component: () => import("./../pages/admin/useradmin.vue"),
//         meta: {
//           requiresAuth: true,
//           requiresAdmin: true,
//         },
//       },
//       {
//         name: "service",
//         path: "/admin/service",
//         component: () => import("./../pages/admin/service.vue"),
//         meta: {
//           requiresAuth: true,
//           requiresAdmin: true,
//         },
//       },
//       {
//         name: "staff",
//         path: "/admin/staff",
//         component: () => import("./../pages/admin/staff.vue"),
//         meta: {
//           requiresAuth: true,
//           requiresAdmin: true,
//         },
//       },
//       {
//         name: "customer",
//         path: "/admin/customer",
//         component: () => import("./../pages/admin/customer.vue"),
//         meta: {
//           requiresAuth: true,
//           requiresAdmin: true,
//         },
//       },
//       {
//         name: "appointment",
//         path: "/admin/appointment",
//         component: () => import("./../pages/admin/appointment.vue"),
//         meta: {
//           requiresAuth: true,
//           requiresAdmin: true,
//         },
//       },
//     ],
//   },
//   {
//     path: "/",
//     component: () => import("../pages/layout/mainmaster.vue"),
//     redirect: "/home",
//     children: [
//       {
//         path: "/home",
//         name: "home",
//         component: () => import("../pages/public/home.vue"),
//       },
//       {
//         path: "/booking",
//         name: "booking",
//         meta: {
//           requiresAuth: true, // Nếu booking cần đăng nhập
//         },
//         component: () => import("../pages/public/booking.vue"),
//       },
//       {
//         path: "/hair",
//         name: "hair",
//         component: () => import("../pages/public/hair/hair.vue"),
//         children: [
//           {
//             path: "men",
//             name: "hair-men",
//             component: () => import("../pages/public/hair/men.vue"),
//           },
//           {
//             path: "women",
//             name: "hair-women",
//             component: () => import("../pages/public/hair/women.vue"),
//           },
//         ],
//       },
//       {
//         path: "/detect",
//         name: "detect",
//         component: () => import("../pages/public/detect.vue"),
//       },
//       {
//         path: "/about",
//         name: "about",
//         component: () => import("../pages/public/about.vue"),
//       },
//       {
//         path: "/login",
//         name: "login",
//         component: () => import("../pages/public/login.vue"),
//       },
//     ],
//   },
//   // Thêm route 404 không tìm thấy trang
//   {
//     path: "/:pathMatch(.*)*",
//     name: "NotFound",
//     component: () => import("../pages/NotFound.vue"),
//   },
// ];

// const router = createRouter({
//   history: createWebHistory(),
//   routes,
// });

// // Navigation Guard
// router.beforeEach((to, from, next) => {
//   const isAuthenticated = store.getters.isAuthenticated;
//   const isAdmin = store.getters.isAdmin;

//   if (to.meta.requiresAdmin) {
//     // Nếu route yêu cầu quyền admin
//     if (!isAuthenticated) {
//       // Chưa đăng nhập
//       next("/login");
//     } else if (!isAdmin) {
//       // Đã đăng nhập nhưng không phải admin
//       next("/"); // Chuyển về trang chủ
//     } else {
//       next(); // Cho phép truy cập
//     }
//   } else if (to.meta.requiresAuth) {
//     // Nếu route yêu cầu đăng nhập
//     if (!isAuthenticated) {
//       next("/login");
//     } else {
//       next();
//     }
//   } else {
//     next(); // Các route không yêu cầu xác thực
//   }
// });

// export default router;

export default [
  {
    name: "Master",
    path: "/admin",
    component: () => import("../pages/layout/master.vue"), // Correct import syntax
    redirect: "/admin/dashboard",
    // meta: { requiresAuth: true }, // Required login
    children: [
      {
        name: "dashboard",
        path: "/admin/dashboard",
        component: () => import("./../pages/admin/dashboard.vue"), // Correct import syntax
        // meta: { requiresAuth: true }, // Required login
      },
      {
        name: "admin",
        path: "/admin/useradmin",
        component: () => import("./../pages/admin/useradmin.vue"), // Correct import syntax
        // meta: { requiresAuth: true }, // Required login
      },
      {
        name: "service",
        path: "/admin/service",
        component: () => import("./../pages/admin/service.vue"), // Correct import syntax
        // meta: { requiresAuth: true }, // Required login
      },
      {
        name: "staff",
        path: "/admin/staff",
        component: () => import("./../pages/admin/staff.vue"), // Correct import syntax
        // meta: { requiresAuth: true }, // Required login
      },
      {
        name: "customer",
        path: "/admin/customer",
        component: () => import("./../pages/admin/customer.vue"), // Correct import syntax
        // meta: { requiresAuth: true }, // Required login
      },
      {
        name: "appointment",
        path: "/admin/appointment",
        component: () => import("./../pages/admin/appointment.vue"), // Correct import syntax
        // meta: { requiresAuth: true }, // Required login
      },
      {
        name: "hairstyles",
        path: "/admin/hairstyles",
        component: () => import("./../pages/admin/hairstyles.vue"), // Correct import syntax
        // meta: { requiresAuth: true }, // Required login
      },
      {
        name: "branch",
        path: "/admin/branch",
        component: () => import("./../pages/admin/branch.vue"), // Correct import syntax
        // meta: { requiresAuth: true }, // Required login
      },
      // {
      //   path: "/admin/hairstyles",
      //   redirect: "/admin/hairstyles/men", // Điều hướng trực tiếp đến /admin/hairstyles/men
      //   children: [
      //     {
      //       name: "hairstyles-men",
      //       path: "men", // Không cần /, sẽ tự động nối với /admin/hairstyles
      //       component: () => import("../pages/admin/hairstyles/men.vue"), // Import trang con Men Hairstyles
      //     },
      //     {
      //       name: "hairstyles-women",
      //       path: "women", // Không cần /, sẽ tự động nối với /admin/hairstyles
      //       component: () => import("../pages/admin/hairstyles/women.vue"), // Import trang con Women Hairstyles
      //     },
      //   ],
      // },
    ],
  },
  // Main page
  {
    path: "/",
    component: () => import("../pages/layout/mainmaster.vue"),
    redirect: "/home",
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("../pages/public/home.vue"),
      },
      {
        path: "/booking",
        name: "booking",
        component: () => import("../pages/public/booking.vue"),
      },
      {
        path: "/hair",
        name: "hair",
        component: () => import("../pages/public/hair/hair.vue"),
        children: [
          {
            path: "men",
            name: "hair-men",
            component: () => import("../pages/public/hair/men.vue"),
          },
          {
            path: "women",
            name: "hair-women",
            component: () => import("../pages/public/hair/women.vue"),
          },
        ],
      },
      {
        path: "/detect",
        name: "detect",
        component: () => import("../pages/public/detect.vue"),
      },
      {
        path: "/about",
        name: "about",
        component: () => import("../pages/public/about.vue"),
      },
      {
        path: "/login",
        name: "login",
        component: () => import("../pages/public/login.vue"),
      },
      {
        path: "/register",
        name: "register",
        component: () => import("../pages/public/register.vue"),
      },
    ],
  },
];