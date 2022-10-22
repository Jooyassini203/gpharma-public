import Utilisateur from "../database/models/utilisateur.model.js";
import fs from "fs";
import { bcryptData, uploadFile } from "../utils/utils.js";
import { Op } from "sequelize";

const getAll = async (req, res) => {
  try {
    const response = await Utilisateur.findAll({
      where: {
        [Op.not]: [{ nom_utilisateur: "Administrateur" }],
      },
    });
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
      userData["mot_de_passe"] = bcryptData(userData["mot_de_passe"]);
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
    uploadFile(req, res, "USER_", "images/utilisateur", userData, insertDB);
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
    userData["image"] = fileName;
    userData["url"] = url;
  } else {
    uploadFile(
      req,
      res,
      "USER_",
      "images/utilisateur",
      userData,
      null,
      user.image
    );
  }
  try {
    userData["mot_de_passe"] = bcryptData(userData["mot_de_passe"]);
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
      // Check if file exist
      fs.access(filepath, fs.F_OK, (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log("N DETETED -- ", user.url);
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
