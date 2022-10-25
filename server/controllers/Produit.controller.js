import { QueryTypes } from "sequelize";
import db from "../config/Database.js";
import Produit from "../database/models/Produit.model.js";

const queryGet =
  "SELECT `produit`.`id`,  `produit`.`code_lot_produit`,  `produit`.`nom_produit`, `produit`.`prix_vente`,  `produit`.`classification_produit`,  `produit`.`description`,  `produit`.`image`,  `produit`.`presentation_quantite`,  `produit`.`stock_min`,  `produit`.`stock_max`,  `produit`.`date_der_ravitaillement`,  `produit`.`status`,  `produit`.`createdAt`,  `produit`.`updatedAt`,  `produit`.`deletedAt`,  `produit`.`fabricant_id`,  `produit`.`forme_id`,  `produit`.`famille_id`,  `produit`.`unite_presentation`,  `produit`.`unite_achat`,  `produit`.`unite_vente`,  `produit`.`unite_stock`,  `produit`.`voie_id`, `fabricant`.`nom_fabricant` AS `nom_fabricant`, `famille`.`nom_famille` AS `nom_famille`,  `forme`.`nom_forme` AS `nom_forme`, P.`nom_unite` AS `nom_presentation`, A.`nom_unite` AS `nom_achat`,   S.`nom_unite` AS `nom_stock`,  V.`nom_unite` AS `nom_vente`, `voie`.`nom_voie` AS `nom_voie` FROM `produit` LEFT JOIN `famille` ON `produit`.`famille_id` = `famille`.`id` LEFT JOIN `fabricant` ON `produit`.`fabricant_id` = `fabricant`.`id` LEFT JOIN `forme` ON `produit`.`forme_id` = `forme`.`id` LEFT JOIN `unite` P ON `produit`.`unite_presentation` = P.`id` LEFT JOIN `unite` A ON `produit`.`unite_achat` = A.`id` LEFT JOIN `unite` V ON `produit`.`unite_vente` = V.`id` LEFT JOIN `unite` S ON `produit`.`unite_stock` = S.`id` LEFT JOIN `voie` ON `produit`.`voie_id` = `voie`.`id` WHERE  `produit`.`deletedAt` IS NULL AND `famille`.`deletedAt` IS NULL AND `fabricant`.`deletedAt` IS NULL AND `forme`.`deletedAt` IS NULL AND P.`deletedAt` IS NULL AND A.`deletedAt` IS NULL AND V.`deletedAt` IS NULL AND S.`deletedAt` IS NULL ";

const getAll = async (req, res) => {
  try {
    const response = await db.query(queryGet, { type: QueryTypes.SELECT });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};
const getSpecific = async (req, res) => {
  try {
    const response = await db.query(
      queryGet + ' AND `produit`.id = "' + req.params.id + '" ',
      { type: QueryTypes.SELECT }
    );
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};
const createOne = async (req, res) => {};
const updateOne = async (req, res) => {};
const deleteOne = async (req, res) => {
  const item = await Produit.findOne({ where: { id: req.params.id } });
  if (!item) return res.status(404).json({ message: "Produit introvable!" });
  try {
    await Produit.destroy({ where: { id: req.params.id } });
    return res.status(200).json({ message: "Produit supprimé avec succès!" });
  } catch (error) {
    console.log(error);
  }
};
const updateStatus = async (req, res) => {
  const item = await Produit.findOne({ where: { id: req.params.id } });
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
