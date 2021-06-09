export function convertDurationToTimeString(duration: number){
  const hours = Math.floor(duration / 3600); //to round down the hour
  const minutes = Math.floor((duration%3600) / 60); //to round down the minute
  const seconds = duration % 60; 

  const timeString = [hours, minutes, seconds] // array
    .map(unit => String(unit).padStart(2, '0')) // 
    .join(':')

  return timeString;
}