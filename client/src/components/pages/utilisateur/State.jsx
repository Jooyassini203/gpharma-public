import React, {useEffect, useState} from "react";
import {
    addData, confirmDelete, getData, updateData
  } from "../../../utils/utils.js";
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
  const initialize = {
    nom_utilisateur: "",
    nom_login: "",
    sexe: [],
    type_utilisateur: [],
    contact: "",
    email: "",
    mot_de_passe: "",
    image: null,
  };
  //FIN Déclaration des variables
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
  const [isAdd, setIsAdd] = useState(true);
  const [listUser, setListUser] = useState([]);
  const [dataView, setDataView] = useState([]);
  const [userSelect, setUserSelect] = useState([]);

  const closeRef = React.useRef();
  const inputRef = React.useRef();
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
  const showModalUpdateUser = (id) => {
    getData("utilisateur", setUserSelect, id);
  };
  const updateUser = (id) => {
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
    updateData('utilisateur', id, getAllUser, true)
  };
  const deleteUser = () => {
    confirmDelete('Voulez-vous vraimment supprimé cet utilisateur?')
  };
  const viewUser = (id) => {
    console.log(id);
    getData(
      `SELECT * FROM utilisateur WHERE id_utilisateur = "${id}"`,
      setDataView
    );
  };
  //FIN Déclaration des functions Modal
  //DEBUT utilisation states
  useEffect(() => {
    setIsObligatory(false);
    getAllUser();
  }, []);
  useEffect(() => {
    setUtilisateur(userSelect)  
    setPreview(userSelect.url ? userSelect.url : "images/profile/1.jpg")
  }, [userSelect]);
  //FIN utilisation states