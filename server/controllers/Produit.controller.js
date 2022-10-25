import Produit from "../database/models/Produit.model.js";
const getAll = async (req, res) => {
  try {
    const response = await Produit.findAll();
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};
const getSpecific = async (req, res) => {
  try {
    const response = await Produit.findOne({ where: { id: req.params.id } });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};
const createOne = (req, res) => {};
const updateOne = async (req, res) => {};
const deleteOne = async (req, res) => {
  const user = await Produit.findOne({ where: { id: req.params.id } });
  if (!user) return res.status(404).json({ message: "Produit introvable!" });
  try {
    await Produit.destroy({ where: { id: req.params.id } });
    return res.status(200).json({ message: "Produit supprimé avec succès!" });
  } catch (error) {
    console.log(error);
  }
};
export { getAll, getSpecific, createOne, updateOne, deleteOne };
