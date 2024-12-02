import { Guest } from '@/types/Guest';
import { eachDayOfInterval, format } from 'date-fns';

export function guestsToFoodSchedule(guests: Guest[] | undefined) {
  if (!guests) {
    return {};
  }

  const map: Record<string, string[]> = {};

  guests.forEach((guest) => {
    const { name, startDate, endDate } = guest;

    const dates = eachDayOfInterval({ start: new Date(startDate), end: new Date(endDate) });

    dates.forEach((date) => {
      const formattedDate = format(date, 'yyyy-MM-dd');

      if (!map[formattedDate]) {
        map[formattedDate] = [];
      }
      map[formattedDate].push(name);
    });
  });

  return map;
}