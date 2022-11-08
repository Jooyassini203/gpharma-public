import db from "../config/Database.js";
import Client from "../database/models/Client.model.js";
import Vente from "../database/models/Vente.model.js";
import Ordonnance from "../database/models/Ordonnance.model.js";
import Produit from "../database/models/Produit.model.js";
import Vente_detail from "../database/models/Vente_detail.model.js";
import { getEmplacement, getId } from "../utils/utils.js";
import { QueryTypes } from "sequelize";
import Utilisateur from "../database/models/Utilisateur.model.js";
import Unite from "../database/models/Unite.model.js";

const queryGet =
  'SELECT `produit`.`code_lot_produit`,  `produit`.`nom_produit`,  GROUP_CONCAT(\'{ "emplacement_id" : "\',PE.emplacement_id,\'", "nom_emplacement" : "\',E.nom_emplacement, \'" , "quantite_produit" : "\', PE.quantite_produit, \'" }--//--\') AS emplacement, `produit`.`prix_stock`, `produit`.`quantite_stock`,  `produit`.`classification_produit`,  `produit`.`description`,  `produit`.`image`,  `produit`.`presentation_quantite`,  `produit`.`stock_min`,  `produit`.`stock_max`,  `produit`.`date_der_ravitaillement`,  `produit`.`status`,  `produit`.`createdAt`,  `produit`.`updatedAt`,  `produit`.`deletedAt`,  `produit`.`fabricant_id`,  `produit`.`forme_id`,  `produit`.`famille_id`,  `produit`.`unite_presentation`,  `produit`.`unite_achat`,  `produit`.`unite_vente`,  `produit`.`unite_stock`,  `produit`.`voie_id`, `fabricant`.`nom_fabricant` AS `nom_fabricant`, `famille`.`nom_famille` AS `nom_famille`,  `forme`.`nom_forme` AS `nom_forme`, P.`nom_unite` AS `nom_presentation`, A.`nom_unite` AS `nom_achat`,   S.`nom_unite` AS `nom_stock`,  V.`nom_unite` AS `nom_vente`, `voie`.`nom_voie` AS `nom_voie` FROM `produit` LEFT JOIN `famille` ON `produit`.`famille_id` = `famille`.`id` LEFT JOIN `fabricant` ON `produit`.`fabricant_id` = `fabricant`.`id` LEFT JOIN `forme` ON `produit`.`forme_id` = `forme`.`id` LEFT JOIN `unite` P ON `produit`.`unite_presentation` = P.`id` LEFT JOIN `unite` A ON `produit`.`unite_achat` = A.`id` LEFT JOIN `unite` V ON `produit`.`unite_vente` = V.`id` LEFT JOIN `unite` S ON `produit`.`unite_stock` = S.`id` LEFT JOIN `voie` ON `produit`.`voie_id` = `voie`.`id` LEFT JOIN `Produit_emplacement` PE ON `produit`.`code_lot_produit` = PE.`produit_code_lot_produit` LEFT JOIN `emplacement` E ON PE.`emplacement_id` = E.`id` WHERE  `produit`.`deletedAt` IS NULL AND `famille`.`deletedAt` IS NULL AND `fabricant`.`deletedAt` IS NULL AND `forme`.`deletedAt` IS NULL AND P.`deletedAt` IS NULL AND A.`deletedAt` IS NULL AND V.`deletedAt` IS NULL AND S.`deletedAt` IS NULL ';
const queryGroupBy = " GROUP BY `produit`.`code_lot_produit` ";

