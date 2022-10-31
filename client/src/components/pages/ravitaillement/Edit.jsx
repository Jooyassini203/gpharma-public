import React, { useEffect, useState } from "react";
import { faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import {
  ravitaillementSelect,
  toggleAddTableEdit,
} from "../../../atoms/ravitaillement";
import {
  addData,
  ButtonTable,
  confirmDelete,
  convertToOption,
  filterOption,
  getData,
  getUrl,
  InputForm,
  onChange,
  SelectForm,
  verifObligatory,
} from "../../../utils/utils";
import { getDateNow } from "../../../utils/utils";
import { userConnected } from "../../../atoms/authentication";

function Edit() {
  const [toggle, setToggle] = useRecoilState(toggleAddTableEdit);
  const [rvtSelect, setRvtSelect] = useRecoilState(ravitaillementSelect);
  const [ravitaillement, setRavitaillement] = useState({});
  const [listRavitaillementDetails, setListRavitaillementDetails] = useState(
    []
  );

  const {
    motif,
    tva,
    date_saisi,
    date_prev_livraison,
    fournisseur,
    mode_expedition,
    utilisateur,
  } = ravitaillement;

  const getTotalsHT = () => {
    if (listRavitaillementDetails.length > 0) {
      let total = 0;
      listRavitaillementDetails.forEach((item) => {
        total += item.montant_ht;
      });
      return total;
    }
  };

  const getTotalsTVA = () => {
    if (listRavitaillementDetails.length > 0) {
      let total = 0;
      listRavitaillementDetails.forEach((item) => {
        total += item.montant_ht * (tva / 100);
      });
      return total;
    }
  };

  const getTotalsTTC = () => {
    if (listRavitaillementDetails.length > 0) {
      let total = 0;
      listRavitaillementDetails.forEach((item) => {
        total += item.montant_ht;
      });
      return total * (1 + tva / 100);
    }
  };

  useEffect(() => {
    getData(
      "ravitaillement",
      (data) => {
        console.log(data);
        setRavitaillement(data[0]);
        setListRavitaillementDetails(data[1]);
      },
      rvtSelect.id
    );
  }, []);

  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="card">
          <div className="card-header">
            {" "}
            Date de saisie
            <strong>{date_saisi}</strong>
            <span className="float-right">
              <strong>Etat:</strong> COMMANDE
            </span>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-4 mb-4">
                <h6>Entêt:</h6>
                <div>
                  {" "}
                  <strong>Motif : </strong> <span>{motif}</span>
                </div>
                <div>
                  {" "}
                  <strong>Date prévue pour la livraison : </strong>
                  <br />
                  <span>{date_prev_livraison}</span>
                </div>
                <div>
                  {" "}
                  <strong>TVA : </strong> <span>{tva}</span>
                </div>
              </div>
              <div className="col-4 mb-4">
                <h6>Fournisseur:</h6>
                <div>
                  {" "}
                  <strong>Nom : </strong>{" "}
                  <span>{fournisseur.nom_fournisseur}</span>
                </div>
                <div>
                  {" "}
                  <strong>Contact sécrétaire : </strong>{" "}
                  <span>{fournisseur.contact_secretaire}</span>
                </div>
                <div>
                  <strong>Email : </strong>
                  <br /> <span>{fournisseur.email}</span>
                </div>
                <div>
                  <strong>Adresse : </strong>
                  <br /> <span>{fournisseur.adresse}</span>
                </div>
              </div>
              <div className="col-4 mb-4 ">
                <div className="row align-items-center">
                  <div className="col-sm-12">
                    <div className="brand-logo mb-3">
                      <img
                        style={{ height: "10vh" }}
                        className="img-fluid "
                        src={
                          utilisateur.image
                            ? getUrl("images/utilisateur", utilisateur.image)
                            : "images/users/1.jpg"
                        }
                        alt="Image"
                      />
                    </div>
                    <div>
                      Effectuer par :{" "}
                      <strong className="d-block">
                        {utilisateur.nom_utilisateur}
                      </strong>
                    </div>
                    <div>
                      Contact :{" "}
                      <strong className="d-block">{utilisateur.contact}</strong>
                    </div>
                    {/* <div>
                      Email :{" "}
                      <strong className="d-block">{utilisateur.email}</strong> 
                    </div>  */}
                  </div>
                </div>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table table-striped table-responsive-md">
                <thead>
                  <tr>
                    <th className="center">#</th>
                    <th>Code</th>
                    <th>Produit</th>
                    <th className="right">Prix Unit</th>
                    <th className="center">Qte</th>
                    <th className="right">Montant HT</th>
                  </tr>
                </thead>
                <tbody>
                  {listRavitaillementDetails.length > 0
                    ? listRavitaillementDetails.map((item) => (
                        <tr key={item.code_lot_produit + item.nom_produit}>
                          <td className="center">1</td>
                          <td className="left strong">
                            {item.produit_code_lot_produit}
                          </td>
                          <td className="left">{item.nom_produit}</td>
                          <td className="right">{item.prix_unit}</td>
                          <td className="center">{item.quantite_demande}</td>
                          <td className="right">{item.montant_ht}</td>
                        </tr>
                      ))
                    : null}
                </tbody>
              </table>
            </div>
            {listRavitaillementDetails.length > 0 ? (
              <div className="row">
                <div className="col-lg-4 col-sm-5"> </div>
                <div className="col-lg-4 col-sm-5 ml-auto">
                  <table className="table table-clear">
                    <tbody>
                      <tr>
                        <td className="left">
                          <strong>Totals HT</strong>
                        </td>
                        <td className="right">{getTotalsHT()}</td>
                      </tr>
                      <tr>
                        <td className="left">
                          <strong>TVA ({tva}%)</strong>
                        </td>
                        <td className="right">{getTotalsTVA()}</td>
                      </tr>
                      <tr>
                        <td className="left">
                          <strong>Totals TTC</strong>
                        </td>
                        <td className="right">
                          <strong>{getTotalsTTC()}</strong>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ) : null}
          </div>
          <div className="card-footer">
            <div className="row m-auto">
              <div className="col-4">
                <button className="btn btn-danger btn-lg w-100 light ">
                  Annuler
                </button>
              </div>
              <div className="col-8">
                <button
                  className="btn btn-primary btn-lg w-100 mr-2"
                  data-toggle="modal"
                  data-target="#modalViewProduit"
                >
                  Livrer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Edit;
