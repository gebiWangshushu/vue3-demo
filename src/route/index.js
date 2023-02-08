import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    {
        path: "/",
        name: "home",
        component: () => import("@/components/HelloWorld.vue")
    },
    {
        path: "/dependency-test",
        name: "dependency-test",
        component: () => import("@/custom-components/SlzDependencyTest/SlzDependencyTest.vue")
    }
]

const router = createRouter({
    mode: 'history',
    history: createWebHashHistory(),
    routes

});

export default router;  