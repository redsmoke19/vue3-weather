<script setup>
import WeatherIcon from "@/components/WeatherIcon.vue";
import { computed, inject, ref } from "vue";
import { getDateMonth } from "@/common/halpers/utils";

const tabs = [
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
    const days = daily.value.forecast?.forecastday;
    return days.filter((item, idx) => idx < tabs[currentTab.value].days);
  }
  return null;
  // можно обойтись без else, будет выглядить более читабельно
});
// а вот тут уже handleTabClick по смыслу лучше подходит
const getTabsClick = (index) => {
  // переключать табы можно намного проще
  currentTab.value = index;
};
/* При переключении вкладок дней скачут флексы в виджетах. */
</script>

<template>
  <div class="next-day">
    <h2 class="next-day__title">The Next Day Forecast</h2>
    <template v-if="isEmpty">
      <ul class="next-day__list">
        <!-- правильнее называть index, проп key может быть не обязательно index'ом -->
        <li class="next-day__item" v-for="(item, index) in tabs" :key="index">
          <button
            class="next-day__button"
            type="button"
            @click="getTabsClick(index)"
            :class="{ 'is-active': index === currentTab }"
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
