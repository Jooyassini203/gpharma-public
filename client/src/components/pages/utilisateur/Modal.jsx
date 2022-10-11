import React, {useState, useEffect} from "react";
import { useRecoilState } from "recoil";
import { isAddState, listUtilisateurState, userSelectState, initializeState } from "../../../atoms/utilisateur.js";
import { getData, addData, updateData, InputForm, SelectForm, sexeOptions } from "../../../utils/utils.js";

  //DEBUT Déclaration des variables
  const optionsType = [
    {
      value: "ADMIN",
      label: "Administrateur",
    },
    {
      value: "CAISSIER",
      label: "Caissier",
    },
    {
      value: "GUICHETIER",
      label: "Guichetier",
    },
  ];
  //FIN Déclaration des variables
function Modal() {
const initialize = {
  nom_utilisateur: "",
  nom_login: "",
  sexe: {
    value: "test",
    label: "test",
  },
  type_utilisateur: {
      value: "test",
      label: "test",
    },
  contact: "",
  email: "",
  mot_de_passe: "",
  image: null,
}
  const closeRef = React.useRef();
  const inputRef = React.useRef();
  //DEBUT Déclaration des states ET ref
  const [utilisateur, setUtilisateur] = useState(initialize);
  const {
    nom_utilisateur,
    nom_login,
    sexe,
    type_utilisateur,
    contact,
    email,
    mot_de_passe,
    image,
  } = utilisateur; 
  const [isObligatory, setIsObligatory] = useState(false);
  const [preview, setPreview] = useState("");
  const [isAdd, setIsAdd] = useRecoilState(isAddState);
  const [listUser, setListUser] = useRecoilState(listUtilisateurState);
  const [userSelect, setUserSelect] = useRecoilState(userSelectState);
  
  //DEBUT Déclaration des functions Modal
  const getAllUser = () => {
    closeRef.current.click();
    getData(`utilisateurs`, setListUser);
  };
  
  const addUser = () => {
    if (
      !nom_utilisateur ||
      !nom_login ||
      !type_utilisateur ||
      !sexe ||
      !nom_login ||
      !mot_de_passe ||
      !contact
    )
      return;
    let formData = new FormData();
    console.log("file", image);
    formData.append("file", image);
    formData.append(
      "data",
      JSON.stringify({
        nom_utilisateur,
        nom_login,
        type_utilisateur: type_utilisateur.value,
        sexe: sexe.value,
        nom_login,
        mot_de_passe,
        contact,
        email,
      })
    );
    addData("utilisateur", formData, getAllUser, true);
  };
  const updateUser = () => {
    if (
      !nom_utilisateur ||
      !nom_login ||
      !type_utilisateur ||
      !sexe ||
      !nom_login ||
      !mot_de_passe ||
      !contact
    )
      return;
    let formData = new FormData();
    console.log("file", image);
    formData.append("file", image);
    formData.append(
      "data",
      JSON.stringify({
        nom_utilisateur,
        nom_login,
        type_utilisateur: type_utilisateur.value,
        sexe: sexe.value,
        nom_login,
        mot_de_passe,
        contact,
        email,
      })
    );
    updateData('utilisateur', userSelect.id, formData, getAllUser, true)
  };
  //FIN Déclaration des states
  //DEBUT Déclaration des simples functions
  const onChange = (e, nameSelect = "") => {
    if (e.label) {
      console.log("event : ", e);
      setUtilisateur((prevState) => ({ ...prevState, [nameSelect]: e }));
      return;
    }
    if (e.target.files) {
      loadImage(e);
      setUtilisateur((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.files[0],
      }));
      return;
    }
    const { name, value } = e.target;
    setUtilisateur((prevState) => ({ ...prevState, [name]: value }));
  };
  const loadImage = (event) => {
    const img = event.target.files[0];
    console.log(img, "url", URL.createObjectURL(img));
    setPreview(URL.createObjectURL(img));
  };
  const handleClickInput = () => {
    inputRef.current.click();
  };
  //FIN Déclaration des simples functions
  //FIN Déclaration des functions Modal
  useEffect(() => {
    console.log('test');
  setUtilisateur(initialize); 
    setIsObligatory(false);
    getAllUser();
  }, []);
  //DEBUT utilisation states
  useEffect(() => {
    setUtilisateur(userSelect)  
    setPreview(userSelect.url ? userSelect.url : "images/profile/1.jpg")
  }, [userSelect]);
  //FIN utilisation states

  return (
    <>
      <div
        className="modal fade"
        id="modalUtilisateur"
        style={{ display: "none" }}
        aria-modal="true"
        data-backdrop="static"
        data-keyboard="true"
        tabindex="-1"
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
                onClick={() => {
                  setUtilisateur(initialize);
                  setIsObligatory(false);
                }}
              >
                <span>×</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="text-center mb-3">
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
              </div>
              <input
                name="image"
                type="file"
                accept=".jpg,.png,.jpeg"
                className="d-none"
                ref={inputRef}
                onChange={onChange}
              />
              <div className="row">
                <div className="col-6">
                  <InputForm
                    name="nom_login"
                    val={nom_login}
                    onChange={onChange}
                    obligatory={isObligatory ? "active" : "desactive"}
                  >
                    Identifiant
                  </InputForm>
                </div>
                <div className="col-6">
                  <SelectForm
                    name="type_utilisateur"
                    val={type_utilisateur}
                    value = {
                      optionsType.filter(option => 
                         option.value === type_utilisateur.value)
                   }
                    onChange={(e) => onChange(e, "type_utilisateur")}
                    options={optionsType}
                    obligatory={isObligatory ? "active" : "desactive"}
                  >
                    Type utilisateur
                  </SelectForm>
                </div>
              </div>

              <div className="row">
                <div className="col-6">
                  <InputForm
                    name="nom_utilisateur"
                    val={nom_utilisateur}
                    onChange={onChange}
                    obligatory={isObligatory ? "active" : "desactive"}
                  >
                    Nom et prénom
                  </InputForm>
                </div>
                <div className="col-6">
                  <SelectForm
                    name="sexe"
                    val={sexe}
                    value = {
                     sexeOptions.filter(option => 
                         option.value === sexe.value)
                   }
                    onChange={(e) => onChange(e, "sexe")}
                    options={sexeOptions}
                    obligatory={isObligatory ? "active" : "desactive"}
                  >
                    Sexe
                  </SelectForm>
                </div>
              </div>

              <div className="row">
                <div className="col-6">
                  <InputForm
                    name="contact"
                    tel
                    val={contact}
                    min='0'
                    onChange={onChange}
                    obligatory={isObligatory ? "active" : "desactive"}
                  >
                    Contact
                  </InputForm>
                </div>
                <div className="col-6">
                  <InputForm name="email" email val={email} onChange={onChange}>
                    Email
                  </InputForm>
                </div>
              </div>

              { isAdd ? <InputForm
                name="mot_de_passe"
                password
                val={mot_de_passe}
                onChange={onChange}
                obligatory={isObligatory ? "active" : "desactive"}
              >
                { isAdd ? 'Mot de passe' : 'Nouveau mot de passe'}
              </InputForm> : ''}
              
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger light"
                data-dismiss="modal"
                onClick={() => { 
                  setUtilisateur(initialize);
                  setIsObligatory(false);
                }}
              >
                Annuler
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={(id) => {
                  isAdd ? addUser() : updateUser(id);
                  setIsObligatory(true);
                }}
              >
                {isAdd ? "Ajouter" : "Modifier"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
