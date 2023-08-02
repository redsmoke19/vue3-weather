import { IMAGES, ICONS } from "@/common/constants";

export const getImage = (img) => {
  const image = Object.keys(IMAGES).find((key) => img === key);
  return IMAGES[image] ?? "mist-bg";
};

export const getIcon = (icon) => {
  const iconName = Object.keys(ICONS).find((key) => icon === key);
  return ICONS[iconName];
};
