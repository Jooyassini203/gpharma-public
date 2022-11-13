import Entreprise from "../database/models/Entreprise.model.js";
import { uploadFile } from "../utils/utils.js";
const getSpecific = async (req, res) => {
  console.log(req.params);
  try {
    const response = await Entreprise.findOne({ where: { id: req.params.id } });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};
const createOne = async (req, res) => {};
const updateOne = async (req, res) => {
  const data = JSON.parse(req.body.data);
  try {
    console.log("req.body", req.body);
    const item = await Entreprise.findOne({ where: { id: req.params.id } });
    item.set(data);
    if (req.files) {
      uploadFile(
        req,
        res,
        "LOGO_",
        "images/entreprise",
        item,
        async () => await item.save(),
        "",
        "logo"
      );
    }
    await item.save();
    return res
      .status(200)
      .send({ message: "Les inforamtions sur votre pharmacie sont à jours!" });
  } catch (error) {
    console.log(error);
    return res.status(200).send({ message: error.message });
  }
};
export { getSpecific, createOne, updateOne };
