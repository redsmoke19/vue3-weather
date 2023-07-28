import {DAYS} from '@/common/constants';
import {getTime} from '@/common/halpers/utils'

export const dateNormalize = (time) => {
  const date = new Date(time * 1000);
  const dateString = `${DAYS[date.getDay()]}, ${getTime(date)}`;
  return DAYS[date.getDay()] ? dateString : "-";
}
