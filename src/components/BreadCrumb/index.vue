<template>
    <div class="breadCrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <transition-group name="breadcrumb">
                <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
                    <span v-if="index === levelList.length - 1">{{ item.meta.title }}</span>
                    <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
                </el-breadcrumb-item>
            </transition-group>
        </el-breadcrumb>
    </div>
</template>

<script>
export default {
    name: 'BreadCrumb',
    data() {
        return {
            levelList: ''
        }
    },
    created() {
        this.getBreadCrumb();
    },
    // 监听当前页面路由变化，触发面包屑更新方法
    watch: {
        $route() {
            this.getBreadCrumb();
        }
    },
    methods: {
        getBreadCrumb() {
            let matched = this.$route.matched.filter(item => item.meta && (item.meta.title && item.meta.breadcrumb));
            // 判断当前路由是否为首页
            let first = matched[0];
            if (!this.isHome(first)) {
                matched = [{ path: '/home', meta: { title: '首页' } }].concat(matched);
            }
            this.levelList = matched;
        },
        isHome(route) {
            return route.meta.title.trim() === '首页';
        },
        // 面包屑跳转逻辑
        handleLink(item) {
            this.$router.push({ path: item.path });
        }
    },
}
</script>

<style lang="less" scoped>
.breadCrumb {

    .el-breadcrumb {
        line-height: 64px;
    }
}
</style>