import Vue from "vue";
import App from "./App.vue";
import router from "@/router";
import store from "@/store";
import "@/styles/app.less";
import VueQuillEditor from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

// 引入原子组件库
import PizzaUI from "@bigbighu/mobili-pizza";
// 引入业务组件库
import CoffeeUI from "@bigbighu/mobili-coffee";

Vue.config.productionTip = false;

Vue.use(PizzaUI);
Vue.use(CoffeeUI);
Vue.use(VueQuillEditor);

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount("#app");
