export const getMonth = (date: Date| string) => new Date(date).getMonth() + 1;
export const getYear = (date: Date| string) => new Date(date).getFullYear();

export const getLocaleMonthName = (date: Date| string) =>
  new Date(date).toLocaleString('default', { month: 'long' });

export const getLocaleDayName = (date: Date| string) =>
  new Date(date).toLocaleString('default', { weekday: 'long' });

export const getDay = (date: Date | string) => new Date(date).getDate();
