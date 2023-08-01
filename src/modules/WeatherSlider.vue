<script setup>
import WeatherIcon from "@/components/WeatherIcon.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { computed, inject } from "vue";
import { getHours } from "@/utils/date";
import "swiper/scss";

const daily = inject("daily");
const isEmpty = inject("isEmpty");

const getHoursWeather = computed(() => {
  const days = daily.value;
  return !isEmpty.value ? days.forecast.forecastday[0].hour : "";
});
</script>

<template>
  <div class="slider">
    <swiper
      class="slider__swiper"
      :slides-per-view="'auto'"
      :space-between="20"
      :grab-cursor="true"
      v-if="getHoursWeather"
    >
      <swiper-slide class="slider__item" v-for="item in getHoursWeather" :key="item.time_epoch">
        <span class="slider__time">{{ getHours(item.time_epoch) }}</span>
        <weather-icon :icon="item.condition.icon" width="45" height="45" class="slider__icon" />
        <span class="slider__temp">{{ item.temp_c }}&#176;C</span>
      </swiper-slide>
    </swiper>
  </div>
</template>

<style lang="sass">
@import "@/assets/scss/blocks/slider"
</style>
