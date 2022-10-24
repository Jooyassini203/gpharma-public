import React from "react";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { fournisseurSelect } from "../../../atoms/fournisseur";
import { getData } from "../../../utils/utils";

function View({ id }) {
  const [fournisseur, setFournisseur] = useRecoilState(fournisseurSelect);
  return (
    <>
      <div
        className="modal fade"
        id="modalViewFournisseur"
        style={{ display: "none" }}
        aria-modal="true"
        data-backdrop="static"
        data-keyboard="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                Information sur {fournisseur.nom_fournisseur}
              </h5>
              <button
                // ref={closeRef}
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
                <div className="col-5">
                  <div className="">
                    <img
                      src={"images/profile/1.jpg"}
                      width={"40vh"}
                      alt="Image"
                      className="img-fluid mt-2 mb-4 w-100"
                    />
                    {/* <img
                      src={"images/profile/1.jpg"}
                      width={"50vh"}
                      alt="Image"
                      className="img-fluid mt-2 mb-4 w-100"
                    /> */}
                  </div>
                </div>
                <div className="col-7">
                  <div className="mt-1 row">
                    <p className="text-primary text-bold">
                      <span className="text-secondary">Sigle : </span>
                      {fournisseur.sigle}
                    </p>
                  </div>
                  <div className="mt-1 row">
                    <p className="text-primary text-bold">
                      <span className="text-secondary">
                        Nom du fournisseur :{" "}
                      </span>
                      {fournisseur.nom_fournisseur}
                    </p>
                    <p className="text-primary text-bold">
                      <span className="text-secondary">
                        Contact fournisseur :{" "}
                      </span>
                      {fournisseur.contact_fournisseur}
                    </p>
                    <p className="text-primary text-bold">
                      <span className="text-secondary">
                        Contact secrétaire :{" "}
                      </span>
                      {fournisseur.contact_secretaire}
                    </p>
                    <p className="text-primary text-bold">
                      <span className="text-secondary">
                        Plan comptable général :{" "}
                      </span>
                      {fournisseur.compte__PCG}
                    </p>
                    <p className="text-primary text-bold">
                      <span className="text-secondary">Email : </span>
                      {fournisseur.email}
                    </p>
                    <p className="text-primary text-bold">
                      <span className="text-secondary">Adresse : </span>
                      {fournisseur.adresse}
                    </p>
                    <p className="text-primary text-bold">
                      <span className="text-secondary">Nif : </span>
                      {fournisseur.nif}
                    </p>
                    <p className="text-primary text-bold">
                      <span className="text-secondary">Stat : </span>
                      {fournisseur.stat}
                    </p>
                    <p className="text-primary text-bold">
                      <span className="text-secondary">
                        Délais de paiement :{" "}
                      </span>
                      {fournisseur.delais_paiement}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default View;
