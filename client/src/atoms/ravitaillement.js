import { atom, RecoilState } from "recoil";

export const toggleAddTableEdit = atom({
  key: "is-add-ravitaillement",
  default: 0, //0:Table , 1:Add, 2:Edit
});

export const listRavitaillement = atom({
  key: "list-ravitaillement",
  default: [],
});

export const intializeRavitaillement = {
  motif: "",
  montant_ht: 0,
  etat_ravitaillement: "EN_COURS",
  date_prev_livraison: "",
  tva: "",
  caisse_id: {
    label: "",
    value: "",
  },
  fournisseur_id: {
    label: "",
    value: "",
  },
  mode_expedition_id: {
    label: "",
    value: "",
  },
};

export const intializeRavitaillementDetails = {
  prix_unit: 0,
  prix_ht: 0,
  quantite_demande: 0,
  montant_ht: 0,
  produit_id: {
    label: "",
    value: "",
  },
  unite_achat: "",
};
