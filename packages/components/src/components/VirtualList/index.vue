<template>
    <div class="container">
        <div class="virtual-list-container">
            <div class="virtual-list-list">
            </div>
        </div>
    </div>
</template>

<script>
import { VirtualList } from './config'
export default {
    name: 'virtual-list',
    props: {},
    data() {
        return {
            instance: null,
        }
    },
    mounted() {
        this.instance = new VirtualList('.virtual-list-container', '.virtual-list-list')
        this.instance.init()
    },
    methods: {
        handleClick() {
            this.$emit('click')
        }
    }
};
</script>

<style scoped lang="scss">
/* 容器布局并设置具体的宽高 */
.container {
    width: 600px;
    height: 400px;
    box-sizing: border-box;
    border: 1px solid red;

    /* 作为虚拟列表组件宽高由父组件决定，注意这里需要保证垂直方向有滚动条 */
    .virtual-list-container {
        width: 100%;
        height: 100%;
        overflow-y: scroll;

        /* list 高度会用 JS 设置动态样式 */
        .virtual-list-list {
            width: 100%;

            /* item 固定高度即可，其他样式仅为了做展示 */
            .virtual-list-item {
                width: 100%;
                height: 100px;
                box-sizing: border-box;
                border: 1px solid #000;
                text-align: center;
                font-size: 20px;
                line-height: 100px;
            }
        }
    }
}
</style>
<style lang="scss">
/* item 固定高度即可，其他样式仅为了做展示 */
.virtual-list-item {
    width: 100%;
    height: 100px;
    box-sizing: border-box;
    border: 1px solid #000;
    text-align: center;
    font-size: 20px;
    line-height: 100px;
}
</style>