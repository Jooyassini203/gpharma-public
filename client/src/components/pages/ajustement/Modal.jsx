import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  addData,
  getData,
  getUrl,
  InputForm,
  updateData,
  onChange,
  convertToOption,
  confirmDelete,
  SelectForm,
  getClassByNumber,
  ButtonTable,
  filterOption,
} from "../../../utils/utils";
import { listAjustement } from "../../../atoms/ajustement";
import { faAdd } from "@fortawesome/free-solid-svg-icons";

function Modal() {
  const [list, setList] = useRecoilState(listAjustement);
  const [isObAjt, setIsObAjt] = React.useState(false);
  const [isObAjtDt, setIsObAjtDt] = React.useState(false);
  const [ajustement, setAjustement] = useState({
    motif: "",
    date_saisi: "",
    date_ajustement: "",
  });
  const [ajustementDetails, setAjustementDetails] = useState({
    quantite_nouveau_stock: "",
    quantite_nouveau_presentation: "",
    unite_nouveau_stock: "",
    unite_nouveau_presentation: "",
    produit_code_lot_produit: { value: "", label: "" },
  });
  const [_produit, set_Produit] = useState({});
  const [listAjustementDetails, setListAjustementDetails] = useState([]);
  const [OptionsProduit, setOptionsProduit] = useState([]);
  const [OptionsUniteStock, setOptionsUniteStock] = useState([]);
  const [OptionsUnitePresentation, setOptionsUnitePresentation] = useState([]);
  const { motif, date_saisi, date_ajustement } = ajustement;
  const {
    quantite_nouveau_stock,
    quantite_nouveau_presentation,
    unite_nouveau_stock,
    unite_nouveau_presentation,
    produit_code_lot_produit,
  } = ajustementDetails;

  const addItemInTable = () => {};
  const add = () => {};
  useEffect(() => {
    getData("produit", (data) => {
      convertToOption(
        data[0],
        setOptionsProduit,
        "nom_produit",
        "produit_dode_lot_produit"
      );
    });
    getData("unite", (data) => {
      convertToOption(data[0], setOptionsUniteStock);
    });
    getData("unite", (data) => {
      convertToOption(data[0], setOptionsUnitePresentation);
    });
  }, []);
  return (
    <div
      className="modal fade"
      id="modalAjustement"
      style={{ display: "none" }}
      aria-modal="true"
      data-backdrop="static"
      data-keyboard="true"
    >
      <div className="modal-dialog modal-xl modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Efféctuer une ajustement</h5>
            <button 
              type="button"
              className="close"
              data-dismiss="modal"
              onClick={() => {
                setIsObAjt(false);
              }}
            >
              <span>×</span>
            </button>
          </div>
          <div className="modal-body">
            <InputForm
              name="motif"
              val={motif}
              onChange={(e) => onChange(e, setAjustement)}
              obligatory={isObAjt ? "active" : ""}
            >
              Motif de l'ajustement
            </InputForm>
            <div className="row">
              <div className="col-3">
                <SelectForm
                  val={produit_code_lot_produit}
                  value={filterOption(OptionsProduit, produit_code_lot_produit)}
                  options={OptionsProduit}
                  onChange={(e) => {
                    onChange(
                      e,
                      setAjustementDetails,
                      "produit_code_lot_produit"
                    );
                    if (e.value)
                      getData(
                        "produit",
                        (data) => set_Produit(data[0]),
                        e.value
                      );
                  }}
                  obligatory={isObAjt ? "active" : ""}
                >
                  Contact fournisseur
                </SelectForm>
              </div>
              <div className="col">
                <InputForm
                  name="quantite_nouveau_stock"
                  val={quantite_nouveau_stock}
                  onChange={(e) => onChange(e, setAjustementDetails)}
                  obligatory={isObAjt ? "active" : ""}
                >
                  Nouv. Qte stock
                </InputForm>
              </div>
              <div className="col">
                <label className="font-w600">Unité stock</label>
                <span
                  className="badge badge-warning light"
                  style={{ padding: "1.75vh", marginTop: "-0.35vh" }}
                >
                  {_produit.nom_stock}
                </span>
              </div>
              <div className="col">
                <InputForm
                  name="quantite_nouveau_presentation"
                  val={quantite_nouveau_presentation}
                  onChange={(e) => onChange(e, setAjustementDetails)}
                  obligatory={isObAjtDt ? "active" : ""}
                >
                  Nouv. Qte présentation
                </InputForm>
              </div>
              <div className="col">
                <label className="font-w600">Unité Pres.</label>
                <span
                  className="badge badge-warning light"
                  style={{ padding: "1.75vh", marginTop: "-0.35vh" }}
                >
                  {_produit.nom_presentation}
                </span>
              </div>
            </div>
            <div className="row m-auto">
              <div className="col mr-2">
                <span className="badge badge-dark light badge-xl row">
                  <span className={"badge badge-"+getClassByNumber(parseFloat(_produit.quantite_stock))+" light col-8 mr-2"}>{_produit.quantite_stock}</span>
                  <span className="badge badge-dark col-4 mr-2">{_produit.nom_stock}</span>
                </span> 
              </div>
              <div className="col mr-2"> 
                <span className="badge badge-dark light badge-xl row mr-2">
                  <span className={"badge badge-"+getClassByNumber(parseFloat(_produit.quantite_presentation))+" light col-8 mr-2"}>{_produit.quantite_presentation}</span>
                  <span className="badge badge-dark col-4 mr-2">{_produit.nom_presentation}</span>
                </span> 
              </div>
              <div className="col mr-2"> 
                <ButtonTable importance="warning light" icon={faAdd} handleClick={addItemInTable} >&nbsp;&nbsp;&nbsp;Ajouter</ButtonTable>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger light"
                data-dismiss="modal"
                onClick={() => {
                    setIsObAjt(false);
                }}
              >
                Annuler
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  setIsObAjt(true);
                  confirmDelete("", () => add(), "Ajuster", "success");
                }}
              >
                Valider
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
