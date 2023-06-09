import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    {
        path: "/listBlobFolder",
        name: "listBlobFolder",
        component: () => import("@/components/ListBlobFolder/ListBlobFolder.vue")
    },
    {
        path: "/home",
        name: "home",
        component: () => import("@/components/HelloWorld.vue")
    },
    {
        path: "/dependency-test",
        name: "dependency-test",
        component: () => import("@/custom-components/SlzDependencyTest/SlzDependencyTest.vue")
    },
    {
        path: "/signalR",
        name: "signalR",
        component: () => import("@/components/SignalR2.vue")
    }
]

const router = createRouter({
    mode: 'history',
    history: createWebHashHistory(),
    routes

});


export default router;  