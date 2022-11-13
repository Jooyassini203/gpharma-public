import fs from "fs";
import path from "path";
import pdf from "pdf-creator-node";
import Caisse from "../database/models/Caisse.model";
import Client from "../database/models/Client.model";
import Guichet from "../database/models/Guichet.model";
import Ordonnance from "../database/models/Ordonnance.model";
import Produit from "../database/models/Produit.model";
import Societe from "../database/models/Societe.model";
import Unite from "../database/models/Unite.model";
import Vente from "../database/models/Vente.model";
import Vente_detail from "../database/models/Vente_detail.model";
import options from "../utils/pdf-creator-node/options";
import { getDateTime } from "../utils/utils";

const gerneratePdf = async (req, res) => {
  const id_vente = req.params.id;
  const html = fs.readFileSync(
    path.join(__dirname, "../templates/pdf/vente.facture.html"),
    "utf-8"
  );
  const filename = getDateTime(`FACTURE_${id_vente}_}`);
  const pharmacie = await Entreprise.findOne({ where: { id: req.params.id } });
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
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });

    res.status(200).json({url: filename})
};

export { gerneratePdf };
