import { atom } from "recoil";

export const isAddState = atom({
  key: "isAddState-guichet",
  default: "1",
});
export const listGuichet = atom({
  key: "list-guichet",
  default: [],
});

export const intializeClient = {
  nom_prenom: "",
  adresse: "",
  societe_id: null,
};
export const intializeOrdonnance = {
  nom_docteur: "",
  hopital: "",
};
export const intializeVente = {
  motif: "",
  montant_total: "",
  date_saisi: "",
  date_vente: "",
  etat_vente: "COMMANDE",
  file_societe: null,
  societe_prise_en_charge: null,
};
export const intializeVenteDetails = {
  guichet_id: {
    label: "",
    value: "",
  },
  quantite_vente: "",
  prix_stock: "",
  unite_vente: "",
  montant_vente: "000.00",
  produit_code_lot_produit: {
    label: "",
    value: "",
  },
};
