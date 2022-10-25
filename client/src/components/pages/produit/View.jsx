import React from "react";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { produitSelect } from "../../../atoms/produit";
import { getData, getUrl } from "../../../utils/utils";

function View({ id }) {
  const [produit, setProduit] = useRecoilState(produitSelect);
  return (
    <>
      {" "}
      <div
        className="modal fade"
        id="modalViewProduit"
        style={{ display: "none" }}
        aria-modal="true"
        data-backdrop="static"
        data-keyboard="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                Information sur { produit.nom_produit }
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
              <div className="card-body">
                <div className="row">
                  <div className="col-xl-3 col-lg-6  col-md-6 col-xxl-5 ">
                    {/* Tab panes */}
                    <div className="tab-content">
                      <div
                        role="tabpanel"
                        className="tab-pane fade show active"
                        id="first"
                      >
                        <img
                          className="img-fluid"
                          src="images/product/1.jpg"
                          alt
                        />
                        
                        <p className="text-content mt-3">
                          {produit.classification_produit}
                        </p>
                      </div> 
                    </div> 
                  </div>
                  {/*Tab slider End*/}
                  <div className="col-xl-9 col-lg-6  col-md-6 col-xxl-7 col-sm-12">
                    <div className="product-detail-content">
                      {/*Product details*/}
                      <div className="new-arrival-content pr">
                        <h4>{produit.nom_produit}</h4>
                        <div className="comment-review star-rating">
                          <ul>
                            <li>
                              <i className="fa fa-star" />
                            </li>
                            <li>
                              <i className="fa fa-star" />
                            </li>
                            <li>
                              <i className="fa fa-star" />
                            </li>
                            <li>
                              <i className="fa fa-star-half-empty" />
                            </li>
                            <li>
                              <i className="fa fa-star-half-empty" />
                            </li>
                          </ul>
                          <span className="review-text">(34 vente(s)) / </span>
                          <a
                            className="product-review"
                            href
                            data-toggle="modal"
                            data-target="#reviewModal"
                          >
                            Voir les détails de ses ventes?
                          </a>
                        </div>
                        <div className="d-table mb-2">
                          <p className="price float-left d-block">
                            {produit.prix_vente} Ar
                          </p>
                        </div>
                        <p>
                          Code lot produit:
                          <span className="item">
                            {produit.code_lot_produit}
                          </span>{" "}
                        </p>
                        <p>
                          Dernière date de ravitaillement:
                          <span className="item">
                            {produit.date_der_ravitaillement}
                          </span>{" "}
                        </p>
                        <p>
                          Etaté :
                          <span className="item">
                            Oui{" "}
                            <span className="badge badge-success light">
                              15
                            </span>
                          </span>
                        </p>
                        <p>
                          Paramete produit:&nbsp;&nbsp;
                          <span className="badge badge-danger light">
                            Stock min : {produit.stock_min}
                          </span>
                          <span className="badge badge-success light">
                            Stock max : {produit.stock_max}
                          </span>
                        </p>
                        <p>
                          Statut:&nbsp;&nbsp;
                          <span
                            className={
                              produit.status == "1"
                                ? "badge light badge-success"
                                : "badge light badge-danger"
                            }
                          >
                            <i
                              className={
                                produit.status == "1"
                                  ? "fa fa-circle text-success mr-1"
                                  : "fa fa-circle text-danger mr-1"
                              }
                            />
                            {produit.status == "1" ? "Activé" : "Désactivé"}
                          </span>
                        </p>

                        <div className="row mt-3">
                          <div className="col-6">
                            <h5 className="tex-dark mb-3">Détails</h5>
                            <div className="d-flex align-items-center mr-auto pr-2">
                              <div>
                                <p className="mb-sm-2 mb-1 text-black">
                                  Fabricant{" "}
                                  <span className="fs-14 text-primary font-w600">
                                    {produit.nom_fabricant}
                                  </span>
                                  ,
                                </p>
                                <p className="mb-sm-2 mb-1 text-black">
                                  Famille{" "}
                                  <span className="fs-14 text-secondary font-w600">
                                    {produit.nom_famille}
                                  </span>
                                  ,
                                </p>
                                <p className="mb-sm-2 mb-1 text-black">
                                  Forme{" "}
                                  <span className="fs-14 text-warning font-w600">
                                    {produit.nom_forme}
                                  </span>
                                  .
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-6">
                            <h5 className="tex-dark mb-3">Unités</h5>
                            <div className="d-flex align-items-center mr-auto pr-2">
                              <div>
                                <p className="mb-sm-2 mb-1 text-black">
                                  Unité d'achat :{" "}
                                  <span className="fs-14 text-primary font-w600">
                                    {produit.nom_achat}
                                  </span>
                                  ,
                                </p>
                                <p className="mb-sm-2 mb-1 text-black">
                                  Unité de vente :{" "}
                                  <span className="fs-14 text-secondary font-w600">
                                    {produit.nom_vente}
                                  </span>
                                  ,
                                </p>
                                <p className="mb-sm-2 mb-1 text-black">
                                  Unité de stock :{" "}
                                  <span className="fs-14 text-warning font-w600">
                                    {produit.nom_stock}
                                  </span>
                                  .
                                </p>
                                <p className="mb-sm-2 mb-1 text-black">
                                  Presentation :{" "}
                                  <span className="fs-14 text-primary font-w600">
                                    {produit.nom_presentation}
                                  </span>
                                  ,
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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
