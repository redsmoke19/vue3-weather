<script setup>
import AsideWeather from "@/modules/aside/AsideWeather.vue";
import HomeView from "@/views/HomeView.vue";
import useDebouncedRef from "@/hooks/useDebouncedRef";
import { isEmpty } from "@/common/helpers/isEmpty";
import { getImage } from "@/utils/image";
import { computed, ref, watch, provide } from "vue";
import { api } from "@/common/api/api";

const geo = ref([]);
const city = useDebouncedRef("", 500);
const weather = ref({});
const daily = ref({});

const { getGeoLocation, getCurrentWeather, getDailyWeather } = api;

const isEmptyObject = computed(() => {
  return isEmpty(weather.value);
});
const getTitle = computed(() => {
  return isEmptyObject.value ? "Choose you city" : weather.value.weather[0].description;
});

const getCoords = computed(() => {
  const { lat, lon } = geo.value;
  return {
    lat,
    lon
  };
});

const weatherLocation = computed(() => {
  const value = geo.value;

  return !isEmpty(value) ? `${value.name}, ${value.state}, ${value.country}` : "-";
});

const getBgImages = computed(() => {
  const isEmptyObj = isEmptyObject.value;
  const imageName = isEmptyObj ? "mist-bg" : getImage(weather.value?.weather[0].main);
  return new URL(`./assets/img/${imageName}.png`, import.meta.url).href;
});

watch(city, async () => {
  if (city.value.length) {
    geo.value = await getGeoLocation(city.value);
    if (!geo.value) {
      console.log('error');
      return;
    }
    daily.value = await getDailyWeather(getCoords.value);
    weather.value = await getCurrentWeather(getCoords.value);
  }
});

provide("weather", weather);
provide("isEmpty", isEmptyObject);
provide("daily", daily);
// provide("weather", { weather, isEmptyObject, daily });
</script>

<template>
  <div class="main-bg">
    <img :src="getBgImages" alt="Rain" />
  </div>
  <div class="container">
    <div class="wrapper">
      <aside-weather v-model="city" :weather="weather" :location="weatherLocation" />
      <home-view :title="getTitle" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/scss/mixins" as *;

.main-bg {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: -1;

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
}

.wrapper {
  display: grid;
  grid-template-columns: 35% 1fr;
  padding: 40px 0;
  min-height: 100vh;
  min-height: calc(100 * var(--vh, 1vh));

  @include vp-1199 {
    grid-template-columns: 40% 1fr;
  }

  @include vp-1023 {
    grid-template-columns: 1fr;
  }
}
</style>
