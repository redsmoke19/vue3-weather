<script setup>
import NextDayWeather from "@/modules/aside/NextDayWeather.vue";
// только не halpers, а helpers :)
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
// defineEmits лучше в начале размещать с пропсами. Не знаю, есть ли это в Vue Style Guide, но вроде так принято.
// https://v3.ru.vuejs.org/ru/style-guide/
const emit = defineEmits(["update:modelValue"]);

// Будет супер, если в проект подключишь Pinia и результат запросов будешь хранить в Store, но и Store встроенный во Vue тоже знать неплохо бы
// В любом случае, лучше вынести в стор результаты запроса, а не хранить их в каком-то компоненте
const weather = inject("weather");

// handleModelValue* без 'r' звучит лучше и чаще всего так пишут
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
        <!-- Сюда бы еще кнопочку добавить или что-то, чтобы пользователь понимал, что ему нужно сделать
        чтобы запрос отправился. Debounce решит проблему без использовая enter -->
      </div>
    </div>
    <div class="aside__main-icon">
      <template v-if="weather.weather">
        <!-- v-if можно повесить и на саму svg-icon, тк у тебя тут ничего нет больше -->
        <svg-icon :name="weather.weather[0]?.icon" />
      </template>
      <!-- Так будет меньше кода и без v-ifelse <svg-icon :name="weather.weather[0]?.icon || '01n'" /> -->
      <template v-else>
        <svg-icon name="01n" />
      </template>
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
