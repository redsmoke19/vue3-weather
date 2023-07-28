import { DAYS, MONTHS } from "@/common/constants";
// utils сделать отдельной папкой в корне проекта и туда по разным файлам раскидывать утилиты
// работу с датами можно в одном файле держать, да, тк они из одной тематики, грубо говоря
export const getTime = (time) => {
  const date = new Date(time);
  return date.toLocaleString("en-US", { hour: "numeric", minute: "numeric", hour12: true });
};

export const getDateMonth = (time) => {
  const date = new Date(time * 1000);
  const week = DAYS[date.getDay()];
  const month = MONTHS[date.getMonth()];
  const day = date.getDate();
  return `${week}, ${month} ${day}`;
};
