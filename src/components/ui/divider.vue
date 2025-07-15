<template>
  <div class="divider" :class="{
    'divider-vertical': vertical,
    'divider-horizontal': !vertical,
  }"></div>
</template>
<script setup>
const props = defineProps({
  thickness: {
    type: Number,
    default: 1
  },
  vertical: {
    type: Boolean,
    default: false
  },
  parentPadding: {
    type: Number,
    default: 10 // Default padding of parent in px
  }
});
</script>
<style scoped>
.divider {
  background-color: var(--border-color);
}

/* Horizontal divider */
.divider:not(.divider-vertical) {
  height: v-bind('(thickness) + "px"');
  width: v-bind('`calc(100% + ${parentPadding * 2}px)`');
  margin-left: v-bind('`-${parentPadding}px`');
  margin-right: v-bind('`-${parentPadding}px`');
}

/* Vertical divider */
.divider-vertical {
  width: v-bind('(thickness) + "px"');
  height: v-bind('`calc(100% + ${parentPadding * 2}px)`');
  margin-top: v-bind('`-${parentPadding}px`');
  margin-bottom: v-bind('`-${parentPadding}px`');
}
</style>