export function firstDayInWeek(data: Date) {
  const currentDay = data.getDay();
  const firstDayWeek = new Date(data);
  firstDayWeek.setDate(data.getDate() - currentDay);
  return firstDayWeek;
}