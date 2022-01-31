export default function getDateAndTime(string) {
  const date = new Date(string).toLocaleDateString();
  const time = new Date(string).toLocaleTimeString();

  const fullDate = { date, time };
  return fullDate;
}
