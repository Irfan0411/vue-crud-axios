import { createRouter, createWebHistory } from 'vue-router'
import Katalog from '@/pages/Katalog.vue'
import Cart from '@/pages/Cart.vue'


const routes = [
    {
        path: '/',
        component: Katalog
    },
    {
        path: '/cart',
        component: Cart
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router