import React, { useEffect, useState } from "react";
// import bcrypt from "bcrypt";
import { useRecoilState } from "recoil";
import { showRightNav } from "../../atoms/nav";
import { getRule, InputForm, updateData } from "../../utils/utils";
import { userConnected } from "../../atoms/authentication";
import "./RightNav.css";
import { toast } from "react-toastify";
 
function RightNav() {
  const [userConnect, setUserConnect] = useRecoilState(userConnected);
  const [show, setShow] = useRecoilState(showRightNav);
  const [last_mot_de_passe, setLast_mot_de_passe] = useState("");
  const [mot_de_passe, setMot_de_passe] = useState("");
  const [confirme_mot_de_passe, setConfirme_Mot_de_passe] = useState("");
  const [isOb, setIsOb] = useState(false);

  const changePwd = () => {
    if (!mot_de_passe || !confirme_mot_de_passe) {
      setIsOb(true)
      return
    } 
    // bcrypt.compare(mot_de_passe, userConnect.mot_de_passe, async (erreur, result) => { 
    //   if(!result){
    //     toast.warning('L\'ancien mot de passe est incorrect!')
    //     return
    //   }
    // })
    if(mot_de_passe !== confirme_mot_de_passe){
      toast.warning('Les deux mots de passes ne sont pas indentique!')
      return
    }
      updateData('changePwd', userConnect.id, {mot_de_passe}, ()=>{
      document.getElementById("btn-close").click()
    })
  };
  return (
    <>
      <div className={show ? "chatbox active " : "chatbox"}>
        <div className="chatbox-close" onClick={() => setShow(false)} />
        <div className="bg-primary pt-3 pb-0 ">
          <p style={{ fontSize: "16px" }} className="text-white text-center ">
            PROFILE
          </p>
        </div>
        <div
          className="yass-scroll"
          style={{ overflowY: "scroll", height: "90vh" }}
        >
          <div className="custom-tab-1 bg-light">
            <div className="card-body">
              <div className="">
                <div className="profile-blog mb-3">
                  {/* <h5 className="text-primary d-inline">Information</h5> */}
                  <img
                    src={
                      userConnect.url
                        ? userConnect.url
                        : "images/profile/17.jpg"
                    }
                    width={"40vh"}
                    alt="Image"
                    className="img-fluid mt-2 mb-4 w-100"
                  />
                </div>
                <div className="profile-statistics mb-3">
                  <div className="text-center">
                    <div className="row">
                      <div className="col">
                        <h3 className="m-b-0">{`${userConnect.nom_utilisateur} (${userConnect.nom_login})`}</h3>
                        <span>{getRule(userConnect.type_utilisateur)}</span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <a
                        type="button"
                        id="btn-close"
                        className="btn btn-primary btn-sm mb-1 mr-1"
                        data-toggle="modal"
                        data-target="#profilModal"
                      >
                        <i className="fa fa-edit"></i>
                      </a>
                      <a
                        type="button"
                        className="btn btn-primary btn-sm mb-1"
                        data-toggle="modal"
                        data-target="#profilModalPwd"
                      >
                        Changer le mot de passe
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="m-4 mt-3" style={{ minHeight: "26vh" }}>
            <h4>
              <a href="post-details.html" className="text-black">
                Administrateur de GPharma
              </a>
            </h4>
            <p className="mt-2 ">
              Cette privillège vous obtroit la contrôlle totale sur la gestion
              de votre pharmacie dans GPharma versoin 2.0.0 . Vous pouvez voir
              le manuel pour en savoir un plus de ce qui est la manipulation du
              logiciel.
            </p>
          </div>
          <div
            className="bg-light pt-2 w-100 "
            style={{ top: "0vh !important" }}
          >
            <p className="text-center">
              Copyright © Developed by{" "}
              <a
                href="https://www.mada-digital.net/"
                className="text-primary"
                target="_blank"
              >
                MADA-DIGITAL
              </a>
              {"  "}
              2022
            </p>
          </div>
        </div>
      </div>

      <div className="modal fade" id="profilModal">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Modification des imforimations</h5>
              <button type="button" className="close" data-dismiss="modal">
                <span>×</span>
              </button>
            </div>
            <div className="modal-body">
              <InputForm>Identifiant</InputForm>
              <InputForm>Nom d'utilisateur</InputForm>
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
                onClick={(id) => {}}
              >
                Modifier
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="profilModalPwd">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Modification le mot de passe</h5>
              <button type="button" className="close" data-dismiss="modal" onClick={()=>{
                  setMot_de_passe('')
                  setConfirme_Mot_de_passe('')}}>
                <span>×</span>
              </button>
            </div>
            <div className="modal-body">
              <InputForm
                password
                val={last_mot_de_passe}
                onChange={(e)=>setLast_mot_de_passe(e.target.value)}
                obligatory={isOb ? "active" : ""}
              >
                Ancien mot de passe
              </InputForm> 
              <InputForm
                password
                val={mot_de_passe}
                onChange={(e)=>setMot_de_passe(e.target.value)}
                obligatory={isOb ? "active" : ""}
              >
                Nouveau mot de passe
              </InputForm>
              <InputForm
                password
                val={confirme_mot_de_passe}
                onChange={(e)=>setConfirme_Mot_de_passe(e.target.value)}
                obligatory={isOb ? "active" : ""}
              >
                Confirmer le mot de passe
              </InputForm>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger light btn-close"
                data-dismiss="modal"
                id="btn-close"
                onClick={() => {
                  setMot_de_passe('')
                  setConfirme_Mot_de_passe('')
                }}
              >
                Annuler
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {changePwd()}}
              >
                Modifier
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RightNav;
