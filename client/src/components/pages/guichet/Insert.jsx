import React from "react";
import {
  addData,
  ButtonTable,
  confirmDelete,
  convertToOption,
  filterOption,
  getData,
  InputForm,
  onChange,
  SelectForm,
  getDateNow,
  verifObligatory,
} from "../../../utils/utils";
import {
  isAddState,
  intializeClient,
  intializeOrdonnance,
  intializeVente,
  intializeVenteDetails,
} from "../../../atoms/guichet";
import { useRecoilState } from "recoil";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
function Insert() {
  const [client, setClient] = React.useState(intializeClient);
  const [ordonnance, setOrdonnance] = React.useState(intializeOrdonnance);
  const [vente, setVente] = React.useState(intializeVente);
  const [venteDetails, setVenteDetails] = React.useState(intializeVenteDetails);
  const { nom_prenom, adresse, societe_id } = client;
  const { nom_docteur, hopital } = ordonnance;
  const {
    motif,
    montant_total,
    date_vente,
    etat_vente,
    file_societe,
    societe_prise_en_charge,
  } = vente;
  const {
    quantite_vente,
    prix_stock,
    montant_vente,
    produit_code_lot_produit,
  } = venteDetails;

  const [isAdd, setIsAdd] = useRecoilState(isAddState);
  const [isObVtDt, setIsObVtDt] = React.useState(false);
  const [produit, setProduit] = React.useState({});
  const [societe, setSociete] = React.useState({});
  const [OptionsProduit, setOptionsProduit] = React.useState([]);
  const [OptionsSociete, setOptionsSociete] = React.useState([]);
  const [listVenteDetails, setListVenteDetails] = React.useState([]);

  const [showAccordion, setShowAccordion] = React.useState(false);

  const addItemInList = () => {};

  React.useEffect(() => {
    if (produit) {
      setVenteDetails((prev) => ({
        ...prev,
        prix_stock: produit.prix_stock,
        quantite_vente: produit.quantite_produit,
      }));
    }
  }, [produit]);
  React.useEffect(() => {
    if (societe) {
      setVente((prev) => ({
        ...prev,
        prix_stock: societe.prise_en_charge,
      }));
    }
  }, [societe]);
  React.useEffect(() => {
    getData("produitEtale", (data) => {
      convertToOption(
        data,
        setOptionsProduit,
        "nom_produit",
        "code_lot_produit"
      );
    });
    getData("societe", (data) => {
      convertToOption(data, OptionsSociete);
    });
  }, []);
  return (
    <>
      <div
        id="accordion-three"
        className="accordion accordion-no-gutter accordion-header-bg"
      >
        <div className="accordion__item">
          <div
            className={
              showAccordion
                ? "accordion__header bg-dark"
                : "accordion__header collapsed"
            }
            onClick={() => {
              setShowAccordion(!showAccordion);
            }}
            aria-expanded="false"
          >
            <span className="accordion__header--text">
              Faire une vente détailés.
            </span>
            <span className="accordion__header--indicator"></span>
          </div>
          <div
            id="no-gutter_collapseOne"
            className={
              showAccordion
                ? "accordion__body collapse show"
                : "accordion__body collapse"
            }
            data-parent="#accordion-three"
          >
            <div
              className={
                showAccordion
                  ? "accordion__body--text mt-2 bg-light"
                  : "accordion__body--text mt-2"
              }
              style={{ borderRadius: "2vw" }}
            >
              <InputForm
                name="motif"
                val={motif}
                onChange={(e) => onChange(e, setVente)}
                obligatory={false ? "active" : ""}
              >
                Motif de vente
              </InputForm>
              {/* <div className="row">Client</div> */}
              <div className="row">
                <div className="col-7">
                  <InputForm
                    name="nom_prenom"
                    val={nom_prenom}
                    onChange={(e) => onChange(e, setVente)}
                    obligatory={false ? "active" : ""}
                  >
                    Client
                  </InputForm>
                </div>
                <div className="col">
                  <InputForm
                    name="adresse"
                    val={adresse}
                    onChange={(e) => onChange(e, setVente)}
                    obligatory={false ? "active" : ""}
                  >
                    Adresse client
                  </InputForm>
                </div>
              </div>
              {/* <div className="row">Ordonnance</div> */}
              <div className="row">
                <div className="col-7">
                  <InputForm
                    name="nom_docteur"
                    val={nom_docteur}
                    onChange={(e) => onChange(e, setOrdonnance)}
                    obligatory={false ? "active" : ""}
                  >
                    Docteur
                  </InputForm>
                </div>
                <div className="col">
                  <InputForm
                    name="hopital"
                    val={hopital}
                    onChange={(e) => onChange(e, setOrdonnance)}
                    obligatory={false ? "active" : ""}
                  >
                    Hopital
                  </InputForm>
                </div>
              </div>
              {/* <div className="row">Société</div> */}
              <div className="row">
                <div className="col-4">
                  <SelectForm
                    val={societe_id}
                    value={filterOption(OptionsSociete, societe_id)}
                    options={OptionsSociete}
                    onChange={(e) => {
                      onChange(e, setVente, "societe_id");
                      if (e.value)
                        getData("societe", (data) => setSociete(data), e.value);
                    }}
                    obligatory={false ? "active" : ""}
                  >
                    Société
                  </SelectForm>
                </div>
                <div className="col">
                  <InputForm
                    postIcon={{ text: "%" }}
                    name="societe_prise_en_charge"
                    val={societe_prise_en_charge}
                    onChange={(e) => {
                      onChange(e, setVenteDetails);
                    }}
                    obligatory={false ? "active" : ""}
                  >
                    Taux prise en charge
                  </InputForm>
                </div>
                <div className="col">
                  <InputForm
                    file
                    name="file_societe"
                    val={file_societe}
                    onChange={(e) => onChange(e, setVente)}
                    obligatory={false ? "active" : ""}
                  >
                    Ficher Société
                  </InputForm>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="my-4" />
      <div className="row">
        <div className="col-4">
          <SelectForm
            val={produit_code_lot_produit}
            value={filterOption(OptionsProduit, produit_code_lot_produit)}
            options={OptionsProduit}
            onChange={(e) => {
              onChange(e, setVenteDetails, "produit_code_lot_produit");
              if (e.value)
                getData("produitEtale", (data) => setProduit(data[0]), e.value);
            }}
            obligatory={isObVtDt ? "active" : ""}
          >
            Produit
          </SelectForm>
        </div>
        <div className="col">
          <InputForm
            postIcon={{ text: "Ar" }}
            number
            name="prix_stock"
            val={prix_stock}
            onChange={(e) => onChange(e, setVenteDetails)}
            obligatory={isObVtDt ? "active" : ""}
          >
            Prix Unit.
          </InputForm>
        </div>
        <div className="col">
          <InputForm
            number
            name="quantite_vente"
            val={quantite_vente}
            onChange={(e) => onChange(e, setVenteDetails)}
            obligatory={isObVtDt ? "active" : ""}
          >
            Quantité
          </InputForm>
        </div>
        <div className="col">
          <span className="font-w600 mt-1 w-100">Montant</span>
          <br />
          <span className="badge light badge-warning">
            {montant_vente + " Ar"}
          </span>
        </div>
        <div className="col mt-4 align-items-center">
          <ButtonTable
            importance="success mt-2 w-100"
            handleClick={addItemInList}
          >
            Valider
          </ButtonTable>
        </div>
      </div>
      <hr className="my-4" />
      <div className="mt-4">
        <div className="table-responsive">
          <table className="table table-striped table-responsive-md">
            <thead>
              <tr>
                <th className="center">#</th>
                <th>#Code</th>
                <th>Produit</th>
                <th className="right">Prix Unit</th>
                <th className="center">Qte</th>
                <th className="right">Montant HT</th>
                <th style={{ widht: "100px" }} className="center">
                  Option
                </th>
              </tr>
            </thead>
            <tbody>
              {listVenteDetails.map((item) => (
                <tr key={item.code_lot_produit + item.nom_produit}>
                  <td className="center">1</td>
                  <td className="left strong">
                    {item.produit_code_lot_produit}
                  </td>
                  <td className="left">{item.nom_produit}</td>
                  <td className="right">{item.prix_unit}</td>
                  <td className="center">{item.quantite_demande}</td>
                  <td className="right">{item.montant_ht}</td>
                  <th className="center">
                    <ButtonTable
                      importance="warning"
                      icon={faEdit}
                      handleClick={() => {
                        // setRavitaillementDetails({
                        //   prix_unit: item.prix_unit,
                        //   produit_code_lot_produit: {
                        //     label: item.nom_produit,
                        //     value: item.produit_code_lot_produit,
                        //   },
                        //   nom_produit: item.nom_produit,
                        //   prix_ht: item.prix_ht,
                        //   montant_ht: item.montant_ht,
                        //   quantite_demande: item.quantite_demande,
                        //   unite_achat: item.unite_achat,
                        // });
                        // console.log(
                        //   "ravitaillementDetails",
                        //   ravitaillementDetails
                        // );
                        // setListVenteDetails([
                        //   ...listVenteDetails.slice(
                        //     0,
                        //     listVenteDetails.indexOf(item)
                        //   ),
                        //   ...listVenteDetails.slice(
                        //     listVenteDetails.indexOf(item) + 1
                        //   ),
                        // ]);
                      }}
                    />
                    <ButtonTable
                      importance="danger"
                      icon={faTrash}
                      handleClick={() => {
                        confirmDelete(
                          "Retirer cette élément de la liste des commandes ?",
                          () => {
                            setListVenteDetails([
                              ...listVenteDetails.slice(
                                0,
                                listVenteDetails.indexOf(item)
                              ),
                              ...listVenteDetails.slice(
                                listVenteDetails.indexOf(item) + 1
                              ),
                            ]);
                          }
                        );
                      }}
                    />
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {listVenteDetails.length > 0 ? (
          <div className="row">
            <div className="col-lg-4 col-sm-5"> </div>
            <div className="col-lg-4 col-sm-5 ml-auto">
              <table className="table table-clear">
                {/* <tbody>
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
                    </tbody> */}
              </table>
            </div>
          </div>
        ) : null}
      </div>
      <div className="">
        <div className="row">
          <div className="col-4">
            <button
              className="btn btn-danger light btn-lg w-100 "
              onClick={() => {}}
            >
              Annuler
            </button>
          </div>
          <div className="col-8">
            <button
              className="btn btn-success light btn-lg w-100 mr-1"
              onClick={() => {}}
            >
              Efféctuer
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Insert;
