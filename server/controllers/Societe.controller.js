import Societe from "../database/models/Societe.model.js";
const getAll = async (req, res) => {
  try {
    const response = await Societe.findAll();
    res.status(200).send(response);
  } catch (error) {
    res.status(422).send({ message: error.message });
    console.log(error.message);
  }
};
const getSpecific = async (req, res) => {
  try {
    const response = await Societe.findOne({ where: { id: req.params.id } });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};
const createOne = async (req, res) => {
  try {
    await Societe.create(req.body);
    res.status(200).send({ message: "Société ajouté avec succès!" });
  } catch (error) {
    res.status(422).send({ message: error.message });
    console.log(error.message);
  }
};
const updateOne = async (req, res) => {
  const item = await Societe.findOne({ where: { id: req.params.id } });
  if (!item) return res.status(404).send({ message: "Société introvable!" });
  try {
    console.log("item", item);
    item.set(req.body);
    await item.save();
    res.status(201).send({ message: "Société modifié avec succès!" });
  } catch (error) {
    res.status(422).send({ message: error.message });
    console.log(error.message);
  }
};
const deleteOne = async (req, res) => {
  const user = Societe.findOne({ where: { id: req.params.id } });
  if (!user) return res.status(404).json({ message: "Societe introvable!" });
  try {
    await Societe.destroy({ where: { id: req.params.id } });
    return res.status(200).json({ message: "Societe supprimé avec succès!" });
  } catch (error) {
    console.log(error);
  }
};
export { getAll, getSpecific, createOne, updateOne, deleteOne };
