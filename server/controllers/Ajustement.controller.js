import db from "../config/Database.js";
import Ajustement from "../database/models/Ajustement.model.js";
import Ajustement_detail from "../database/models/Ajustement_detail.model.js";
import Emplacement from "../database/models/Emplacement.model.js";
import Produit from "../database/models/Produit.model.js";
import Unite from "../database/models/Unite.model.js";
import Utilisateur from "../database/models/Utilisateur.model.js";
const getAll = async (req, res) => {
  try {
    const response = await Ajustement.findAll({
      attributes: {
        include: [
          [
            db.fn("DATE_FORMAT", db.col("date_saisi"), " %W %d %M %Y "),
            "date_saisi",
          ],
          [
            db.fn("DATE_FORMAT", db.col("date_ajustement"), " %W %d %M %Y "),
            "date_ajustement",
          ],
        ],
      },
      include: [
        { model: Utilisateur },
        { model: Emplacement },
        { model: Utilisateur },
      ],
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};
const getAjustementDetails = async (req, res) => {
  try {
    const response = await Ajustement_detail.findAll({
      where: { ajustement_id: req.params.ajustement_id },
      include: [{ model: Ajustement }, { model: Produit }],
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};
const getSpecific = async (req, res) => {
  try {
    const response = await Ajustement.findOne({
      attributes: {
        include: [
          [
            db.fn("DATE_FORMAT", db.col("date_ajustement"), " %W %d %M %Y "),
            "date_ajustement",
          ],
        ],
      },
      where: { id: req.params.id },
      include: [{ model: Utilisateur }, { model: Emplacement }],
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};
const createOne = async (req, res) => {
  const { dataAjt, dataAjtDetail, utilisateur_id } = req.body;
  const transaction = await db.transaction();
  try {
    // ________________________________________________
    const unites = await Unite.findAll();
    const getNameUniteById = (id) => {
      // return unites.find((a) => a.id == id).nom_unite;
      return "Unite";
    };
    // ________________________________________________
    let message = [];
    const item_ajt = await Ajustement.create(
      {
        ...dataAjt,
        utilisateur_id,
        emplacement_id: 1,
      },
      { transaction }
    );
    dataAjtDetail.map(async (item_ajtDt, index) => {
      const item_produit = await Produit.findOne({
        where: { code_lot_produit: item_ajtDt.produit_code_lot_produit },
      });
      if (!item_produit)
        return res.status(404).json({
          message:
            "Produit " + item_ajtDt.produit_code_lot_produit + " introvable!",
        });
      console.log("\n\n\n\n\n", item_ajtDt, "\n\n\n\n");
      await Ajustement_detail.create(
        {
          ...item_ajtDt,
          ajustement_id: item_ajt.id,
        },
        { transaction }
      );

      item_produit.set({
        quantite_stock: item_ajtDt.quantite_nouveau_stock,
        presentation_quantite: item_ajtDt.quantite_nouveau_presentation,
        unite_stock: item_ajtDt.unite_nouveau_stock,
        unite_presentation: item_ajtDt.unite_nouveau_presentation,
      });
      console.log("\n\n\n\n\n", item_produit, "\n\n\n\n");
      item_produit.save({ transaction });
      message.push[
        `Le produit **${item_produit.nom_produit}** est ajusté de [ Stock : ${
          item_ajtDt.quantite_ancien_stock
        } ${getNameUniteById(item_ajtDt.unite_ancien_stock)} ; Présentation : ${
          item_ajtDt.quantite_ancien_presentation
        } ${getNameUniteById(
          item_ajtDt.unite_ancien_presentation
        )} ] à [ Stock : ${item_produit.quantite_stock} ${getNameUniteById(
          item_produit.unite_stock
        )} ; Présentation : ${
          item_ajtDt.presentation_quantite
        } ${getNameUniteById(item_ajtDt.unite_presentation)} ]\n\n`
      ];
      console.log("index == dataAjtDetail.length", index, dataAjtDetail.length);
      if (index == dataAjtDetail.length - 1) {
        console.log(
          "message.length == dataAjtDetail.length",
          message,
          message.length,
          dataAjtDetail.length
        );
        await transaction.commit();
        if (message.length == dataAjtDetail.length) {
          return res.status(200).send({ message: message.join("\n") });
        }
      }
    });
  } catch (error) {
    await transaction.rollback();
    console.log(error);
    return res.status(404).json({ message: error.message });
  }
};
export { getAll, getAjustementDetails, getSpecific, createOne };
