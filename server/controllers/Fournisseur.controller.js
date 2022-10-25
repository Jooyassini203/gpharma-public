import Fournisseur from "../database/models/Fournisseur.model.js";
import fs from "fs";
import { uploadFile } from "../utils/utils.js";
const getAll = async (req, res) => {
  try {
    const response = await Fournisseur.findAll();
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};
const getSpecific = async (req, res) => {
  try {
    const response = await Fournisseur.findOne({
      where: { id: req.params.id },
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};
const createOne = async (req, res) => {
  let data = JSON.parse(req.body.data);
  const insertDB = async () => {
    try {
      await Fournisseur.create(data);
      res.status(201).send({ message: "Fournisseur ajouté avec succès!" });
    } catch (error) {
      res.status(422).send({ message: error.message });
      console.log(error.message);
    }
  };
  if (!req.files) {
    insertDB();
  } else
    uploadFile(
      req,
      res,
      "FRNS_",
      "images/fournisseur",
      data,
      insertDB,
      "",
      "logo"
    );
};
const updateOne = async (req, res) => {
  console.log("files", req.files);
  console.log("data", req.body);
  const item = await Fournisseur.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!item)
    return res.status(404).send({ message: "Fournisseur introvable!" });
  let itemData = {};
  if (req.body.data) itemData = JSON.parse(req.body.data);
  let fileName = "";
  if (!req.files) {
    fileName = item.logo;
    itemData["logo"] = item.logo;
  } else {
    uploadFile(
      req,
      res,
      "FRNS_",
      "images/fournisseur",
      itemData,
      null,
      item.logo ? item.logo : "",
      "logo"
    );
  }
  try {
    item.set(itemData);
    await item.save();
    res.status(201).send({ message: "Fournisseur modifié avec succès!" });
  } catch (error) {
    res.status(422).send({ message: error.message });
    console.log(error.message);
  }
};
const deleteOne = async (req, res) => {
  console.log("\n\n\nDELETE FOURNISSEUR", req.params.id, "\n\n\n");
  const item = await Fournisseur.findOne({ where: { id: req.params.id } });
  if (!item)
    return res.status(404).json({ message: "Fournisseur introvable!" });

  console.log("\n\n\nDELETE item.logo", item.logo, "\n\n\n");
  if (item.logo) {
    const filepath = `./public/images/fournisseur/${item.logo}`;
    // Check if file exist
    fs.access(filepath, fs.F_OK, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("\n\n\nDELETE LOGO", filepath, "\n\n\n");
      fs.unlinkSync(filepath);
      //file exists
    });
  }

  console.log("\n\n\nBEFORE DELETE", item, "\n\n\n");
  try {
    await Fournisseur.destroy({ where: { id: req.params.id } });
    console.log("\n\nDELETE", "Fournisseur supprimé avec succès!", "\n\n\n");
    return res
      .status(200)
      .json({ message: "Fournisseur supprimé avec succès!" });
  } catch (error) {
    console.log(error);
  }
};
export { getAll, getSpecific, createOne, updateOne, deleteOne };
