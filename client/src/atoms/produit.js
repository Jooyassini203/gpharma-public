import { atom, RecoilState } from "recoil";

export const isAddState = atom({
  key: "is-add-produit",
  default: { status: true },
});

export const listProduit = atom({
  key: "list-produit",
  default: [],
});
