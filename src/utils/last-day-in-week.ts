export function lastDayInWeek(data: Date) {
  const currentDay = data.getDay();
  const lastDayWeek = new Date(data);
  lastDayWeek.setDate(data.getDate() + (6 - currentDay));
  return lastDayWeek;
}