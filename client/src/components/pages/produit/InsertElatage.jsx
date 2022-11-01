import { faCheck } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useRecoilState } from "recoil";
import { listEtalage, listProduit } from "../../../atoms/produit";
import {
  ButtonTable,
  convertToOption,
  filterOption,
  getData,
  getEmplacement,
  InputForm,
  onChange,
  SelectForm,
  updateData,
} from "../../../utils/utils";

function InsertElatage() {
  const [listPrdt, setListPrdt] = useRecoilState(listProduit);
  const [list, setList] = useRecoilState(listEtalage);
  const [OptionsProduit, setOptionsProduit] = React.useState([]);
  const [etalage, setEtalage] = React.useState({
    produit_code_lot_produit: "",
    qte: "",
  });
  const [produit, setProduit] = React.useState({});
  const [isOb, setIsOb] = React.useState(false);
  const { produit_code_lot_produit, qte } = etalage;
  React.useEffect(() => {
    getAllEtalage();
  }, []);
  const getAllEtalage = () => {
    getData("Produit", (data) => {
      convertToOption(
        data,
        setOptionsProduit,
        "nom_produit",
        "code_lot_produit"
      );
    });
    getData("produit", setListPrdt); 
    getData("produitEtalage", setList); 
  };
  return (
    <>
      <div className="row">
        <div className="col-5">
          <SelectForm
            val={produit_code_lot_produit}
            value={filterOption(OptionsProduit, produit_code_lot_produit)}
            options={OptionsProduit}
            onChange={(e) => {
              onChange(e, setEtalage, "produit_code_lot_produit");
              if (e.value)
                getData("produit", (data) => setProduit(data[0]), e.value);
            }}
            obligatory={isOb ? "active" : ""}
          >
            Produit
          </SelectForm>
        </div>
        <div className="col-3">
          <InputForm
            number
            postIcon={{"text": "Quantité"}}
            min="0"
            name="qte"
            val={qte}
            onChange={(e) => onChange(e, setEtalage)}
            max={
              produit.emplacement
                ? getEmplacement(produit.emplacement)[0].quantite_produit
                : ""
            }
            obligatory={isOb ? "active" : ""}
          >
            Ajouter de
          </InputForm>
        </div>
        <div className="col-2">
          <label className="font-w600">Unité stock</label>
          <span
            className="badge badge-warning light"
            style={{ padding: "1.75vh", marginTop: "-0.35vh" }}
          >
            {produit.nom_stock}
          </span>
        </div>
        <div className="col-2">
          <ButtonTable
            icon={faCheck}
            importance="primary w-100 mt-3 btn-lg"
            handleClick={() => {
              setIsOb(true);
              if (!produit_code_lot_produit.value || !qte) {
                return;
              }
              updateData(
                "etalage",
                produit_code_lot_produit.value,
                { code_lot_produit: produit_code_lot_produit.value, qte },
                getAllEtalage
              );
            }}
          >
            &nbsp;&nbsp;&nbsp; Etaler
          </ButtonTable>
        </div>
      </div>
    </>
  );
}

export default InsertElatage;
