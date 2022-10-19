import Famille from "../database/models/Famille.model.js";
const getAll = async (req, res) => {
  try {
    const response = await Famille.findAll();
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};
const getSpecific = async (req, res) => {
  try {
    const response = await Famille.findOne({ where: { id: req.params.id } });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

const createOne = async (req, res) => {
  try {
    await Famille.create(req.body);
    res.status(200).send({ message: "Famille ajouté avec succès!" });
  } catch (error) {
    res.status(422).send({ message: error.message });
    console.log(error.message);
  }
};
const updateOne = async (req, res) => {};
const deleteOne = async (req, res) => {
  const user = Famille.findOne({ where: { id: req.params.id } });
  if (!user) return res.status(404).json({ message: "Famille introvable!" });
  try {
    await Famille.destroy({ where: { id: req.params.id } });
    return res.status(200).json({ message: "Famille supprimé avec succès!" });
  } catch (error) {
    console.log(error);
  }
};
export { getAll, getSpecific, createOne, updateOne, deleteOne };
