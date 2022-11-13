import fs from "fs";
import path, { dirname } from "path";
import pdf from "pdf-creator-node";
import { fileURLToPath } from "url";
import Caisse from "../database/models/Caisse.model.js";
import Client from "../database/models/Client.model.js";
import Entreprise from "../database/models/Entreprise.model.js";
import Guichet from "../database/models/Guichet.model.js";
import Ordonnance from "../database/models/Ordonnance.model.js";
import Produit from "../database/models/Produit.model.js";
import Societe from "../database/models/Societe.model.js";
import Unite from "../database/models/Unite.model.js";
import Vente from "../database/models/Vente.model.js";
import Vente_detail from "../database/models/Vente_detail.model.js";
import options from "../utils/pdf-creator-node/options.js";
import { getDateTime } from "../utils/utils.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const gerneratePdf = async (req, res) => {
  const id_vente = req.params.id; 
  const html = fs.readFileSync( path.join(__dirname,  "../templates/pdf/vente.facture.html"), "utf-8");
  const filename =`FACTURE_${id_vente}_${getDateTime()}.pdf` ;
  const pharmacie = await Entreprise.findOne({ where: { id: 'GPHARMA_0001' } });
  if (!pharmacie)
    return res.status(404).send({ message: "Une erreur est survénue!" });
  let _vente = await Vente.findAll({
    where: { id: req.params.id },
    include: [
      { model: Client },
      { model: Guichet },
      { model: Ordonnance },
      { model: Caisse },
      { model: Societe },
    ],
  });
  const _venteDetails = await Vente_detail.findAll({
    where: { vente_id: req.params.id },
    include: [{ model: Unite }, { model: Produit }],
  });
  const data = {
    pharmacie,
    _vente,
    _venteDetails,
  };
  const document = {
    html,
    data,
    path: "./public/pdf/vente/facture/" + filename,
  };
  pdf
    .create(document, options)
    .then((response) => {
      console.log(response);
      return res.status(200).json({url: filename})
    })
    .catch((error) => {
      console.log(error);
    });
};

export { gerneratePdf };
