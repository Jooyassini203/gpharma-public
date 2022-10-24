import React from "react";
import { useRecoilState } from "recoil";
import { InputForm, updateData } from "../../../utils/utils";
import { isAddState, listFournisseur, fournisseurSelect, initialize } from "../../../atoms/fournisseur";

function Modal() {
  const [isAdd, setIsAdd] = useRecoilState(isAddState);
  const [fournisseurSelected, setFournisseurSelected] = useRecoilState(fournisseurSelect);
  const [fournisseur, setFournisseur] = React.useState(initialize)
  const [isOb, setIsOb] = React.useState(false)
  const [preview, setPreview] = React.useState("");
  const closeRef = React.useRef();
  const inputRef = React.useRef();
  const  {
    nom_fournisseur,
    contact_fournisseur,
    contact_secretaire,
    compte_PCG,
    logo,
    // image,
    condition_paiement,
    delais_reglement,
    email,
    adresse,
    nif,
    stat,
  } = fournisseur
  const onChange = (e, nameSelect = "") => {
    if (e.label) {
      console.log("event : ", e);
      setFournisseur((prevState) => ({ ...prevState, [nameSelect]: e }));
      return;
    }
    if (e.target.files) {
      setPreview(URL.createObjectURL(e.target.files[0]))
      setFournisseur((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.files[0],
      }));
      return;
    }
    const { name, value } = e.target;
    setFournisseur((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleClickInput = () => {
    inputRef.current.click();
  };
  const add = () => {
    closeRef.current.click();
  };
  const update = () => {
    closeRef.current.click();
  };
  return (
    <div
      className="modal fade"
      id="modalFournisseur"
      style={{ display: "none" }}
      aria-modal="true"
      data-backdrop="static"
      data-keyboard="true"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {isAdd ? "Ajouter" : "Modifier"} un utilsateur
            </h5>
            <button
              ref={closeRef}
              type="button"
              className="close"
              data-dismiss="modal"
              onClick={() => {}}
            >
              <span>×</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="row"> 
              <img
                  style={{ width: "auto", height: "15vh", borderRadius: "2%" }}
                  src={preview ? preview : "images/profile/1.jpg"}
                  alt="Image"
                  className="img-fluid shadow-sm"
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title="Cliqué ici pour changer l'image"
                  onClick={handleClickInput}
                /> 
              <input
                name="logo"
                type="file"
                accept=".jpg,.png,.jpeg"
                className="d-none"
                ref={inputRef}
                onChange={onChange}
              />
            </div>
            <div className="row">
              <InputForm name="nom_fournisseur" val={nom_fournisseur} onchange={onChange} obligatory={isOb?"active":""}>Nom fournisseur</InputForm>
            </div>
            <div className="row">
              <div className="col-6">
              <InputForm name="contact_fournisseur" val={contact_fournisseur} onchange={onChange} obligatory={isOb?"active":""}>Contact fournisseur</InputForm>
              </div>
              <div className="col-6">
              <InputForm name="contact_secretaire" val={contact_secretaire} onchange={onChange} obligatory={isOb?"active":""}>Contact secretaire</InputForm>
              </div>
            </div>
            <div className="row">
              <InputForm name="compte_PCG" val={compte_PCG} onchange={onChange} obligatory={isOb?"active":""}>compte Plan Comptable Général</InputForm>
            </div>
            <div className="row">
              <InputForm name="delais_reglement" val={delais_reglement} onchange={onChange} obligatory={isOb?"active":""}>Délais de reèglement</InputForm>
            </div>
            <div className="row">
              <div className="col-6">
              <InputForm email name="email" val={email} onchange={onChange} obligatory={isOb?"active":""}>Email</InputForm>
              </div>
              <div className="col-6">
              <InputForm name="adresse" val={adresse} onchange={onChange} obligatory={isOb?"active":""}>Adresse</InputForm>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
              <InputForm name="nif" val={nif} onchange={onChange} obligatory={isOb?"active":""}>Nif</InputForm>
              </div>
              <div className="col-6">
              <InputForm name="stat" val={stat} onchange={onChange} obligatory={isOb?"active":""}>Status</InputForm>
              </div>
            </div>
            <div className="row">
              <InputForm textarea row="3" name="condition_paiement" val={condition_paiement} onchange={onChange} obligatory={isOb?"active":""}>Condition de paiement</InputForm>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-danger light"
              data-dismiss="modal"
              onClick={() => {}}
            >
              Annuler
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() =>  {isAdd ? add() : update()}}
            >
              {isAdd ? "Ajouter" : "Modifier"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
