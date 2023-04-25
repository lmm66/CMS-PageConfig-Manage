import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";
import { Messager, createRandomId } from "@/utils";
import setting from "@/config";
Vue.use(Vuex);

/**
 *  动态引入modules模块，利用webpack中的require.context
 *  拿到{ key: 文件名, value: 文件内容 } 形式的对象动态引入模块
 */
const modulesFiles = require.context("./modules", true, /\.js$/);
// modulesFiles.keys() => ['./index']
let modules = modulesFiles.keys().reduce((modules, modulePath) => {
	// ./index.js => index
	const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
	// modulesFiles(modulePath).default => 文件内容
	modules[moduleName] = modulesFiles(modulePath).default;
	return modules;
}, {});

/**
 * 初始化跨源通信实例
 * 分析：因为不同的组件可能都会使用到跨源通信，牵扯到不同组件的调用
 * 实现：把跨源通信的调用放入store中
 */
const messager = new Messager(setting.decorateOrigin);

// 页面的初始化数据
const emptyPageData = {
	id: "",
	name: "页面标题",
	shareDesc: "", // 微信分享文案
	shareImage: "", // 微信分享图片
	backgroundColor: "", // 页面背景颜色
	backgroundImage: "", // 页面背景图片
	backgroundPosiotion: "top", // 页面背景位置
	componentList: [],
};

export default new Vuex.Store({
	state: {
		// 当前组件的拖动状态标识
		dragActive: false,
		// 记录当前正在拖动的组件的数据
		dragComponent: {},
		// 存储当前页面的数据
		pageData: JSON.parse(JSON.stringify(emptyPageData)),
		// iframe容器的高度
		previewHeight: "",
		// H5页面所有组件距离H5页面顶部高度的集合
		componentsTopList: [],
		// 拖动组件要添加位置的索引
		addComponentIndex: null,
		// 当前选中的组件Id
		activeComponentId: null,
		// 当前设置的内容 1-页面 2-组件
		setType: 1,
		// 上传图片弹出框组件是否显示
		dialogImageVisible: false,
		// 上传图片成功后的回调事件
		upLoadImgSuccess: null,
		wxParams: JSON.stringify({ isLogin: true }), // h5页面参数
	},
	mutations: {
		// 修改组件拖动状态
		SET_DRAG_STATE(state, value) {
			state.dragActive = value;
			// console.log(state.dragActive);
		},

		// 设置当前正在拖动的组件对象
		SET_DRAG_COMPONENT(state, value) {
			state.dragComponent = value;
			// console.log(state.dragComponent);
		},

		// 更新页面组件数据的方法
		UPDATE_COMPONENT(state, value) {
			state.pageData = value || {};
		},

		// 监听crs回传数据，更新H5页面高度
		UPDATE_PAGE_HEIGHT(state, { pageHeight, componentsTopList }) {
			state.previewHeight = pageHeight;
			state.componentsTopList = componentsTopList;
		},

		// 修改拖动组件添加的位置
		SET_DRAG_INDEX(state, value) {
			state.addComponentIndex = value;
			// console.log(state.addComponentIndex);
		},

		// 修改选中组件的id
		SET_ACTIVE_ID(state, value) {
			state.activeComponentId = value;
			// console.log(state.activeComponentId)
		},

		// 修改设置的状态
		SET_SETTYPE(state, value) {
			state.setType = value;
			// console.log(state.setType);
		},

		// 修改图片上传的状态
		SET_UPIMAGE_VISIBLE(state, value) {
			state.dialogImageVisible = value;
		},

		// 修改上传图片成功的回调事件
		SET_UPIMAGE_FUC(state, value) {
			state.upLoadImgSuccess = value;
		},

		// 页面新增组件的方法
		ADD_COMPONENT(state, { index, data }) {
			// 对拿到的数据深拷贝防止原数据被修改
			let component = JSON.parse(JSON.stringify(data));
			// 生成一个随机数，作为新增组件的id
			let id = component.data.component + "-" + createRandomId();
			component.id = id;
			// 将新增的组件数据添加进页面的组件列表里
			state.pageData.componentList.splice(index, 0, component);
			// 将新添加的组件标识为选中状态
			this.commit("SET_ACTIVE_ID", id);
			// 更新H5新增组件的高亮效果
			this.commit("VIEW_SET_ACTIVE", id);
			// 将页面设置修改为组件配置
			this.commit("SET_SETTYPE", 2);
			// 还原拖拽组件的初始索引
			this.commit("SET_DRAG_INDEX", null);
		},

		// 删除组件的预添加效果
		DELETE_COMPONENT(state, value) {
			console.log(`跨源通信：删除${state.addComponentIndex}位置的预添加效果`);
			messager.emit("deletePreview", value);
		},

		// 页面编辑组件的方法
		EDIT_COMPONENT(state, data) {
			console.log(`修改了${data.newConfig.component}组件的配置`);
			let editItem = state.pageData.componentList.find((item) => {
				return item.id === data.id;
			});
			editItem.data = data.newConfig;
		},

		// 修改页面配置属性
		SET_PAGE_CONFIG(state, config) {
			Object.keys(config).forEach((item) => {
				state.pageData[item] = config[item];
			});
			// 同步页面数据到crs
			this.commit("VIEW_UPDATE");
		},

		// cms-manage -> crs 跨源通信，向crs发送页面详情数据，用以渲染页面所有组件
		VIEW_UPDATE(state) {
			messager.emit("pageChange", {
				value: state.pageData,
			});
		},

		// cms-manage -> crs 跨源通信，向crs发送组件添加位置的索引，用以触发预添加效果
		VIEW_ADD_PREVIEW(state, addIndex) {
			messager.emit("setPreview", addIndex);
			console.log(`跨源通信：在${addIndex}位置触发预添加效果`);
		},

		// cms-manage -> crs 跨源通信，向crs发送组件id，用以选中组件，更新组件的高亮效果
		VIEW_SET_ACTIVE(state, id) {
			messager.emit("setActive", id);
		},
	},
	actions: {
		// 跨源通信对象H5数据的监听
		initMessage({ commit }) {
			// 监听H5预览页面高度变化
			messager.on("pageHeightChange", (data) => {
				// 获取H5页面高度
				let pageHeight = data.height;
				// 获取H5页面所有组件距离H5顶部高度的集合
				let componentsTopList = data.componentsTopList;
				commit("UPDATE_PAGE_HEIGHT", { pageHeight, componentsTopList });
				console.log("从H5更新的当前页面高度为", pageHeight);
			});

			// 监听H5预览页面数据变化 (type, callback)
			messager.on("pageChange", (data) => {
				commit("UPDATE_COMPONENT", data);
				console.log("从H5更新组件数据为", data);
			});

			// 点击组件时，监听 crs 传递来的选中组件的id
			messager.on("setActive", (id) => {
				commit("SET_ACTIVE_ID", id);
				commit("SET_SETTYPE", 2);
				console.log("从H5更新当前组件选中的id为", id);
			});
		},

		// TODO:封装函数，通过传递数据的type分发不同的Mutation
		pageChange({ commit }, changeValue) {
			let commitObj = {
				add: "ADD_COMPONENT", // 添加组件
				delete: "DELETE_COMPONENT", // 删除预添加效果
				edit: "EDIT_COMPONENT", // 编辑组件
			};
			commitObj[changeValue.type] && commit(commitObj[changeValue.type], changeValue);
			// 向H5页面发送更新后的数据
			commit("VIEW_UPDATE");
		},
	},
	getters,
});
