<script setup>
import WeatherIcon from '@/components/WeatherIcon.vue'
import { ref } from 'vue'

const tabs = ref([
  {
    name: "2 days",
    isActive: true
  },
  {
    name: "10 Days",
    isActive: false,
  },
  {
    name: "30 Days",
    isActive: false
  }
])

const getTabsClick = (item) => {
  tabs.value.forEach((i) => {
    i.isActive = false;
    if (item === i) {
      item.isActive = true;
    }
  })
}
</script>

<template>
  <div class="next-day">
    <h2 class="next-day__title">The Next Day Forecast</h2>
    <ul class="next-day__list">
      <li class="next-day__item"
        v-for="(item, key) in tabs"
        :key="key"
      >
        <button
          class="next-day__button"
          type="button"
          @click="getTabsClick(item)"
          :class="{'is-active': item.isActive}"
        >
          {{item.name}}
        </button>
      </li>
    </ul>
    <div class="next-day__inner">
      <div class="next-day__result">
        <weather-icon icon="icon-heavy-rain" width="35" height="35" />
        <div class="next-day__info">
          <span class="next-day__day">Saturday, May 13</span>
          <span class="next-day__weather">Heavy Rain</span>
        </div>
      </div>
      <div class="next-day__result">
        <weather-icon icon="icon-sun-cloud" width="35" height="35" />
        <div class="next-day__info">
          <span class="next-day__day">Saturday, May 13</span>
          <span class="next-day__weather">Heavy Rain</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/scss/blocks/next-day";
</style>
