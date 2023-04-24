<template>
    <ul class="page-set-list">
        <li :class="{ 'active': value === 1 }" @click="setActive(1)">
            <i class="icon page"></i>
            <span>页面设置</span>
        </li>
        <li :class="{ 'active': value === 2 }" @click="setActive(2)">
            <i class="icon component"></i>
            <span>组件管理</span>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'ChangeSetType',
    props: {
        value: {
            type: Number,
            default: 1
        }
    },
    methods: {
        setActive(val) {
            this.$emit('input', val);
        },
    },
}
</script>

<style lang="less" scoped>
.page-set-list {
    position: fixed;
    top: 128px;
    right: 407px;
    font-size: 12px;
    text-align: center;
    color: #323233;

    li {
        width: 94px;
        height: 32px;
        line-height: 32px;
        background-color: #fff;
        margin-bottom: 12px;
        border-radius: 2px;
        box-shadow: 0 2px 8px 0 rgb(0 0 0 / 10%);
        cursor: pointer;

        &.active {
            background-color: #155bd4;
            color: #fff;

            .icon {
                background-position: 0 11px;
            }
        }

        .icon {
            display: inline-block;
            background-position: 0 -1px;
            background-size: cover;
            width: 12px;
            height: 12px;
            vertical-align: middle;
            margin-right: 7px;

            &.page {
                background-image: url("~@/assets/img/layout/set-type-page.png");
            }

            &.component {
                background-image: url("~@/assets/img/layout/set-type-component.png");
            }
        }
    }
}
</style>