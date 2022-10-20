import Mode_expedition from "../database/models/Mode_expedition.model.js";
const getAll = async (req, res) => {
  try {
    const response = await Mode_expedition.findAll();
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};
const getSpecific = async (req, res) => {
  try {
    const response = await Mode_expedition.findOne({
      where: { id: req.params.id },
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

const createOne = async (req, res) => {
  try {
    await Mode_expedition.create(req.body);
    res.status(200).send({ message: "Mode d'expédition ajouté avec succès!" });
  } catch (error) {
    res.status(422).send({ message: error.message });
    console.log(error.message);
  }
};
const updateOne = async (req, res) => {
  const item = await Mode_expedition.findOne({ where: { id: req.params.id } });
  if (!item)
    return res.status(404).json({ message: "Mode d'expédition introvable!" });
  try {
    item.set(req.body);
    await item.save();
    res.status(201).send({ message: "Mode d'expédition modifié avec succès!" });
  } catch (error) {
    res.status(422).send({ message: error.message });
    console.log(error.message);
  }
};
const deleteOne = async (req, res) => {
  const user = Mode_expedition.findOne({ where: { id: req.params.id } });
  if (!user)
    return res.status(404).json({ message: "Mode d'expédition introvable!" });
  try {
    await Mode_expedition.destroy({ where: { id: req.params.id } });
    return res
      .status(200)
      .json({ message: "Mode d'expédition supprimé avec succès!" });
  } catch (error) {
    console.log(error);
  }
};
export { getAll, getSpecific, createOne, updateOne, deleteOne };
