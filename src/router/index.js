   // src/router/index.js
   import { createRouter, createWebHistory } from 'vue-router';
   import HomeView from '../views/HomeView.vue';
   import BoardView from '../views/BoardView.vue';
   import DashBoardView from '../views/DashBoardView.vue';
   import SettingsView from '../views/SettingsView.vue';
   const routes = [
     {
       path: '/',
       name: 'home',
       component: HomeView,
     },
     {
       path: '/board',
       name: 'board',
       component: BoardView,
     },
     {
       path: '/dash',
       name: 'dash',
       component: DashBoardView,
     },
     {
       path: '/settings',
       name: 'settings',
       component: SettingsView,
     },
     // add additional routes as needed
   ];

   const router = createRouter({
     history: createWebHistory(),
     routes,
   });

   export default router;