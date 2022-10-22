import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { showRightNav } from "../../atoms/nav";
import { InputForm } from "../../utils/utils";
import FooterNav from "./FooterNav";

function RightNav() {
  const [show, setShow] = useRecoilState(showRightNav);
  return (
    <>
      <div className={show ? "chatbox active " : "chatbox"}>
        <div className="chatbox-close" onClick={() => setShow(false)} />
        <div className="custom-tab-1 bg-light">
          <div className="bg-primary pt-3 pb-0 ">
            <p style={{ fontSize: "16px" }} className="text-white text-center ">
              PROFILE
            </p>
          </div>
          <div className="card-body">
            <div className="">
              <div className="profile-blog mb-3">
                {/* <h5 className="text-primary d-inline">Information</h5> */}
                <img
                  src="images/profile/1.jpg"
                  alt="Image"
                  className="img-fluid mt-2 mb-4 w-100"
                />
              </div>
              <div className="profile-statistics mb-3">
                <div className="text-center">
                  <div className="row">
                    <div className="col">
                      <h3 className="m-b-0">Josoa Yassini Jacquerel (YASS)</h3>
                      <span>Administrateur</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <a
                      type="button"
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
            Cette privillège vous obtroit la contrôlle totale sur la gestion de
            votre pharmacie dans GPharma versoin 2.0.0 . Vous pouvez voir le
            manuel pour en savoir un plus de ce qui est la manipulation du
            logiciel.
          </p>
        </div>
        <div className="bg-light pt-2 w-100 " style={{ top: "0vh !important" }}>
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













      
      <div className="modal fade" id="profilModal">
                  <div
                    className="modal-dialog modal-dialog-centered"
                    role="document"
                  >
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">
                          Modification des imforimations
                        </h5>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                        >
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
                  <div
                    className="modal-dialog modal-dialog-centered"
                    role="document"
                  > 
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">
                          Modification le mot de passe
                        </h5>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                        >
                          <span>×</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <InputForm>Nouveau mot de passe</InputForm>
                        <InputForm>Resaisiez le mot de passe</InputForm>
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
    </>
  );
}

export default RightNav;
