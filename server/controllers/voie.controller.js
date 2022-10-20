import Voie from "../database/models/Voie.model.js";

const getAll = async (req, res) => {
  try {
    const response = await Voie.findAll();
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};
const getSpecific = async (req, res) => {
  try {
    const response = await Voie.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

const createOne = async (req, res) => {
  try {
    await Voie.create(req.body);
    res.status(200).send({ message: "Voie ajoutée avec succès!" });
  } catch (error) {
    res.status(422).send({ message: error.message });
    console.log(error.message);
  }
};
const updateOne = async (req, res) => {
  const item = await Voie.findOne({ where: { id: req.params.id } });
  if (!item) return res.status(404).json({ message: "Voie introvable!" });
  try {
    item.set(req.body);
    await item.save();
    res.status(201).send({ message: "Voie modifié avec succès!" });
  } catch (error) {
    res.status(422).send({ message: error.message });
    console.log(error.message);
  }
};
const deleteOne = async (req, res) => {
  const user = Voie.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ message: "Voie introvable!" });
  try {
    await Voie.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.status(200).json({ message: "Voie supprimé avec succès!" });
  } catch (error) {
    console.log(error);
  }
};
export { getAll, getSpecific, createOne, updateOne, deleteOne };
