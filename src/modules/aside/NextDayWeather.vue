<script setup>
import WeatherIcon from "@/components/WeatherIcon.vue";
import { computed, inject, ref } from "vue";
import { getDateMonth } from "@/utils/date";
import { getIcon } from "@/utils/image";

const tabs = [
  {
    name: "1 day",
    days: 1
  },
  {
    name: "2 days",
    days: 2
  },
  {
    name: "3 Days",
    days: 3
  }
];

const currentTab = ref(0);

const isEmpty = inject("isEmpty");
const daily = inject("daily");

const getDailyFilter = computed(() => {
  if (daily.value.forecast) {
    const days = daily.value.forecast.forecastday;
    return days.filter((_, idx) => idx < tabs[currentTab.value].days);
  }
  return null;
});

const getTabsClick = (index) => {
  currentTab.value = index;
};
</script>

<template>
  <div class="next-day">
    <h2 class="next-day__title">The Next Day Forecast</h2>
    <template v-if="!isEmpty">
      <ul class="next-day__list">
        <li class="next-day__item" v-for="(item, idx) in tabs" :key="idx">
          <button
            class="next-day__button"
            type="button"
            @click="getTabsClick(idx)"
            :class="{ 'is-active': idx === currentTab }"
          >
            {{ item.name }}
          </button>
        </li>
      </ul>
      <div class="next-day__inner">
        <div class="next-day__result" v-for="item in getDailyFilter" :key="item.date_epoch">
          <weather-icon :icon="getIcon(item.day.condition.text)" width="35" height="35" />
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
