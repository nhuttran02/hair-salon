// import { createRouter, createWebHistory } from 'vue-router';
// import routes from './routes';
// import store from '../store';

// // const router = Router();
// // export default router;

// // function Router(){
// //     const router = createRouter({
// //         history: createWebHistory(),
// //         routes,
// //     });
// //     return router;
// // }

// // Cách viết gọn hơn, không cần tạo hàm Router riêng
// const router = createRouter({
//     history: createWebHistory(),
//     routes,
// });

// console.log("Routes:", routes);
// //use navigation guard to check if user is logged in
// router.beforeEach((to, from, next) => {
//     if (to.matched.some(record => record.meta.requiresAuth)) {
//         if (!store.state.isLoggedIn) {
//             next({ name: 'login' });
//         } else {
//             next(); //Allow to access if logged in
//         }
//     }else{
//         next();  //If not required login, then next
//     }
// });

// export default router;

import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";
import store from "../store";

// const router = Router();
// export default router;

// function Router(){
//     const router = createRouter({
//         history: createWebHistory(),
//         routes,
//     });
//     return router;
// }

// Cách viết gọn hơn, không cần tạo hàm Router riêng
const router = createRouter({
  history: createWebHistory(),
  routes,
});

console.log("Routes:", routes);
//use navigation guard to check if user is logged in
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.state.isLoggedIn) {
      next({ name: "login" });
    } else {
      next(); //Allow to access if logged in
    }
  } else {
    next(); //If not required login, then next
  }
});

export default router;