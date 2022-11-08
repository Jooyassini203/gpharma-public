import Guichet from "../database/models/Guichet.model.js";
const getAll = async (req, res) => {
  try {
    const response = await Guichet.findAll();
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};
const getSpecific = async (req, res) => {
  try {
    const response = await Guichet.findOne({ where: { id: req.params.id } });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};
const createOne = async (req, res) => {
  try {
    await Guichet.create(req.body);
    res.status(200).send({ message: "Guichet ajouté avec succès!" });
  } catch (error) {
    res.status(422).send({ message: error.message });
    console.log(error.message);
  }
};
const updateOne = async (req, res) => {
  const item = await Guichet.findOne({ where: { id: req.params.id } });
  if (!item) return res.status(404).send({ message: "Guichet introvable!" });
  try {
    console.log("item", item);
    item.set(req.body);
    await item.save();
    res.status(201).send({ message: "Guichet modifié avec succès!" });
  } catch (error) {
    res.status(422).send({ message: error.message });
    console.log(error.message);
  }
};
const deleteOne = async (req, res) => {
  const item = Guichet.findOne({ where: { id: req.params.id } });
  if (!item) return res.status(404).json({ message: "Guichet introvable!" });
  try {
    await Guichet.destroy({ where: { id: req.params.id } });
    return res.status(200).json({ message: "Guichet supprimé avec succès!" });
  } catch (error) {
    console.log(error);
  }
};
export { getAll, getSpecific, createOne, updateOne, deleteOne };
