<script setup>
import AsideWeather from "@/modules/aside/AsideWeather.vue";
import HomeView from "@/views/HomeView.vue";
import FetchData from "@/api/weather";
// что-то у меня не работает через ctrl клик-переход по ссылке, если там @/ , странно
import { computed, ref, watch, provide } from "vue";
/* Почему-то везде разные виды ковычек.
 Где-то есть ';', а где-то нет, к пробелам и отступам тоже относится.
 Поставь Prettier  + eslint, всё должно быть в едином стиле */
const geo = ref([]);
const city = ref("");
const weather = ref({});
const daily = ref({});
/* Понимаю, что приложение маленькое.
 Но на будущее, в App.vue должна быть точка входа в приложение, какие-то основные настройки может, разметка header, footer может быть. И тут уже router-view */
const fetchData = new FetchData();
/* Строчку выше прекрасно можно заменить на деструктуризацию объекта, 
переписав weather.js для использования Composition API - крайне удобная штука. Круто, что ты знаешь ООП и классы, но
можно писать красивее в стиле Vue 3*/
const isEmptyObject = computed(() => {
  //да, вот тут мне как ревьюеру не понятно, что должно лежать в weather. Нужен Typescript :)
  return Object.keys(weather.value).length !== 0;
  // метод определения пустого объекта не оч :) Добавил файл isEmpty.ts, только там eslint ругается, его нужно донастроить на typescript
});
/* Будет огромным плюсом, если ты в проект добавишь и все файлы перепишешь с использованием TypeScript, сейчас без него ни в одну компанию не попасть уже разработчиком
Пока что самые базовые типы введи (string, Array<string>, number ....), не обязательно какие-то сложны штуки учить.
*/
const getTitle = computed(() => {
  return isEmptyObject.value ? weather.value.weather[0].description : "Choose you city";
});
// название addCoords не соответствует выполняемой задаче. 'add' обычно пишут в названии методов, которые что-то добавляют. Лучше get
const addCoords = computed(() => {
  const { lat, lon } = geo.value[0];
  return {
    lat,
    lon
  };
});

const weatherLocation = computed(() => {
  const value = geo.value[0];
  return value ? `${value.name}, ${value?.state}, ${value?.country}` : "-";
  // если ты уже проверил на существование value, зачем value?.
  // А вот на существование параметров я бы поставил проверки, точнее ${value.name || ""}. Ну тут опять же решает TS
});

watch(city, async () => {
  /* Лучше к строке поиска прикрутить emit, или debaunce функцию на input событие. И уже по событию
  ввода отправлять нужные тебе запросы */
  if (city.value.length) {
    geo.value = await fetchData.getGeoLocation(city.value);
    weather.value = await fetchData.getCurrentWeather(addCoords.value);
    daily.value = await fetchData.getDailyWeather(addCoords.value);
  }
});
/* Если ты делаешь provide из одного файла, можно завести для него уникальный символ (ключ)
Создай отдельный файлик injectionKeys.ts. Туда кладешь const WeatherInjectionKey = Symbol("weather");
Потом сюда эту константу импортируешь и делаешь единственный provide вида provide(WeatherInjectionKey, { weather, isEmptyObject, daily }); */
provide("weather", weather);
provide("isEmpty", isEmptyObject);
provide("daily", daily);
</script>

<template>
  <div class="main-bg">
    <img src="@/assets/img/rain-bg.png" alt="Rain" />
  </div>
  <div class="container">
    <div class="wrapper">
      <!-- компоненты тоже не открываются через ctrl :(( -->
      <aside-weather v-model="city" :weather="weather" :location="weatherLocation" />
      <home-view :title="getTitle" />
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
