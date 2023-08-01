import axios from "axios";

const API_KEY = "cf854ad7372720e3dc044e15db872fcd";

const getGeoLocation = async (city) => {
  const response = await axios.get(
    `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
  );
  return response.data[0];
};

const getCurrentWeather = async ({ lat, lon }) => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );
  return response.data;
};

const getDailyWeather = async ({ lat, lon }) => {
  const response = await axios.get(
    `https://api.weatherapi.com/v1/forecast.json?key=1f396bf17c424b7fb5a185037232707&q=${lat},${lon}&days=3&aqi=no&alerts=no`
  );
  return response.data;
};

export const api = {
  getGeoLocation,
  getCurrentWeather,
  getDailyWeather
};
