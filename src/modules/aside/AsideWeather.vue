<script setup>
import NextDayWeather from "@/modules/aside/NextDayWeather.vue";
import { dateNormalize } from "@/utils/date";
import { computed, inject } from "vue";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: {
    type: String
  },
  location: {
    type: String
  }
});

const weather = inject("weather");

const handleModelValue = (evt) => {
  const value = evt.target.value;
  emit("update:modelValue", value);
};

const getCurrentTemp = computed(() => {
  return weather.value.main?.temp || "-";
});

const getCurrentTime = computed(() => {
  return dateNormalize(weather.value.dt);
});
</script>

<template>
  <aside class="aside">
    <div class="aside__search">
      <div class="aside__search-box">
        <svg-icon name="search" />
        <input
          class="aside__input"
          type="text"
          placeholder="Search city"
          :value="modelValue"
          @input="handleModelValue"
        />
      </div>
    </div>
    <div class="aside__main-icon">
      <svg-icon v-if="weather.weather" :name="weather.weather[0].icon" />
      <svg-icon v-else name="01n" />
    </div>
    <div class="aside__location">
      <svg-icon name="location" width="30" height="30" />
      <div class="aside__city">{{ props.location }}</div>
    </div>
    <span class="aside__temp">{{ getCurrentTemp }} &#176;C</span>
    <span class="aside__time">{{ getCurrentTime }}</span>
    <next-day-weather />
  </aside>
</template>

<style lang="scss" scoped>
@use "@/assets/scss/blocks/aside";
</style>
