<script setup>
import NextDayWeather from '@/modules/aside/NextDayWeather.vue'

const props = defineProps({
  modelValue: {
    type: String
  }
})

const emit = defineEmits(['update:modelValue'])
const handlerModelValue = (evt) => {
  const value = evt.target.value
  emit('update:modelValue', value)
}

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
      <!--      <div class="aside__search-result" v-if="cities">-->
      <!--        <template v-if="cities.length > 1">-->
      <!--          <p v-for="city in cities" :key="city.lon">-->
      <!--&lt;!&ndash;            <span>{{city[local_names].en}}</span>&ndash;&gt;-->
      <!--&lt;!&ndash;            <span>{{city.country}}</span>&ndash;&gt;-->
      <!--          </p>-->
      <!--        </template>-->
      <!--      </div>-->
    </div>
    <div class="aside__main-icon">
      <svg-icon name="icon-big-heavy-rain" />
    </div>
    <div class="aside__location">
      <svg-icon name="location" width="30" height="30" />
      <div class="aside__city">Samara, Russia</div>
    </div>
    <span class="aside__temp">30.9 &#176;C</span>
    <span class="aside__time">Friday, 11:50 PM</span>
    <next-day-weather />
  </aside>
</template>

<style lang="scss" scoped>
@use "@/assets/scss/blocks/aside";
</style>
