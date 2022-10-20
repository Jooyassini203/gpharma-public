import Forme from "../database/models/Forme.model.js";
const getAll = async (req, res) => {
  try {
    const response = await Forme.findAll();
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};
const getSpecific = async (req, res) => {
  try {
    const response = await Forme.findOne({ where: { id: req.params.id } });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

const createOne = async (req, res) => {
  try {
    await Forme.create(req.body);
    res.status(200).send({ message: "Forme ajouté avec succès!" });
  } catch (error) {
    res.status(422).send({ message: error.message });
    console.log(error.message);
  }
};
const updateOne = async (req, res) => {
  const item = await Forme.findOne({ where: { id: req.params.id } });
  if (!item) return res.status(404).send({ message: "Forme introvable!" });
  try {
    item.set(req.body);
    await item.save();
    res.status(201).send({ message: "Forme modifié avec succès!" });
  } catch (error) {
    res.status(422).send({ message: error.message });
    console.log(error.message);
  }
};
const deleteOne = async (req, res) => {
  const user = Forme.findOne({ where: { id: req.params.id } });
  if (!user) return res.status(404).json({ message: "Forme introvable!" });
  try {
    await Forme.destroy({ where: { id: req.params.id } });
    return res.status(200).json({ message: "Forme supprimé avec succès!" });
  } catch (error) {
    console.log(error);
  }
};
export { getAll, getSpecific, createOne, updateOne, deleteOne };
