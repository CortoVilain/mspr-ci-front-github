import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from "../components/client";
import Stats from "../components/stats";

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'helloword',
            component: HelloWorld
        },
        {
            path: '/statistique',
            name: 'stats',
            component: Stats
        }
    ]
})

export default router
