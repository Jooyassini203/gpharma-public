import fs from "fs";

export const MIGRATE = false;
export const getDateTime = (name = "") => {
  const date = new Date();
  name += `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}_${date.getHours()}.${date.getMinutes()}.${date.getSeconds()}_${date.getMilliseconds()}`;
  return name;
};
export const uploadFile = (req, res, callBack) => {
 
  console.log("avec fil");
  const file = req.files.file;
  const fileSize = req.files.lenght;
  const fileExt = path.extname(file.name);
  const fileName = getDateTime("USER_") + fileExt;
  const url = `${req.protocol}://${req.get(
    "host"
  )}/images/utilisateur/${fileName}`;
  const allowType = [".png", ".jpeg", ".jpg"];
  if (!allowType.includes(fileExt.toLowerCase())) {
    return res.status(422).send({ message: "Image invalide!" });
  }
  if (fileSize > 10000000) {
    return res
      .status(422)
      .send({ message: "Image trop lourd (Plus de 10 MB) !" });
  }
  console.log("fileName:", fileName);
  file.mv(`./public/images/utilisateur/${fileName}`, async (error) => {
    if (error) return res.status(500).send({ message: error.message });
    userData["image"] = fileName;
    userData["url"] = url;
    callBack();
  });


};
