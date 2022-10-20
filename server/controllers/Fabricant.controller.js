import Fabricant from "../database/models/Fabricant.model.js";
const getAll = async (req, res) => {
  try {
    const response = await Fabricant.findAll();
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};
const getSpecific = async (req, res) => {
  try {
    const response = await Fabricant.findOne({ where: { id: req.params.id } });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

const createOne = async (req, res) => {
  try {
    await Caisse.create(req.body);
    res.status(200).send({ message: "Caisse ajouté avec succès!" });
  } catch (error) {
    res.status(422).send({ message: error.message });
    console.log(error.message);
  }
};
const updateOne = async (req, res) => {
  const item = Famille.findOne({ where: { id: req.params.id } });
  if (!item) return res.status(404).json({ message: "Fabricant introvable!" });
  try {
    item.set(req.body);
    await item.save();
    res.status(201).send({ message: "Fabricant modifié avec succès!" });
  } catch (error) {
    res.status(422).send({ message: error.message });
    console.log(error.message);
  }
};
const deleteOne = async (req, res) => {
  const user = Fabricant.findOne({ where: { id: req.params.id } });
  if (!user) return res.status(404).json({ message: "Fabricant introvable!" });
  try {
    await Fabricant.destroy({ where: { id: req.params.id } });
    return res.status(200).json({ message: "Fabricant supprimé avec succès!" });
  } catch (error) {
    console.log(error);
  }
};
export { getAll, getSpecific, createOne, updateOne, deleteOne };
