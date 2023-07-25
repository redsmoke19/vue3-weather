<script setup>
import AsideWeather from "@/modules/aside/AsideWeather.vue";
import HomeView from "@/views/HomeView.vue";
import { getGeo, getWeather, getTest } from "@/api/geo";
import { computed, onMounted, ref, watch } from 'vue'

const geo = ref([]);
const city = ref("");
const coords = ref({});
const weather = ref({});

const getLocation = async (location) => {
  geo.value = await getGeo(location);
};

const addCoords = computed(() => {
  const {lat, lon} = geo.value[0];
  return {
    lat,
    lon
  }
});

const foo = ({lat, lon}) => {
  console.log(lat + " " + lon)
  console.log(weather.value)
}

// onMounted(async () => {
//   weather.value = await getTest();
//   console.log(weather.value)
// })

watch(city, async () => {
  if (city.value.length) {
    // await getLocation(city.value);
    geo.value = await getGeo(city.value);
    coords.value = addCoords;
  }
})

watch(geo, async () => {
  weather.value = await getWeather(addCoords.value);
  // foo(addCoords.value);
  // weather.value = await getTest(city.value);
  console.log(weather.value)
})
</script>

<template>
  {{coords}}
  <div class="main-bg">
    <img src="@/assets/img/rain-bg.png" alt="Rain" />
  </div>
  <div class="container">
    <div class="wrapper">
      <aside-weather v-model="city"/>
      <home-view />
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
