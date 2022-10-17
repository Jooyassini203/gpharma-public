import fs from "fs";
import path from "path";

export const MIGRATE = true;
export const getDateTime = (name = "") => {
  const date = new Date();
  name += `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}_${date.getHours()}.${date.getMinutes()}.${date.getSeconds()}_${date.getMilliseconds()}`;
  return name;
};
export const uploadFile = (
  req,
  res,
  sigle,
  dir,
  userData,
  callBack = null,
  user = null
) => {
  console.log("avec fil");
  const file = req.files.file;
  const fileSize = req.files.lenght;
  const fileExt = path.extname(file.name);
  const fileName = getDateTime(sigle) + fileExt;
  const url = `${req.protocol}://${req.get("host")}/${dir}/${fileName}`;
  const allowType = [".png", ".jpeg", ".jpg"];
  if (!allowType.includes(fileExt.toLowerCase())) {
    return res.status(422).send({ message: "Fichier invalide!" });
  }
  if (fileSize > 10000000) {
    return res
      .status(422)
      .send({ message: "Fichier trop lourd (Plus de 10 MB) !" });
  }

  userData["image"] = fileName;
  userData["url"] = url;
  console.log("\n\n userData['image'] : ", userData["image"], "\n\n");
  console.log("\n\n userData['url'] : ", userData["url"], "\n\n");
  try {
    file
      .mv(`./public/${dir}/${fileName}`, async (error) => {
        if (error) return res.status(500).send({ message: error.message });
        if (callBack) {
          callBack();
        } else {
          if (error) return res.status(500).send({ message: error.message });
          if (user.image) {
            const filepath = `./public/${dir}/${user.image}`;
            console.log("\n\nfilepath : ", filepath, "\n\n");
            // Check if file exist
            fs.access(filepath, fs.F_OK, (err) => {
              console.log("fs.access : ");
              if (err) {
                console.error(err);
                return;
              }
              console.log("N DETETED -- ", user.url);
              fs.unlinkSync(filepath);
              //file exists
            });
          }
        }
      })
      .catch();
  } catch (e) {
    if (e) return res.status(500).send({ message: error.message });
  }
};
