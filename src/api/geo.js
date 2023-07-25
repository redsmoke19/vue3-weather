const API_KEY = "cf854ad7372720e3dc044e15db872fcd";
const API_KEY2 = "6c5d4c411b5051a0cd13bf2472f68db0";
const URL = "https://api.openweathermap.org/geo/1.0/direct?q="

// geo http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
// weather https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}


export const getGeo = async (city) => {
  const response = await fetch(
    `${URL}${city}&limit=1&appid=${API_KEY}`
  );
  return await response.json();
}

export const getWeather = async ({ lat, lon }) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY2}`
  );
  return await response.json();
};

export const getTest = async (city) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY2}`
  );
  return await response.json();
};
