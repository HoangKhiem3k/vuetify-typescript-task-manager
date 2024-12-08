export const formatDate = (
  date: string,
  locale: string = "en-US",
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }
): string => {
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    // Handle invalid date
    console.warn("formatDate: Invalid date provided");
    return "";
  }
  return parsedDate.toLocaleDateString(locale, options).replace(/\//g, ".");
};
