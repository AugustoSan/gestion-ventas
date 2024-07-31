export const dateToString = (date: Date):string => 
{
    return  date.toLocaleDateString('es-MX', {
        timeZone: 'America/Mexico_City',
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
}