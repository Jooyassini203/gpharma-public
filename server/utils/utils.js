import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";

export const MIGRATE =false ;// true

export const getDateTime = (name = "") => {
  const date = new Date();
  name += `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}_${date.getHours()}.${date.getMinutes()}.${date.getSeconds()}_${date.getMilliseconds()}`;
  return name;
};

export const getDateNow = (name = "") => {
  const date = new Date(); //2022-10-22 17:41:30
  let dateString = `${name}${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  console.log("dateString : ", dateString);
  return dateString;
};

export const bcryptData = (data, salt = 10) => {
  let dataCrypted = bcrypt.hashSync(data, salt);
  console.log("\n\n", dataCrypted, "\n\n");
  return dataCrypted;
};

export const uploadFile = (
  req,
  res,
  sigle,
  dir,
  itemData,
  callBack = null,
  lastImage = "",
  nameColImage = "image"
) => {
  console.log("\n\n\n\n\navec file\n\n\n\n");
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

  itemData[nameColImage] = fileName;
  console.log(
    "\n\n itemData['nameColImage'] : ",
    itemData[nameColImage],
    "\n\n"
  );
  if (itemData["url"]) {
    itemData["url"] = url;
    console.log("\n\n itemData['url'] : ", itemData["url"], "\n\n");
  }
  file.mv(`./public/${dir}/${fileName}`, async (error) => {
    if (error) return res.status(500).send({ message: error.message });
    if (callBack) {
      callBack();
    } else {
      if (lastImage) {
        const filepath = `./public/${dir}/${lastImage}`;
        // Check if file exist
        fs.access(filepath, fs.F_OK, (err) => {
          console.log("fs.access : ");
          if (err) {
            console.error(err);
            return;
          }
          console.log("\n\n DELETED : ", fileName, "\n\n");
          fs.unlinkSync(filepath);
          //file exists
        });
      }
    }
  });
};

const formatZero = async (number, length = 4) => {
  const zero = (j) => {
    let a = "";
    for (let i = 0; i < j; i++) {
      a += "0";
    }
    return a;
  };
  return number.toString().length >= length
    ? number
    : zero(length - number.toString().length) + number.toString();
};
export const getId = async (Model, sigle = "") => {
  try {
    const response = await Model.findOne({
      order: [["createdAt", "DESC"]],
    });
    let new_id = sigle;
    if (response)
      new_id += formatZero(parse(response.id.slice(sigle.length)), 4);
    else new_id += formatZero(1, 4);
    return new_id;
  } catch (error) {
    console.log(error.message);
  }
};

export const getEmplacement = (strEmplacement) => {
  let arr = strEmplacement.slice(0, -6).split("--//--,");
  let finalArr = [];
  for (let i = 0; i < arr.length; i++) {
    const json = JSON.parse(arr[i]);
    finalArr.push(json);
  }
  return finalArr;
};