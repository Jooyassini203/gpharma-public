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
const createOne = (req, res) => {};
const updateOne = async (req, res) => {};
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
