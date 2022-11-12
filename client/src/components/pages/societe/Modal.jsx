import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  addData,
  getData,
  getUrl,
  InputForm,
  updateData,
  onChange,
} from "../../../utils/utils";
import {
  isAddState,
  listSociete,
  societeSelect,
  initialize,
} from "../../../atoms/societe";
import { text } from "@fortawesome/fontawesome-svg-core";

function Modal() {
  const [isAdd, setIsAdd] = useRecoilState(isAddState);
  const [list, setList] = useRecoilState(listSociete);
  const [societeSelected, setSocieteSelected] = useRecoilState(societeSelect);
  const [societe, setSociete] = useState(initialize);
  const [isOb, setIsOb] = React.useState(false);
  const { nom_societe, prise_en_charge } = societe;

  const getAll = () => {
    setIsOb(false);
    setSociete(initialize);
    document.getElementById("closeModalSociete").click();
    getData("societe", (data) => {
      setIsAdd({ status: true });
      setList(data);
    });
  };
  const add = () => {
    if (!nom_societe || !prise_en_charge) {
      return;
    }
    addData("societe", { data: societe }, getAll);
  };
  const update = () => {
    if (!nom_societe || !prise_en_charge) {
      return;
    }
    updateData("societe", societeSelected.id, { data: societe }, getAll);
  };
  useEffect(() => {
    if (isAdd.status) {
      setSociete(initialize);
    } else {
      if (societeSelected) {
        ////console.log(societeSelected);
        setSociete(societeSelected);
      }
    }
  }, [isAdd]);
  useEffect(() => { 
    //console.log(societeSelected);
      if (societeSelected) {
        setSociete(societeSelected);
      }  
  }, [societeSelect]);
  return (
    <div
      className="modal fade"
      id="modalSociete"
      style={{ display: "none" }}
      aria-modal="true"
      data-backdrop="static"
      data-keyboard="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {isAdd.status ? "Ajouter" : "Modifier"} un société
            </h5>
            <button
              type="button"
              id="closeModalSociete"
              className="close"
              data-dismiss="modal"
              onClick={() => {
                setIsOb(false);
                setSociete(initialize);
              }}
            >
              <span>×</span>
            </button>
          </div>
          <div className="modal-body">
            <InputForm
              name="nom_societe"
              val={nom_societe}
              onChange={(e) => onChange(e, setSociete)}
              obligatory={isOb ? "active" : ""}
            >
              Nom societe
            </InputForm>

            <InputForm
              number
              step="0.01"
              min="1"
              max="100"
              name="prise_en_charge"
              val={prise_en_charge}
              onChange={(e) => onChange(e, setSociete)}
              obligatory={isOb ? "active" : ""}
              postIcon={{ text: "%" }}
            >
              Taux prise en charge
            </InputForm>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-danger light"
              data-dismiss="modal"
              onClick={() => {
                setIsOb(false);
                setSociete(initialize);
              }}
            >
              Annuler
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                setIsOb(true);
                isAdd.status ? add() : update();
              }}
            >
              {isAdd.status ? "Ajouter" : "Modifier"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
