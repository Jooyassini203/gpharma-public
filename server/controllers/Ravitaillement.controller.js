import Ravitaillement from "../database/models/Ravitaillement.model.js";
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
const createOne = (req, res) => {};
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
