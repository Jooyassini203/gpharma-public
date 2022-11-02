import db from "../config/Database.js";
import Ajustement from "../database/models/Ajustement.model.js";
import Emplacement from "../database/models/Emplacement.model.js";
import Produit from "../database/models/Produit.model.js";
import Utilisateur from "../database/models/Utilisateur.model.js";
const getAll = async (req, res) => {
  try {
    const response = await Ajustement.findAll({
      attributes: {
        include: [
          [
            db.fn("DATE_FORMAT", db.col("date_ajustement"), " %W %d %M %Y "),
            "date_ajustement",
          ],
        ],
      },
      include: [{ model: Utilisateur }, { model: Emplacement }],
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
  const { dataAjt, dataAjtDt, utilisateur_id } = req.body;
  try {
    const item_ajt = await Ajustement.create({
      ...dataAjt,
      utilisateur_id,
      emplacement_id: 1,
    });
    dataAjtDt.forEach(async (item_ajtDt) => {
      const item_produit = await Produit.findOne({
        where: { code_lot_produit: item_ajtDt.produit_code_lot_produit },
      });
      if (!item_produit)
        return res
          .status(404)
          .json({
            message:
              "Produit " + item_ajtDt.produit_code_lot_produit + " introvable!",
          });

      //----------------------------------
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: error.message });
  }
};
export { getAll, getSpecific, createOne };
