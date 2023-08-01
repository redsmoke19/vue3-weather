import { DAYS, MONTHS } from "@/common/constants";

export const getTime = (time) => {
  const date = new Date(time);
  return date.toLocaleString("en-US", { hour: "numeric", minute: "numeric", hour12: true });
};

export const dateNormalize = (time) => {
  const date = new Date(time * 1000);
  const dateString = `${DAYS[date.getDay()]}, ${getTime(date)}`;
  return DAYS[date.getDay()] ? dateString : "-";
};

export const getHours = (time) => {
  const date = new Date(time * 1000);
  return `${date.getHours()}:00`;
}

export const getDateMonth = (time) => {
  const date = new Date(time * 1000);
  const week = DAYS[date.getDay()];
  const month = MONTHS[date.getMonth()];
  const day = date.getDate();
  return `${week}, ${month} ${day}`;
};
