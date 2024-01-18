/**
 * Formats a date and time based on Unix time.
 *
 * @param {number} unixTime - The Unix time in milliseconds.
 * @returns {string} - A formatted string representing either the time in am/pm if it's today
 *                    or the date as "mm-dd-yy" if it's not today.
 *
 * @example
 * const formattedDateTime = formatDateTimeFromUnixTime(1645641600000);
 * console.log(formattedDateTime);
 * // Outputs time in am/pm if it's today, otherwise outputs date "mm-dd-yy".
 */

export function formatDateTimeFromUnixTime(unixTime) {
  const date = new Date(unixTime);
  const today = new Date();
  const isToday =
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();
  if (isToday) {
    const hours = date.getHours() % 12 || 12; // Convert 24-hour format to 12-hour format
    const minutes = date.getMinutes();
    const ampm = date.getHours() < 12 ? "AM" : "PM";
    return `${hours}:${minutes < 10 ? "0" + minutes : minutes} ${ampm}`;
  } else {
    const month = date.getMonth() + 1; // Month is 0-based, so add 1
    const day = date.getDate();
    const year = date.getFullYear() % 100; // Extract last two digits of the year
    return `${month < 10 ? "0" + month : month}-${
      day < 10 ? "0" + day : day
    }-${year}`;
  }
}
