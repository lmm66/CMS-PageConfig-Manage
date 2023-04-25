import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/Layout";
Vue.use(VueRouter);

export default new VueRouter({
	routes: [
		{
			path: "/",
			component: Layout,
			redirect: "/login",
			children: [
				{
					path: "/home",
					meta: { title: "首页", breadcrumb: true },
					component: () => import("@/pages/home"),
				},
				{
					path: "/activity",
					meta: { title: "活动管理", breadcrumb: true },
					component: () => import("@/pages/activity"),
				},
			],
		},
		{
			path: "/login",
			name: "login",
			component: () => import("@/pages/login"),
		},
		{
			path: "/decorate",
			name: "decorate",
			component: () => import("@/pages/decorate"),
		},
		{
			path: "/preview",
			name: "preview",
			component: () => import("@/pages/preview"),
		},
		{
			path: "/404",
			component: () => import("@/pages/error-page/404.vue"),
		},
	],
});
