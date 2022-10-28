import { atom, RecoilState } from "recoil";

export const toggleAddTableEdit = atom({
  key: "is-add-ravitaillement",
  default: 0, //0:Table , 1:Add, 2:Edit
});

export const listRavitaillement = atom({
  key: "list-ravitaillement",
  default: [],
});
