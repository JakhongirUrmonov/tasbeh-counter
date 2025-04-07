export function getHijriDate(): string {
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = {
    calendar: "islamic",
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  return new Intl.DateTimeFormat("en-US", options).format(today);
}
