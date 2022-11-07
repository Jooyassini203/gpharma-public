import { atom } from "recoil";

export const isAddState = atom({
  key: "isAddState-societe",
  default: "1",
});

 export const intializeClient = {
    nom_prenom: "",
    adresse: "",
    societe_id: null, 
}
 export const intializeOrdonnance = {
    nom_docteur: "",
    hopital: "",
 }
export const intializeVente = {
    motif: "",
    montant_total: "",
    date_vente: "",
    etat_vente: "COMMANDE",
    file_societe: null,
    societe_prise_en_charge: null,
}
 export const intializeVenteDetails = {
    quantite_vente:"",
    prix_stock:"",
    montant_vente:"000.00",
    produit_code_lot_produit:{
        label:"",
        value:"",
    },
 }