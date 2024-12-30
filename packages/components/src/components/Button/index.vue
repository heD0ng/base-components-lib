<template>
    <button @click="handleClick">
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: 'aiot-button',
    props: {},
    methods: {
        handleClick() {
            this.$emit('click')
        }
    }
};
</script>

<style scoped lang="scss">
button {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
}
</style>