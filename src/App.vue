<script setup>
import AsideWeather from "@/modules/aside/AsideWeather.vue";
import HomeView from "@/views/HomeView.vue";
import FetchData from '@/api/weather';
import { computed, ref, watch, provide } from 'vue'

const geo = ref([]);
const city = ref("");
const weather = ref({});
const daily = ref({});

const fetchData = new FetchData();
const isEmptyObject = computed(() => {
  return Object.keys(weather.value).length !== 0;
})
const getTitle = computed(() => {
  return isEmptyObject.value ? weather.value.weather[0].description : "Choose you city"
})

const addCoords = computed(() => {
  const {lat, lon} = geo.value[0];
  return {
    lat,
    lon
  }
});

const weatherLocation = computed(() => {
  const value = geo.value[0];
  return value ? `${value.name}, ${value?.state}, ${value?.country}` : "-";
})

watch(city, async () => {
  if (city.value.length) {
    geo.value = await fetchData.getGeoLocation(city.value);
    weather.value = await fetchData.getCurrentWeather(addCoords.value)
    daily.value = await fetchData.getDailyWeather(addCoords.value);
  }
})

provide("weather", weather);
provide("isEmpty", isEmptyObject);
provide("daily", daily);
</script>

<template>
  <div class="main-bg">
    <img src="@/assets/img/rain-bg.png" alt="Rain" />
  </div>
  <div class="container">
    <div class="wrapper">
      <aside-weather v-model="city" :weather="weather" :location="weatherLocation"/>
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
