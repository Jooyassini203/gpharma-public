import Caisse from "../database/models/Caisse.model.js";

const getAll = async (req, res) => {
  try {
    const response = await Caisse.findAll();
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};
const getSpecific = async (req, res) => {
  try {
    const response = await Caisse.findOne({ where: { id: req.params.id } });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};
const createOne = (req, res) => {};
const updateOne = async (req, res) => {};
const deleteOne = async (req, res) => {
  const user = Caisse.findOne({ where: { id: req.params.id } });
  if (!user) return res.status(404).json({ message: "Caisse introvable!" });
  try {
    await Caisse.destroy({ where: { id: req.params.id } });
    return res.status(200).json({ message: "Caisse supprimé avec succès!" });
  } catch (error) {
    console.log(error);
  }
};
export { getAll, getSpecific, createOne, updateOne, deleteOne };
