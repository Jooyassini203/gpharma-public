import { atom } from "recoil";

export const isAddState = atom({
  key: "is-add-fournisseur",
  default: true,
});

export const listFournisseur = atom({
  key: "list-fournisseur",
  default: [],
});

export const fournisseurSelect = atom({
  key: "list-fournisseur",
  default: null,
});

export const initialize = {
  nom_fournisseur: "",
  contact_fournisseur: "",
  contact_secretaire: "",
  compte_PCG: "",
  logo: "",
  // image : "",
  condition_paiement: "",
  delais_reglement: "",
  email: "",
  adresse: "",
  nif: "",
  stat: "",
};
