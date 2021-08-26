import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Contact from '@/views/Contact.vue';

// import store from '@/store';

const routes = [
  {
    name: 'home',
    path: '/',
    component: Home,
  },
  {
    name: 'contact',
    // path: '/contact/',
    path: '/:id',
    component: Contact,
  },
  {
    path: '/:catchAll(.*)*',
    redirect: { name: 'home' },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkExactActiveClass: 'text-yellow-500',
});

// router.beforeEach((to, from, next) => {
//   const contactInfo = document.getElementsByClassName('contact-info');
//   contactInfo.classList.add('page-ready');
//   next();
// });
// router.beforeEach((to, from, next) => {
//   if (!to.matched.some((record) => record.meta.requiresAuth)) {
//     next();
//     return;
//   }
//   if (store.state.userLoggedIn) {
//     next();
//   } else {
//     next({ name: 'home' });
//   }
// });
export default router;
