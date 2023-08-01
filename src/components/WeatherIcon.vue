<script setup>
const props = defineProps({
  icon: {
    type: String,
    required: true
  },
  width: {
    type: String
  },
  height: {
    type: String
  },
  className: {
    type: String
  }
});
</script>

<template>
  <div class="weather-icon" :class="className">
    <img :src="icon" :width="width" :height="height" alt="icon weather" />
    <!--    <svg-icon :name="icon" :width="width" :height="height" />-->
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/blocks/weather-icon";
</style>
