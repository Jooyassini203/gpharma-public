import db from "../config/Database.js";
import Caisse from "../database/models/Caisse.model.js";
import Fournisseur from "../database/models/Fournisseur.model.js";
import Mode_expedition from "../database/models/Mode_expedition.model.js";
import Produit from "../database/models/Produit.model.js";
import Ravitaillement from "../database/models/Ravitaillement.model.js";
import Ravitaillement_detail from "../database/models/Ravitaillement_detail.model.js";
import Unite from "../database/models/Unite.model.js";
import Utilisateur from "../database/models/Utilisateur.model.js";
const getAll = async (req, res) => {
  try {
    const response = await Ravitaillement.findAll({
      attributes: {
        include: [
          [
            db.fn("DATE_FORMAT", db.col("date_saisi"), " %W %d %M %Y à %Hh%i"),
            "date_saisi",
          ],
          [
            db.fn(
              "DATE_FORMAT",
              db.col("date_prev_livraison"),
              " %W %d %M %Y à %Hh%i"
            ),
            "date_prev_livraison",
          ],
          [
            db.fn(
              "DATE_FORMAT",
              db.col("date_livraison"),
              " %W %d %M %Y à %Hh%i"
            ),
            "date_livraison",
          ],
        ],
      },
      include: [
        { model: Fournisseur },
        { model: Mode_expedition },
        { model: Caisse },
        { model: Utilisateur },
      ],
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};
const getSpecific = async (req, res) => {
  try {
    const dataRvt = await Ravitaillement.findOne({
      attributes: {
        include: [
          [
            db.fn("DATE_FORMAT", db.col("date_saisi"), " %W %d %M %Y à %Hh%i"),
            "date_saisi",
          ],
          [
            db.fn(
              "DATE_FORMAT",
              db.col("date_prev_livraison"),
              " %W %d %M %Y "
            ),
            "date_prev_livraison",
          ],
          [
            db.fn("DATE_FORMAT", db.col("date_livraison"), " %W %d %M %Y "),
            "date_livraison",
          ],
        ],
      },
      where: { id: req.params.id },
      include: [
        { model: Fournisseur },
        { model: Mode_expedition },
        { model: Caisse },
        { model: Utilisateur },
      ],
    });
    const dataRvtDetail = await Ravitaillement_detail.findAll({
      where: { ravitaillement_id: req.params.id },
      include: [{ model: Produit }, { model: Unite }],
    });
    if (dataRvt || dataRvtDetail) res.json([dataRvt, dataRvtDetail]);
  } catch (error) {
    console.log(error.message);
  }
};
const createOne = async (req, res) => {
  const { dataRvt, dataRvtDetail } = req.body;
  try {
    const newRvt = await Ravitaillement.create({ ...dataRvt, caisse_id: null });
    if (newRvt) {
      dataRvtDetail.map((item) => {
        item.ravitaillement_id = newRvt.id;
      });
      console.log("\n\n\n\n\n", dataRvtDetail, "\n\n\n\n\n");

      await Ravitaillement_detail.bulkCreate(dataRvtDetail);
      return res
        .status(200)
        .json({ message: "Tous les produits sont commandés!" });
    }
  } catch (error) {
    console.log(error);
    return res.status(422).json({ message: error.message });
  }
};
const updateOne = async (req, res) => {};

const updateOneRavitaillementDetail = async (req, res) => {
  const rvt = await Ravitaillement.findOne({ where: { id: req.params.id } });
  if (!rvt)
    return res.status(404).json({ message: "Ravitaillement introvable!" });

  const item = await Ravitaillement_detail.findOne({
    where: {
      produit_code_lot_produit: req.body.data.code_lot_produit,
      ravitaillement_id: req.body.data.ravitaillement_id,
    },
  });
  if (!item)
    return res
      .status(404)
      .json({ message: "Cette détails de ravitaillement est introvable!" });

  try {
    item.set({
      quantite_livraison: req.body.data.quantite_livraison,
      montant_ht: item.prix_unit * req.body.data.quantite_livraison,
    });
    item.save().then(() => {
      console.log("\n\n\n\n\n", item, "\n\n\n\n\n");
      return res.status(200).json({
        message: "Quantité livré de cette est de " + item.quantite_livraison,
      });
    });
  } catch (error) {
    console.log(error);
  }
};
const validateRavitaillement = async (req, res) => {
  const rvt = await Ravitaillement.findOne({ where: { id: req.params.id } });
  if (!rvt)
    return res.status(404).json({ message: "Ravitaillement introvable!" });

  try {
    const dataRvtDetail = await Ravitaillement_detail.findAll({
      where: { ravitaillement_id: req.params.id },
      include: [{ model: Produit }, { model: Unite }],
    });
    let messages = "";
    dataRvtDetail.map(async (item_rvtDetail) => {
      const item_produit = await Produit.findOne({
        where: { code_lot_produit: item_rvtDetail.produit_code_lot_produit },
      });
      if (item_produit.unite_stock !== item_rvtDetail.unite_achat) {
        return res.status(404).json({
          message: `La mise à jour du quantité du produit **${item_produit.nom_produit}** a échoué : 
          L'unité de stockage et l'unité d'achat non identique. 
          (Veuillez mette à niveau l'unité de stockage). `,
        });
      }
      let last_quantite_stock = item_produit.quantite_stock;
      let new_qte_stock =
        parseFloat(item_produit.quantite_stock) +
        parseFloat(item_rvtDetail.quantite_livraison);
      item_produit.set({ quantite_stock: new_qte_stock });
      item_produit.save();
      messages += `**${item_produit.nom_produit}**: quantité en stock de **${last_quantite_stock}** à **${item_produit.quantite_stock}**\n`;
    });

    rvt.set({
      etat_ravitaillement: "LIVREE",
      caisse_id: req.body.caisse_id,
      montant_ht: req.body.montant_ht,
      date_livraison: req.body.date_livraison,
    });
    await rvt.save();
    console.log("\n\n\n\n\n", rvt, "\n\n\n\n\n");

    return res.status(200).json({
      message: "Commandes livrées : " + messages,
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteOne = async (req, res) => {
  const item = await Ravitaillement.findOne({ where: { id: req.params.id } });
  if (!item)
    return res.status(404).json({ message: "Ravitaillement introvable!" });
  try {
    await Ravitaillement.destroy({ where: { id: req.params.id } });
    return res
      .status(200)
      .json({ message: "Ravitaillement supprimé avec succès!" });
  } catch (error) {
    console.log(error);
  }
};
export {
  getAll,
  getSpecific,
  createOne,
  updateOne,
  updateOneRavitaillementDetail,
  validateRavitaillement,
  deleteOne,
};
