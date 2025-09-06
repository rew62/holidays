// holidays.js
export function getFederalHolidays(year) {
  function nthWeekdayOfMonth(year, month, weekday, n) {
    const firstDay = new Date(year, month, 1);
    let day = firstDay.getDay();
    let date = 1 + ((7 + weekday - day) % 7) + (n - 1) * 7;
    return new Date(year, month, date);
  }

  function lastWeekdayOfMonth(year, month, weekday) {
    const lastDay = new Date(year, month + 1, 0);
    let day = lastDay.getDay();
    let date = lastDay.getDate() - ((day - weekday + 7) % 7);
    return new Date(year, month, date);
  }

  function observedHoliday(date) {
    const day = date.getDay();
    if (day === 0) return new Date(year, date.getMonth(), date.getDate() + 1);
    if (day === 6) return new Date(year, date.getMonth(), date.getDate() - 1);
    return date;
  }

  const holidays = [];

  const fixed = [
    ["New Year's Day", new Date(year, 0, 1)],
    ["Juneteenth National Independence Day", new Date(year, 5, 19)],
    ["Independence Day", new Date(year, 6, 4)],
    ["Veterans Day", new Date(year, 10, 11)],
    ["Christmas Day", new Date(year, 11, 25)]
  ];
  fixed.forEach(([name, date]) => {
    holidays.push({ name, date: observedHoliday(date) });
  });

  holidays.push({ name: "Martin Luther King Jr. Day", date: nthWeekdayOfMonth(year, 0, 1, 3) });
  holidays.push({ name: "Washington's Birthday", date: nthWeekdayOfMonth(year, 1, 1, 3) });
  holidays.push({ name: "Memorial Day", date: lastWeekdayOfMonth(year, 4, 1) });
  holidays.push({ name: "Labor Day", date: nthWeekdayOfMonth(year, 8, 1, 1) });
  holidays.push({ name: "Columbus Day", date: nthWeekdayOfMonth(year, 9, 1, 2) });
  holidays.push({ name: "Thanksgiving Day", date: nthWeekdayOfMonth(year, 10, 4, 4) });

  holidays.sort((a, b) => a.date - b.date);

  return holidays.map(h => ({
    name: h.name,
    date: h.date.toISOString().split("T")[0]
  }));
}
