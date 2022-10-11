<<<<<<< HEAD
export const MIGRATE = false;
=======
test("should first", () => {
  second;
});
// Les migrations des tables et de ses données
export const MIGRATE = true;
>>>>>>> parent of dea50bf (feat(utilisateur):PhoneInput)
export const getDateTime = (name = "") => {
  const date = new Date();
  name += `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}_${date.getHours()}.${date.getMinutes()}.${date.getSeconds()}_${date.getMilliseconds()}`;
  return name;
};
