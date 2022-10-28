import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import {
  intializeRavitaillement,
  intializeRavitaillementDetails,
} from "../../../atoms/ravitaillement";
import {
  convertToOption,
  filterOption,
  getData,
  InputForm,
  onChange,
  SelectForm,
  verifObligatory,
} from "../../../utils/utils";

function Insert() {
  const [ravitaillement, setRavitaillement] = useState(intializeRavitaillement);
  const [ravitaillementDetails, setRavitaillementDetails] = useState(
    intializeRavitaillementDetails
  );
  const [produit, setProduit] = useState({});
  const [isObRvt, setIsObRvt] = useState(false);
  const [isObRvtDt, setIsObRvtDt] = useState(false);
  const [listRavitaillementDetails, setListRavitaillementDetails] = useState(
    []
  );
  const [OptionsProduit, setOptionsProduit] = useState([]);
  const [OptionsMode_expedition, setOptionsMode_expedition] = useState([]);
  const [OptionsFournisseur, setOptionsFournisseur] = useState([]);
  const {
    motif,
    etat_ravitaillement,
    date_prev_livraison,
    tva,
    caisse_id,
    fournisseur_id,
    mode_expedition_id,
  } = ravitaillement;
  const {
    prix_unit,
    produit_code_lot_produit,
    nom_produit,
    prix_ht,
    quantite_demande,
    unite_achat,
  } = ravitaillementDetails;

  const addItemInList = () => {
    let item = {
      ...ravitaillementDetails,
      produit_code_lot_produit: produit.code_lot_produit,
      nom_produit: produit.nom_produit,
      prix_ht: quantite_demande * prix_unit,
      unite_achat: produit.unite_stock,
      montant_ht: quantite_demande * prix_unit,
    };
    console.log(item);
    if (verifObligatory(item) && tva) return;
    let list = listRavitaillementDetails;
    let verif = false;
    Object.entries(list).forEach(([key, value]) => {
      if (value.produit_code_lot_produit === produit.code_lot_produit) verif = true;
    });
    if (verif) {
      toast.warning('Cette produit existe déjà dans la liste; veuillez seulement modifié votre commande dans cette dernière ?')
      return;
    }
    setListRavitaillementDetails(list);
    list.push(item);
  };

  useEffect(() => {
    getData("fournisseur", (data) =>
      convertToOption(data, setOptionsFournisseur)
    );
    getData("Produit", (data) => {
      console.log("Produit", data);
      setProduit(data[0]);
      convertToOption(
        data,
        setOptionsProduit,
        "nom_produit",
        "code_lot_produit"
      );
    });
    getData("Mode_expedition", (data) =>
      convertToOption(data, setOptionsMode_expedition)
    );
  }, []);

  return (
    <div className="card m-auto">
      <div className="card-body">
        <div className="row mb-4">
          <div className="col-6">
            <InputForm
              textarea
              rows="2"
              name="motif"
              val={motif}
              onChange={(e) => onChange(e, setRavitaillement)}
              obligatory={isObRvt ? "active" : ""}
            >
              Motif
            </InputForm>
            <div className="row">
              <div className="col-6">
                <SelectForm
                  val={fournisseur_id}
                  value={filterOption(OptionsFournisseur, fournisseur_id)}
                  options={OptionsFournisseur}
                  onChange={(e) => onChange(e, setRavitaillement)}
                  obligatory={isObRvt ? "active" : ""}
                >
                  Fournisseur
                </SelectForm>
              </div>
              <div className="col-6">
                <SelectForm
                  val={mode_expedition_id}
                  value={filterOption(
                    OptionsMode_expedition,
                    mode_expedition_id
                  )}
                  options={OptionsMode_expedition}
                  onChange={(e) => onChange(e, setRavitaillement)}
                  obligatory={isObRvt ? "active" : ""}
                >
                  Mode d'expedition
                </SelectForm>
              </div>
            </div>
            <div className="row">
              <div className="col-8">
                <InputForm
                  date
                  name="date_prev_livraison"
                  val={date_prev_livraison}
                  onChange={(e) => onChange(e, setRavitaillement)}
                  obligatory={isObRvt ? "active" : ""}
                >
                  Date prévue pour la livraison
                </InputForm>
                {/* <label className="font-w600" htmlFor="datepicker">
                  Date prévue pour la livraison
                </label>
                <input
                  name="datepicker"
                  className="datepicker-default form-control picker__input"
                  id="datepicker"
                  readOnly
                  aria-haspopup="true"
                  aria-expanded="false"
                  aria-readonly="false"
                  aria-owns="datepicker_root"
                />*/}
              </div>
              <div className="col-4">
                <InputForm
                  integer
                  postIcon={{ text: "%" }}
                  name="tva"
                  val={tva}
                  onChange={(e) => onChange(e, setRavitaillementDetails)}
                  obligatory={isObRvtDt ? "active" : ""}
                >
                  TVA
                </InputForm>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="shadow-sm p-4">
              <div className="row">
                <div className="col-7">
                  <SelectForm
                    val={produit_code_lot_produit}
                    value={filterOption(
                      OptionsProduit,
                      produit_code_lot_produit
                    )}
                    options={OptionsProduit}
                    onChange={(e) => {
                      onChange(e, setRavitaillementDetails);
                      if (e.value)
                        getData(
                          "produit",
                          (data) => setProduit(data[0]),
                          e.value
                        );
                    }}
                    obligatory={isObRvtDt ? "active" : ""}
                  >
                    Produit
                  </SelectForm>
                </div>
                <div className="col-5">
                  <InputForm
                    postIcon={{ text: "Ar" }}
                    integer
                    name="prix_unit"
                    val={prix_unit}
                    onChange={(e) => onChange(e, setRavitaillementDetails)}
                    obligatory={isObRvtDt ? "active" : ""}
                  >
                    Prix unitaire
                  </InputForm>
                </div>
              </div>
              <div className="row">
                <div className="col-4">
                  <InputForm
                    integer
                    name="quantite_demande"
                    val={quantite_demande}
                    onChange={(e) => onChange(e, setRavitaillementDetails)}
                    obligatory={isObRvtDt ? "active" : ""}
                  >
                    Qte demandé
                  </InputForm>
                </div>
                <div className="col-4">
                  <label className="font-w600">Unité stock</label>
                  <span
                    className="badge badge-warning light"
                    style={{ padding: "1.75vh", marginTop: "-0.35vh" }}
                  >
                    {produit.nom_stock}
                  </span>
                </div>
                <div className="col-4">
                  <button
                    className="btn btn-outline-warning w-100"
                    style={{ marginTop: "4.25vh" }}
                    onClick={addItemInList}
                  >
                    <i className="fa fa-market"></i> Ajouter
                  </button>
                </div>
              </div>
              <p className="mt-3 text-center mb-0">
                {prix_unit && quantite_demande ? (
                  <>
                    Prix HT : <b>{prix_unit * quantite_demande} Ar</b>{" "}
                    &nbsp;&nbsp;&nbsp; & &nbsp;&nbsp;&nbsp;
                  </>
                ) : null}
                {prix_unit && quantite_demande && tva ? (
                  <>
                    Prix TCC :{" "}
                    <b>{prix_unit * quantite_demande * (1 + tva / 100)} Ar</b>
                  </>
                ) : null}
              </p>
            </div>
          </div>
        </div>
        <hr />
        <div className="mt-4">
          <div className="table-responsive">
            <table className="table table-striped table-responsive-md">
              <thead>
                <tr>
                  <th className="center">#</th>
                  <th>Code</th>
                  <th>Produit</th>
                  <th className="right">Prix Unit</th>
                  <th className="center">Qte</th>
                  <th className="right">Total</th>
                </tr>
              </thead>
              <tbody>
                {listRavitaillementDetails.map((item) => (
                  <tr>
                    <td className="center">1</td>
                    <td className="left strong">
                      {item.produit_code_lot_produit}
                    </td>
                    <td className="left">{item.nom_produit}</td>
                    <td className="right">{item.prix_unit}</td>
                    <td className="center">{item.quantite_demande}</td>
                    <td className="right">{item.prix_ht}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="row">
            <div className="col-lg-4 col-sm-5"> </div>
            <div className="col-lg-4 col-sm-5 ml-auto">
              <table className="table table-clear">
                <tbody>
                  <tr>
                    <td className="left">
                      <strong>Subtotal</strong>
                    </td>
                    <td className="right">$8.497,00</td>
                  </tr>
                  <tr>
                    <td className="left">
                      <strong>Discount (20%)</strong>
                    </td>
                    <td className="right">$1,699,40</td>
                  </tr>
                  <tr>
                    <td className="left">
                      <strong>VAT (10%)</strong>
                    </td>
                    <td className="right">$679,76</td>
                  </tr>
                  <tr>
                    <td className="left">
                      <strong>Total</strong>
                    </td>
                    <td className="right">
                      <strong>$7.477,36</strong>
                      <br />
                      <strong>0.15050000 BTC</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="card-footer">
        <div className="row">
          <button className="btn btn-primary btn-lg w-100">Efféctuer</button>
        </div>
      </div>
    </div>
  );
}

export default Insert;
