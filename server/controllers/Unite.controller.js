import Unite from "../database/models/Unite.model.js";
const getAll = async (req, res) => {
  try {
    const response = await Unite.findAll();
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};
const getSpecific = async (req, res) => {
  try {
    const response = await Unite.findOne({ where: { id: req.params.id } });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

const createOne = async (req, res) => {
  try {
    await Unite.create(req.body);
    res.status(200).send({ message: "Unité ajouté avec succès!" });
  } catch (error) {
    res.status(422).send({ message: error.message });
    console.log(error.message);
  }
};
const updateOne = async (req, res) => {
  const item = Famille.findOne({ where: { id: req.params.id } });
  if (!item) return res.status(404).json({ message: "Unite introvable!" });
  try {
    item.set(req.body);
    await item.save();
    res.status(201).send({ message: "Unite modifié avec succès!" });
  } catch (error) {
    res.status(422).send({ message: error.message });
    console.log(error.message);
  }
};
const deleteOne = async (req, res) => {
  const user = Unite.findOne({ where: { id: req.params.id } });
  if (!user) return res.status(404).json({ message: "Unite introvable!" });
  try {
    await Unite.destroy({ where: { id: req.params.id } });
    return res.status(200).json({ message: "Unite supprimé avec succès!" });
  } catch (error) {
    console.log(error);
  }
};
export { getAll, getSpecific, createOne, updateOne, deleteOne };
