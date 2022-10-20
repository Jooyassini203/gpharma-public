import Fournisseur from "../database/models/Fournisseur.model.js";
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
const createOne = (req, res) => {};
const updateOne = async (req, res) => {};
const deleteOne = async (req, res) => {
  const item = Fournisseur.findOne({ where: { id: req.params.id } });
  if (!item)
    return res.status(404).json({ message: "Fournisseur introvable!" });
  try {
    await Fournisseur.destroy({ where: { id: req.params.id } });
    return res
      .status(200)
      .json({ message: "Fournisseur supprim� avec succ�s!" });
  } catch (error) {
    console.log(error);
  }
};
export { getAll, getSpecific, createOne, updateOne, deleteOne };
