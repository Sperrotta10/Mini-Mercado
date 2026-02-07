<template>
  <div
    class="sk"
    :style="{
      width: width ?? '100%',
      height: height ?? '14px',
      borderRadius: radius ?? '10px'
    }"
  />
</template>

<script setup>
const props = defineProps({
  width: { type: String, required: false, default: undefined },
  height: { type: String, required: false, default: undefined },
  radius: { type: String, required: false, default: undefined },
});

const { width, height, radius } = props;
</script>

<style scoped>
.sk {
  background: linear-gradient(90deg, #e6e6e6 25%, #f3f3f3 37%, #e6e6e6 63%);
  background-size: 400% 100%;
  animation: shimmer 1.2s ease-in-out infinite;
}

@keyframes shimmer {
  0% {
    background-position: 100% 0;
  }
  100% {
    background-position: 0 0;
  }
}
</style>
