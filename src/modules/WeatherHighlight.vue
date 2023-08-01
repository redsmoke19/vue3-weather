<script setup>
import { getTime } from "@/utils/date";
import { computed, inject } from "vue";

const weather = inject("weather");
const isEmpty = inject("isEmpty");

const getWeatherTime = computed(() => {
  if (!isEmpty.value) {
    return {
      sunset: getTime(weather.value.sys.sunset * 1000),
      sunrise: getTime(weather.value.sys.sunrise * 1000)
    };
  }
  return {
    sunset: "-",
    sunrise: "-"
  };
});

const getHumidity = (data) => {
  if (isEmpty.value) return "-";
  const humidity = data.main?.humidity;
  switch (true) {
    case humidity > 60:
      return "High";
    case humidity > 39:
      return "Comfort";
    case humidity < 40:
      return "Low";
  }
};

const getPressure = computed(() => {
  return (weather.value.main?.pressure / 1.333).toFixed(2);
});
</script>

<template>
  <div class="highlight">
    <h2 class="highlight__title">Today's Highlight</h2>
    <ul class="highlight__list">
      <li class="highlight__item">
        <span class="highlight__name">Pressure</span>
        <span class="highlight__value">{{ !isEmpty ? getPressure : "-" }}</span>
        <span class="highlight__measurement">mm Hg</span>
      </li>
      <li class="highlight__item">
        <span class="highlight__name">Wind Status</span>
        <span class="highlight__value">{{ !isEmpty ? weather.wind?.speed : "-" }}</span>
        <span class="highlight__measurement">meter/sec</span>
      </li>
      <li class="highlight__item">
        <span class="highlight__name">Sunrise & Sunset</span>
        <span class="highlight__value">{{ getWeatherTime.sunrise }}</span>
        <span class="highlight__measurement">{{ getWeatherTime.sunset }}</span>
      </li>
      <li class="highlight__item">
        <span class="highlight__name">Humidity</span>
        <span class="highlight__value">{{ !isEmpty ? weather.main.humidity : "-" }}%</span>
        <span class="highlight__measurement">{{ getHumidity(weather) }}</span>
      </li>
      <li class="highlight__item">
        <span class="highlight__name">Visibility</span>
        <span class="highlight__value">{{ !isEmpty ? weather.visibility / 1000 : "-" }}</span>
        <span class="highlight__measurement">km</span>
      </li>
      <li class="highlight__item">
        <span class="highlight__name">Clouds</span>
        <span class="highlight__value">{{ !isEmpty ? weather.clouds.all : "-" }}</span>
        <span class="highlight__measurement">%</span>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/blocks/highlight";
</style>
