import Guichet from "../database/models/Guichet.model.js";
import Produit from "../database/models/Produit.model.js";
const getAll = async (req, res) => {
  try {
    const response = await Guichet.findAll({
      where: { utilisateur_id: req.params.id },
    });
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
  const { vente, listVenteDetails, utilisateur_id } = JSON.parse(req.body);
  try {
    let message = "";
    const item_vente = await Guichet.create({ vente });
    if (!item_vente)
      return res.status(404).json({ message: "Une erreur est survénue!" });

    listVenteDetails.forEach(async (element) => {
      const item_venteDetail = await Guichet.create({
        ...element,
        utilisateur_id,
      });
      if (item_venteDetail) message = `${element.nom_produit}`;
    });

    return res.status(200).json({ message });
  } catch (error) {
    console.log(error);
  }
};
const updateOne = async (req, res) => {};
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
