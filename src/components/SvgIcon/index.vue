<!--  -->
<template>
    <svg :class="svgClass" aria-hidden="true">
        <use :xlink:href="iconName"></use>
    </svg>
</template>

<script>
export default {
    name: "svg-icon",
    props: {
        iconClass: {
            type: String,
            required: true
        },
        className: {
            type: String
        }
    },
    computed: {
        iconName() {
            return `#icon-${this.iconClass}`;
        },
        svgClass() {
            if (this.className) {
                return "svg-icon " + this.className;
            } else {
                return "svg-icon";
            }
        }
    }
};
</script>
<style lang='scss' scoped>
.svg-icon {
    width: 1.4em;
    height: 1.45em;
    vertical-align: middle;
    fill: currentColor;
    overflow: hidden;
}
</style>