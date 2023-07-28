<script setup>
import NextDayWeather from "@/modules/aside/NextDayWeather.vue";
import { dateNormalize } from "@/common/halpers/normalize";
import { computed, inject } from "vue";

const props = defineProps({
  modelValue: {
    type: String
  },
  location: {
    type: String
  }
});

const weather = inject("weather");

const emit = defineEmits(["update:modelValue"]);
const handlerModelValue = (evt) => {
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
          @keydown.enter="handlerModelValue"
        />
      </div>
    </div>
    <div class="aside__main-icon">
      <template v-if="weather.weather">
        <svg-icon :name="weather.weather[0]?.icon" />
      </template>
      <template v-else>
        <svg-icon name="01n" />
      </template>
    </div>
    <div class="aside__location">
      <svg-icon name="location" width="30" height="30" />
      <div class="aside__city">{{props.location}}</div>
    </div>
    <span class="aside__temp">{{ getCurrentTemp }} &#176;C</span>
    <span class="aside__time">{{ getCurrentTime }}</span>
    <next-day-weather />
  </aside>
</template>

<style lang="scss" scoped>
@use "@/assets/scss/blocks/aside";
</style>
