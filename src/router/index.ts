import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import TandemPage from '@/views/TandemPage.vue'
import SoloPage from '@/views/SoloPage.vue'
import SportPage from '@/views/SportPage.vue'
import TrainingPage from '@/views/TrainingPage.vue'
import CertificatePage from '@/views/CertificatePage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/tandem',
      name: 'tandem',
      component: TandemPage
    },
    {
      path: '/solo',
      name: 'solo',
      component: SoloPage
    },
    {
      path: '/sport',
      name: 'sport',
      component: SportPage
    },
    {
      path: '/training',
      name: 'training',
      component: TrainingPage
    },
    {
      path: '/certificate',
      name: 'certificate',
      component: CertificatePage
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router
