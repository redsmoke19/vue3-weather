const API_KEY = "cf854ad7372720e3dc044e15db872fcd";

export default class FetchData {
  _checkStatus(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // Получаем данные о геопозиции
  getGeoLocation(city) {
    return fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
    ).then((res) => {
      return this._checkStatus(res);
    });
  }

  // Получаем данные о текущей погоде
  getCurrentWeather({ lat, lon }) {
    return fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    ).then((res) => {
      return this._checkStatus(res);
    });
  }

  getHourlyWeather({ lat, lon }) {
    return fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&cnt=3&appid=${API_KEY}`
    ).then((res) => {
      return this._checkStatus(res);
    });
  }

  getDailyWeather({ lat, lon }) {
    return fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=1f396bf17c424b7fb5a185037232707&q=${lat},${lon}&days=3&aqi=no&alerts=no`
    ).then((res) => {
      return this._checkStatus(res);
    });
  }
}


