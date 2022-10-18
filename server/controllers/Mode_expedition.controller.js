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
const createOne = (req, res) => {};
const updateOne = async (req, res) => {};
const deleteOne = async (req, res) => {
  const user = Mode_expedition.findOne({ where: { id: req.params.id } });
  if (!user)
    return res.status(404).json({ message: "Mode_expedition introvable!" });
  try {
    await Mode_expedition.destroy({ where: { id: req.params.id } });
    return res
      .status(200)
      .json({ message: "Mode_expedition supprimé avec succès!" });
  } catch (error) {
    console.log(error);
  }
};
export { getAll, getSpecific, createOne, updateOne, deleteOne };
