export const formatDate = (date: Date, locale = 'en-US') => {
  return date.toLocaleString(locale);
};

export const addDays = (date: Date, days: number) => {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
};
