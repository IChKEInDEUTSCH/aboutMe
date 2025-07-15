import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/HomeView.vue')
      },
      {
        path: 'info',
        name: 'Info',
        component: () => import('@/pages/info.vue')
      },
      {
        path: 'experience',
        name: 'Experience',
        component: () => import('@/pages/experience.vue')
      },
      {
        path: 'contest',
        name: 'Contest',
        component: () => import('@/pages/contest.vue')
      },
      {
        path: 'portfolio',
        name: 'Portfolio',
        component: () => import('@/pages/portfolio.vue')
      }
    ]
  },
  {
    // Catch-all route for 404 pages
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/pages/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory('/aboutMe/'),
  routes
})

export default router
