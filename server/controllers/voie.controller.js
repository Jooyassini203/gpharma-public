import Voie from "../models/Voie.model.js"; 

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
const createOne =  (req, res) => {
  
}; 
const updateOne = async (req, res) => {
};
const deleteOne = async (req, res) => {
  const user = Voie.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!user)
    return res.status(404).json({ message: "Voie introvable!" });
  try { 
    await Voie.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res
      .status(200)
      .json({ message: "Voie supprimé avec succès!" });
  } catch (error) {
    console.log(error);
  }
};
export { getAll, getSpecific, createOne, updateOne, deleteOne };
