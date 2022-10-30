import Ravitaillement from "../database/models/Ravitaillement.model.js";
import Ravitaillement_detail from "../database/models/Ravitaillement_detail.model.js";
const getAll = async (req, res) => {
  try {
    const response = await Ravitaillement.findAll();
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};
const getSpecific = async (req, res) => {
  try {
    const response = await Ravitaillement.findOne({
      where: { id: req.params.id },
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};
const createOne = async (req, res) => {
  const { dataRvt, dataRvtDetail } = req.body;
  try {
    const newRvt = await Ravitaillement.create({ ...dataRvt, caisse_id: null });
    if (newRvt) {
      console.log("\n\n\n\n newRvt : ", newRvt, "\n\n\n\n");
      dataRvtDetail.map((item) => {
         item.ravitaillement_id = newRvt.id
         item.quantite_livraison = null
        } );
      console.log("\n\n\n\n dataRvtDetail : ", dataRvtDetail, "\n\n\n\n");
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
export { getAll, getSpecific, createOne, updateOne, deleteOne };
