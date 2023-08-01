<script setup>
import WeatherSlider from "@/modules/WeatherSlider.vue";
import WeatherHighlight from "@/modules/WeatherHighlight.vue";

const props = defineProps({
  title: {
    type: String,
    default: "Load weather"
  }
});
</script>

<template>
  <main class="home">
    <h1 class="title">{{ props.title }}</h1>
    <weather-slider />
    <weather-highlight />
  </main>
</template>

<style lang="scss" scoped>
@use "@/assets/scss/mixins" as *;

.home {
  padding: 40px 0 0 60px;
  display: flex;
  flex-direction: column;
  min-width: 0;

  @include vp-1199 {
    padding: 0 0 0 40px;
  }

  @include vp-1023 {
    padding: 40px 0 0;
  }
}

.title {
  font-size: 90px;
  font-weight: 700;
  line-height: 1.3;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  text-transform: capitalize;

  @include vp-1199 {
    font-size: 80px;
  }

  @include vp-767 {
    font-size: 55px;
  }
}
</style>
