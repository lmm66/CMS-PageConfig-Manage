const getters = {
    // 计算左侧组件列表组件的使用的数量
    pageComponentTotalMap(state) {
        // 数据结构:{ 组件名称1: 使用数量, 组件名称2: 使用数量 }
        let map = {};
        let cList = state.pageData.componentList || [];
        let cName;
        cList.forEach(item => {
            cName = item.data.component;
            if(map[cName]) {
                map[cName]++;
            } else {
                map[cName] = 1;
            }
        })
        return map;
    }
}
// 模块化导出
export default Object.assign({}, getters);