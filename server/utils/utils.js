export const MIGRATE = false;
export const getDateTime = (name = "") => {
  const date = new Date();
  name += `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}_${date.getHours()}.${date.getMinutes()}.${date.getSeconds()}_${date.getMilliseconds()}`;
  return name;
};
