<script setup>
import WeatherIcon from "@/components/WeatherIcon.vue";
import { computed, inject, ref } from "vue";
import { getDateMonth } from "@/common/halpers/utils";

const tabs = ref([
  {
    name: "2 days",
    isActive: true,
    days: 2
  },
  {
    name: "3 Days",
    isActive: false,
    days: 3
  }
]);

const currentDay = ref(tabs.value[0].days);

const isEmpty = inject("isEmpty");
const daily = inject("daily");

const getDailyFilter = computed(() => {
  if (daily.value.forecast) {
    const days = daily.value.forecast?.forecastday;
    return days.filter((item, idx) => idx < currentDay.value);
  } else {
    return null;
  }
});

const getTabsClick = (item) => {
  currentDay.value = item.days;
  tabs.value.forEach((i) => {
    i.isActive = false;
    if (item === i) {
      item.isActive = true;
    }
  });
};
</script>

<template>
  <div class="next-day">
    <h2 class="next-day__title">The Next Day Forecast</h2>
    <template v-if="isEmpty">
      <ul class="next-day__list">
        <li class="next-day__item" v-for="(item, key) in tabs" :key="key">
          <button
            class="next-day__button"
            type="button"
            @click="getTabsClick(item)"
            :class="{ 'is-active': item.isActive }"
          >
            {{ item.name }}
          </button>
        </li>
      </ul>
      <div class="next-day__inner">
        <div class="next-day__result" v-for="item in getDailyFilter" :key="item.date_epoch">
          <weather-icon icon="icon-heavy-rain" width="35" height="35" />
          <div class="next-day__info">
            <span class="next-day__day">{{ getDateMonth(item.date_epoch) }}</span>
            <span class="next-day__weather">{{ item.day.condition.text }}</span>
          </div>
        </div>
      </div>
    </template>
    <p class="next-day__day" v-else>Choose you city</p>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/scss/blocks/next-day";
</style>
