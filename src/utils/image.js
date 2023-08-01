import { IMAGES } from "@/common/constants";

export const getImage = (img) => {
  const image = Object.keys(IMAGES).find((key) => img === key);
  return IMAGES[image] ?? "mist-bg";
};
