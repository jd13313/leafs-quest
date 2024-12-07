export const addLeadingZero = (number, totalLength) => {
  return number.toString().padStart(totalLength, "0");
};
