import { QueryTypes } from "sequelize";
import db from "../config/Database.js";
import Fabricant from "../database/models/Fabricant.model.js";
import Famille from "../database/models/Famille.model.js";
import Forme from "../database/models/Forme.model.js";
import Produit from "../database/models/Produit.model.js";
import Unite from "../database/models/Unite.model.js";
import Voie from "../database/models/Voie.model.js";
import { uploadFile } from "../utils/utils.js";

const queryGet =
  'SELECT `produit`.`code_lot_produit`,  `produit`.`nom_produit`,  GROUP_CONCAT(\'{ "emplacement_id" : "\',PE.emplacement_id,\'", "nom_emplacement" : "\',E.nom_emplacement, \'" , "quantite_produit" : "\', PE.quantite_produit, \'" }--//--\') AS emplacement, `produit`.`prix_stock`, `produit`.`quantite_stock`,  `produit`.`classification_produit`,  `produit`.`description`,  `produit`.`image`,  `produit`.`presentation_quantite`,  `produit`.`stock_min`,  `produit`.`stock_max`,  `produit`.`date_der_ravitaillement`,  `produit`.`status`,  `produit`.`createdAt`,  `produit`.`updatedAt`,  `produit`.`deletedAt`,  `produit`.`fabricant_id`,  `produit`.`forme_id`,  `produit`.`famille_id`,  `produit`.`unite_presentation`,  `produit`.`unite_achat`,  `produit`.`unite_vente`,  `produit`.`unite_stock`,  `produit`.`voie_id`, `fabricant`.`nom_fabricant` AS `nom_fabricant`, `famille`.`nom_famille` AS `nom_famille`,  `forme`.`nom_forme` AS `nom_forme`, P.`nom_unite` AS `nom_presentation`, A.`nom_unite` AS `nom_achat`,   S.`nom_unite` AS `nom_stock`,  V.`nom_unite` AS `nom_vente`, `voie`.`nom_voie` AS `nom_voie` FROM `produit` LEFT JOIN `famille` ON `produit`.`famille_id` = `famille`.`id` LEFT JOIN `fabricant` ON `produit`.`fabricant_id` = `fabricant`.`id` LEFT JOIN `forme` ON `produit`.`forme_id` = `forme`.`id` LEFT JOIN `unite` P ON `produit`.`unite_presentation` = P.`id` LEFT JOIN `unite` A ON `produit`.`unite_achat` = A.`id` LEFT JOIN `unite` V ON `produit`.`unite_vente` = V.`id` LEFT JOIN `unite` S ON `produit`.`unite_stock` = S.`id` LEFT JOIN `voie` ON `produit`.`voie_id` = `voie`.`id` LEFT JOIN `Produit_emplacement` PE ON `produit`.`code_lot_produit` = PE.`produit_code_lot_produit` LEFT JOIN `emplacement` E ON PE.`emplacement_id` = E.`id` WHERE  `produit`.`deletedAt` IS NULL AND `famille`.`deletedAt` IS NULL AND `fabricant`.`deletedAt` IS NULL AND `forme`.`deletedAt` IS NULL AND P.`deletedAt` IS NULL AND A.`deletedAt` IS NULL AND V.`deletedAt` IS NULL AND S.`deletedAt` IS NULL  AND PE.quantite_produit != "0"  ';
const queryGroupBy = " GROUP BY `produit`.`code_lot_produit` ";

const getAll = async (req, res) => {
  try {
    const response = await db.query(queryGet + queryGroupBy, {
      type: QueryTypes.SELECT,
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};
const getSpecific = async (req, res) => {
  try {
    const response = await db.query(
      queryGet +
        ' AND `produit`.code_lot_produit = "' +
        req.params.code_lot_produit +
        '" ' +
        queryGroupBy,
      { type: QueryTypes.SELECT }
    );
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

const createOne = async (req, res) => {
  let item = JSON.parse(req.body.data);
  const insertDB = async () => {
    try {
      await Produit.create(item);
      return res
        .status(200)
        .json({ message: item.nom_produit + " ajouté avec succès!" });
    } catch (error) {
      console.log("error", error.message);
      return res.status(404).json({ message: error.message });
    }
  };
  if (!req.files) {
    insertDB();
  } else {
    delete item["image"];
    uploadFile(
      req,
      res,
      "PRODUIT_",
      "images/produit",
      item,
      insertDB,
      "",
      "image"
    );
  }
};

const updateOne = async (req, res) => {
  let data = JSON.parse(req.body.data);
  console.log("\n\nitem produit", data, "\n\n");
  const item = await Produit.findOne({
    where: { code_lot_produit: req.params.code_lot_produit },
  });
  if (!item) return res.status(404).json({ message: "Produit introvable!" });
  console.log("\n\nitem produit", item, "\n\n");
  if (!req.files) {
    data.image = item.image;
  } else {
    uploadFile(
      req,
      res,
      "PRODUIT_",
      "images/produit",
      data,
      null,
      item.image,
      "image"
    );
  }
  try {
    item.set(data);
    await item.save();
    return res
      .status(200)
      .json({ message: data.nom_produit + " modifié(e) avec succès!" });
  } catch (error) {
    console.log("error", error.message);
    return res.status(404).json({ message: error.message });
  }
};

const deleteOne = async (req, res) => {
  const item = await Produit.findOne({
    where: { code_lot_produit: req.params.code_lot_produit },
  });
  if (!item) return res.status(404).json({ message: "Produit introvable!" });
  // const verif = await Produit.findOne(
  //   {
  //     where: { code_lot_produit: req.params.code_lot_produit },
  //   },
  //   {
  //     include: [
  //       {
  //         model: Voie,
  //         required: true,
  //       },
  //       { model: Unite },
  //       { model: Fabricant },
  //       { model: Famille },
  //       { model: Forme },
  //     ],
  //   }
  // );
  // if (!verif) {
  //   let message = "";
  //   Object.entries(verif).forEach(([key, value]) => {
  //     console.log("value", key, value);
  //   });
  //   return res.status(404).json({ message: message });
  // }
  try {
    await item.destroy();
    return res.status(200).json({ message: "Produit supprimé avec succès!" });
  } catch (error) {
    console.log(error);
  }
};

const updateStatus = async (req, res) => {
  const item = await Produit.findOne({
    where: { code_lot_produit: req.params.code_lot_produit },
  });
  if (!item) return res.status(404).json({ message: "Produit introvable!" });
  console.log("\n\n\n\n\nreq.body", req.body);
  try {
    item.set(req.body);
    item.save();
    return res.status(200).json({
      message:
        item.nom_produit +
        (req.body.status == "1" ? " activé" : " désactivé") +
        " avec succès!",
    });
  } catch (error) {
    console.log(error.message);
  }
};

export { getAll, getSpecific, createOne, updateOne, deleteOne, updateStatus };
