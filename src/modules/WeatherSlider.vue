<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import WeatherIcon from "@/components/WeatherIcon.vue";
import "swiper/scss"

</script>

<template>
  <div class="slider">
    <swiper
      class="slider__swiper"
      :slides-per-view="'auto'"
      :space-between="20"
      :grab-cursor="true"
    >
      <swiper-slide
        class="slider__item"
        v-for="item in 10"
        :key="item"
      >
        <span class="slider__time">09:00</span>
        <weather-icon icon="icon-sun-cloud" width="35" height="35" class="slider__icon" />
        <span class="slider__temp">9&#176;C</span>
      </swiper-slide>
    </swiper>
  </div>
</template>

<style lang="sass">
@import "@/assets/scss/blocks/slider"
</style>
