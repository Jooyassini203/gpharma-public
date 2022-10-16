import Utilisateur from "../database/models/utilisateur.model.js";
import path from "path";
import fs from "fs";
import { getDateTime } from "../utils/utils.js";

const getAll = async (req, res) => {
  try {
    const response = await Utilisateur.findAll();
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};
const getSpecific = async (req, res) => {
  try {
    const response = await Utilisateur.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};
const createOne = (req, res) => {
  let userData = JSON.parse(req.body.data);
  const insertDB = async () => {
    try {
      await Utilisateur.create(userData);
      res.status(201).send({ message: "Utilisateur ajouté avec succès!" });
    } catch (error) {
      res.status(422).send({ message: error.message });
      console.log(error.message);
    }
  };
  userData["mot_de_passe"] = userData["mot_de_passe"];
  if (!req.files) {
    console.log("sans image");
    insertDB();
  } else {
    
  }
};
const createMany = () => {};
const updateOne = async (req, res) => {
  console.log("files", req.files);
  console.log("data", req.body);
  const user = await Utilisateur.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!user)
    return res.status(404).send({ message: "Utilisateur introvable!" });

  let userData = JSON.parse(req.body.data);
  let fileName = "";
  let url = "";
  if (!req.files) {
    fileName = user.image;
    url = user.url;
  } else {
    const file = req.files.file;
    const fileSize = req.files.lenght;
    const fileExt = path.extname(file.name);
    fileName = getDateTime("USER_") + fileExt;
    url = `${req.protocol}://${req.get("host")}/images/utilisateur/${fileName}`;
    const allowType = [".png", ".jpeg", ".jpg"];
    if (!allowType.includes(fileExt.toLowerCase()))
      return res.status(422).send({ message: "Image invalide!" });
    if (fileSize > 10000000)
      return res
        .status(422)
        .send({ message: "Image trop lourd (Plus de 10 MB) !" });
    file.mv(`./public/images/utilisateur/${fileName}`, (error) => {
      if (error) return res.status(500).send({ message: error.message });
      if (user.image) {
        const filepath = `./public/images/utilisateur/${user.image}`;
        console.log("filepath : ", filepath);
        // Check if file exist
        fs.access(filepath, fs.F_OK, (err) => {
          console.log("fs.access : ");
          if (err) {
            console.error(err);
            return;
          }
          fs.unlinkSync(filepath);
          //file exists
        });
      }
    });
  }
  try {
    userData["image"] = fileName;
    userData["url"] = url;
    // userData["mot_de_passe"] = userData["mot_de_passe"];
    console.log("userData", userData);
    user.set(userData);
    await user.save();
    res.status(201).send({ message: "Utilisateur modifié avec succès!" });
  } catch (error) {
    res.status(422).send({ message: error.message });
    console.log(error.message);
  }
};
const deleteOne = async (req, res) => {
  const user = await Utilisateur.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!user)
    return res.status(404).send({ message: "Utilisateur introvable!" });
  try {
    if (user.image) {
      const filepath = `./public/images/utilisateur/${user.image}`;
      console.log("filepath", filepath);
      // Check if file exist
      fs.access(filepath, fs.F_OK, (err) => {
        if (err) {
          console.error(err);
          return;
        }
        fs.unlinkSync(filepath);
        //file exists
      });
    }
    await Utilisateur.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res
      .status(200)
      .json({ message: "Utilisateur supprimé avec succès!" });
  } catch (error) {
    console.log(error);
  }
};
export { getAll, getSpecific, createOne, createMany, updateOne, deleteOne };