const getAll = async (req, res) => {
  try {
    const response = await Vente.findAll({
      where: { guichetier_id: req.params.utilisateur_id },
      include: [{ model: Client }, { model: Utilisateur }],
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};
const getSpecific = async (req, res) => {
  try {
    const response_vente = await Vente.findOne({
      where: { id: req.params.id },
      include: [{ model: Client }, { model: Utilisateur }],
    });
    let response_venteDetails = await Vente_detail.findAll({
      where: { vente_id: req.params.id },
      include: [{ model: Unite }],
    });
    response_venteDetails.map(async (item) => {
      const produit = await Produit.findOne({
        where: item.produit_code_lot_produit,
      });
      item = { ...item, produit };
    });
    res.json([response_vente, response_venteDetails]);
  } catch (error) {
    console.log(error.message);
  }
};
const getAllVenteDetails = async (req, res) => {
  try {
    const response = await Vente.findOne({ where: { id: req.params.id } });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};
const createOne = async (req, res) => {
  const { vente, listVenteDetails, client, ordonnance } = JSON.parse(
    req.body.data
  );
  const utilisateur_id = req.body.utilisateur_id;
  console.log("req.body", req.body);
  const transaction = await db.transaction();
  try {
    let ordonnance_id = null;
    if (ordonnance.hopital) {
      const item_ordonnance = await Ordonnance.create(ordonnance, {
        transaction,
      });
      if (!item_ordonnance)
        return res.status(404).json({ message: "Une erreur est survénue!" });
      ordonnance_id = item_ordonnance.id;
    }
    const item_client = await Client.create(
      {
        nom_prenom: client.nom_prenom ? client.nom_prenom : "Inconun",
        adresse: client.adresse ? client.adresse : "Inconune",
      },
      { transaction }
    );
    if (!item_client)
      return res.status(404).json({ message: "Une erreur est survénue!" });

    const id_vente = await getId(Vente, "VENTE_");
    console.log(
      "\n\n item_vente",
      {
        id: id_vente,
        motif: vente.motif ? vente.motif : "Motif du vente #" + id_vente,
        ordonnance_id,
        client_id: item_client.id,
        guichetier_id: utilisateur_id,
        ...vente,
      },
      "\n\n"
    );
    const item_vente = await Vente.create(
      {
        id: id_vente,
        motif: vente.motif ? vente.motif : "Motif du vente #" + id_vente,
        ordonnance_id,
        client_id: item_client.id,
        guichetier_id: utilisateur_id,
        ...vente,
      },
      { transaction }
    );
    if (!item_vente)
      return res.status(404).json({ message: "Une erreur est survénue!" });

    let message = "Guichet n°" + item_vente.id + " : ";
    listVenteDetails.forEach(async (element) => {
      const item_produit = await db.query(
        queryGet +
          '  AND PE.quantite_produit != "0"  AND PE.emplacement_id = "2" AND `produit`.code_lot_produit' +
          element.produit_code_lot_produit +
          " ",
        queryGroupBy,
        { type: QueryTypes.SELECT }
      );
      if (!item_produit[0])
        return res.status(404).json({
          message: `${element.nom_produit} introuvable dans l'étalage!`,
        });
      const item_venteDetail = await Vente_detail.create(
        {
          ...element,
          vente_id: item_vente.id,
          utilisateur_id,
        },
        { transaction }
      );
      if (!item_venteDetail)
        return res.status(404).json({
          message: "Une erreur est survénue!",
        });
      const quantite_produit = getEmplacement(item_produit[0].emplacement)[0]
        .quantite_produit;
      if (item_venteDetail.unite_vente == item_produit[0].unite_stock) {
        if (item_venteDetail.quantite_vente > quantite_produit)
          return res.status(404).json({
            message: `Quantité de ${element.nom_produit} insuffisante, quantité actuelle (${quantite_produit} ${item_produit[0].nom_stock})!`,
          });
        message += ` **${item_produit[0].nom_produit}** (${quantite_vente} ${item_produit[0].nom_stock})`;
      } else if (
        item_venteDetail.unite_vente == item_produit[0].unite_presentation
      ) {
        if (
          item_venteDetail.quantite_vente >
          quantite_produit * item_produit[0].presentation_quantite
        )
          return res.status(404).json({
            message: `Quantité de ${
              element.nom_produit
            } insuffisante, quantité actuelle (${
              quantite_produit * item_produit[0].presentation_quantite
            } ${item_produit[0].nom_presentation})!`,
          });
        message += ` **${item_produit[0].nom_produit}** (${quantite_vente} ${item_produit[0].nom_presentation})`;
      }
      console.log("\n\n item_vente", message, "\n\n");
    });
    await transaction.commit();
    return res.status(200).json({ message });
  } catch (error) {
    console.log(error);
    await transaction.rollback();
  }
};
const updateOne = async (req, res) => {};
const deleteOne = async (req, res) => {
  const item = Vente.findOne({ where: { id: req.params.id } });
  if (!item) return res.status(404).json({ message: "Vente introvable!" });
  try {
    await Vente.destroy({ where: { id: req.params.id } });
    return res.status(200).json({ message: "Vente supprimé avec succès!" });
  } catch (error) {
    console.log(error);
  }
};
export { getAll, getSpecific, createOne, updateOne, deleteOne };
