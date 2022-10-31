import Ajustement from "../database/models/Ajustement.model.js";
import Emplacement from "../database/models/Emplacement.model.js";
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
const createOne = async (req, res) => {};
export { getAll, getSpecific, createOne };
