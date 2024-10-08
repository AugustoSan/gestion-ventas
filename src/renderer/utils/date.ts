export const dateToString = (date: Date):string =>
{
  return new Intl.DateTimeFormat('es-MX', {
    timeZone: 'America/Mexico_City',
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

export const timeToString = (date: Date):string =>
{
  return new Intl.DateTimeFormat( 'es-MX', {
    timeZone: 'America/Mexico_City',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true,
  }).format(date);
}

export const formatDate = (date: Date): string => {
  const pad = (num: number): string => num.toString().padStart(2, '0');

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1); // Meses son 0-based en JavaScript
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export const getDate = (date: Date): string => {
  const pad = (num: number): string => num.toString().padStart(2, '0');

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1); // Meses son 0-based en JavaScript
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${year}-${month}-${day}`;
};
