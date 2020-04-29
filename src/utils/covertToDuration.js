function convertToDuration(duration) {
  let seconds;
  if (duration % 60 < 10) {
    seconds = `0${duration % 60}`;
  } else {
    seconds = duration % 60;
  }
  return `${Math.floor(duration / 60)}:${seconds}`;
}
export default convertToDuration;
