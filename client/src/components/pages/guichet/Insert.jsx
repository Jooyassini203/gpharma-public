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
  getEmplacement,
  numberWithCommas,
  JsonToFormData,
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
import { toast } from "react-toastify";
function Insert() {
  const [client, setClient] = React.useState(intializeClient);
  const [ordonnance, setOrdonnance] = React.useState(intializeOrdonnance);
  const [vente, setVente] = React.useState(intializeVente);
  const [venteDetails, setVenteDetails] = React.useState(intializeVenteDetails);
  const { nom_prenom, adresse, societe_id } = client;
  const { nom_docteur, hopital } = ordonnance;
  const { motif, montant_total, societe_prise_en_charge } = vente;
  const {
    quantite_vente,
    prix_stock,
    montant_vente,
    produit_code_lot_produit,
  } = venteDetails;

  const [isAdd, setIsAdd] = useRecoilState(isAddState);
  const [isObSociete, setIsObSociete] = React.useState(false);
  const [isObOrdonnance, setIsObOrdonnance] = React.useState(false);
  const [isObVtDt, setIsObVtDt] = React.useState(false);
  const [produit, setProduit] = React.useState({});
  const [societe, setSociete] = React.useState({});
  const [OptionsProduit, setOptionsProduit] = React.useState([]);
  const [file, setFile] = React.useState();
  const [OptionsSociete, setOptionsSociete] = React.useState([]);
  const [listVenteDetails, setListVenteDetails] = React.useState([]);

  const [showAccordion, setShowAccordion] = React.useState(false);

  const initialize = () => {
    setClient(intializeClient);
    setOrdonnance(intializeOrdonnance);
    setProduit({});
    setSociete({});
    setVente(intializeVente);
    setVenteDetails(intializeVenteDetails);
    setVenteDetails([]);
  };
  const addItemInList = () => {
    if (!produit_code_lot_produit.value || !prix_stock || !quantite_vente) {
      setIsObVtDt(true);
      return;
    }
    if (
      listVenteDetails.find(
        (a) => a.produit_code_lot_produit == produit_code_lot_produit.value
      )
    ) {
      toast.warning(
        "Cette produit existe déjà dans la liste; veuillez seulement modifié votre commande dans cette dernière !"
      );
      return;
    }
    setListVenteDetails([
      ...listVenteDetails,
      {
        ...venteDetails,
        ["produit_code_lot_produit"]: produit_code_lot_produit.value,
        ["nom_produit"]: produit.nom_produit,
        ["montant_vente"]: "" + prix_stock * quantite_vente,
      },
    ]);
  };

  const verifObSocieteAndOrdonnance = () => {
    const widhtOrdonnance = nom_docteur || hopital ? true : false;
    const widhtSociete = file ? true : false;
    if (!widhtOrdonnance) setIsObOrdonnance(false);
    else setIsObOrdonnance(true);
    if (!widhtSociete) setIsObSociete(false);
    else setIsObSociete(true);
  };

  const add = () => {
    const widhtOrdonnance = nom_docteur || hopital ? true : false;
    const widhtSociete = file ? true : false;
    if (listVenteDetails.length <= 0) {
      toast.warning("Ajouter au moins une commande!");
      return;
    }
    verifObSocieteAndOrdonnance();
    if (!widhtOrdonnance) if (verifObligatory(ordonnance)) return;
    if (widhtSociete) if (verifObligatory(societe)) return;
    setVente({
      ...vente,
      montant_total: listVenteDetails.reduce(
        (acc, item) => (acc += parseFloat(item.montant_vente)),
        0
      ),
      date_saisi: getDateNow(),
    });
    addData(
      "guichet",
      JsonToFormData(
        { vente, venteDetails: listVenteDetails },
        file,
        "file_societe"
      ),
      () => {
        initialize();
        setIsAdd("0");
      }
    );
  };

  React.useEffect(() => {
    if (produit.emplacement) {
      setVenteDetails((prev) => ({
        ...prev,
        prix_stock: produit.prix_stock,
        quantite_vente: getEmplacement(produit.emplacement)[0].quantite_produit,
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
    getData("produitEtalage", (data) => {
      convertToOption(
        data,
        setOptionsProduit,
        "nom_produit",
        "code_lot_produit"
      );
    });
    getData("societe", (data) => {
      convertToOption(data, setOptionsSociete);
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
              Faire une vente détailée.
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
                textarea
                rows="2"
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
                    onChange={(e) => {
                      onChange(e, setClient);
                    }}
                    obligatory={false ? "active" : ""}
                  >
                    Nom et prénom du Client
                  </InputForm>
                </div>
                <div className="col">
                  <InputForm
                    name="adresse"
                    val={adresse}
                    onChange={(e) => onChange(e, setClient)}
                    obligatory={false ? "active" : ""}
                  >
                    Adresse du client
                  </InputForm>
                </div>
              </div>
              {/* <div className="row">Ordonnance</div> */}
              <div className="row">
                <div className="col-7">
                  <InputForm
                    name="nom_docteur"
                    val={nom_docteur}
                    onChange={(e) => {
                      onChange(e, setOrdonnance);
                      verifObSocieteAndOrdonnance();
                    }}
                    obligatory={isObOrdonnance ? "active" : ""}
                  >
                    Nom du Docteur
                  </InputForm>
                </div>
                <div className="col">
                  <InputForm
                    name="hopital"
                    val={hopital}
                    onChange={(e) => {
                      verifObSocieteAndOrdonnance();
                      onChange(e, setOrdonnance);
                    }}
                    obligatory={isObOrdonnance ? "active" : ""}
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
                      verifObSocieteAndOrdonnance();
                      if (e.value)
                        getData("societe", (data) => setSociete(data), e.value);
                    }}
                    obligatory={isObSociete ? "active" : ""}
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
                      verifObSocieteAndOrdonnance();
                    }}
                    obligatory={isObSociete ? "active" : ""}
                  >
                    Taux prise en charge
                  </InputForm>
                </div>
                <div className="col">
                  <InputForm
                    file
                    name="file"
                    val={file}
                    onChange={(e) => {
                      verifObSocieteAndOrdonnance();
                      if (e.target.files.length > 0) {
                        console.log("e.target.files", e.target.files[0]);
                        setFile(e.target.files[0]);
                      }
                    }}
                    obligatory={isObSociete ? "active" : ""}
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
                getData("produit", (data) => setProduit(data[0]), e.value);
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
          <span className="font-w600 mb-1 w-100">Montant</span>
          <br />
          <span
            style={{ height: "41px", paddingTop: "2.5px" }}
            className="badge badge-xl light badge-warning mt-1 w-100"
          >
            {numberWithCommas(prix_stock * quantite_vente) + " Ar"}
          </span>
        </div>
        <div className="col mt-4 align-items-center">
          <ButtonTable
            style={{ height: "41px", paddingTop: "6px" }}
            importance="success mt-1 w-100"
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
                <th>Code</th>
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
              {listVenteDetails.length > 0
                ? listVenteDetails.map((item, index) => (
                    <tr key={item.produit_code_lot_produit + item.nom_produit}>
                      <td className="center">{++index}</td>
                      <td className="left strong">
                        {item.produit_code_lot_produit}
                      </td>
                      <td className="left">{item.nom_produit}</td>
                      <td className="right">
                        {numberWithCommas(item.prix_stock)}
                      </td>
                      <td className="center">
                        {numberWithCommas(item.quantite_vente)}
                      </td>
                      <td className="right">
                        {numberWithCommas(item.montant_vente)}
                      </td>
                      <th className="center">
                        <ButtonTable
                          importance="warning"
                          icon={faEdit}
                          handleClick={() => {
                            onChange(
                              {
                                label: item.nom_produit,
                                value: item.produit_code_lot_produit,
                              },
                              setVenteDetails,
                              "produit_code_lot_produit"
                            );
                            setVenteDetails({
                              prix_stock: item.prix_stock,
                              quantite_vente: item.quantite_vente,
                              montant_vente: item.montant_vente,
                            });
                            console.log(venteDetails);
                            setListVenteDetails([
                              ...listVenteDetails.slice(
                                0,
                                listVenteDetails.indexOf(item)
                              ),
                              ...listVenteDetails.slice(
                                listVenteDetails.indexOf(item) + 1
                              ),
                            ]);
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
                  ))
                : null}
            </tbody>
          </table>
        </div>
        {listVenteDetails.length > 0 ? (
          <div className="row">
            <div className="col-lg-4 col-sm-5"> </div>
            <div className="col-lg-4 col-sm-5 ml-auto">
              <table className="table table-clear">
                <tbody>
                  <tr>
                    <td className="left">
                      <strong>Totals</strong>
                    </td>
                    <td className="right">
                      {numberWithCommas(
                        listVenteDetails.reduce(
                          (acc, item) =>
                            (acc += parseFloat(item.montant_vente)),
                          0
                        )
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ) : null}
      </div>
      <div className="">
        <div className="row">
          <div className="col">
            <button
              className="btn btn-info light btn-lg w-100 "
              onClick={() => {
                setIsAdd("0");
              }}
            >
              <i className="fa fa-list-alt"></i>
            </button>
          </div>
          <div className="col-3">
            <button
              className="btn btn-danger light btn-lg w-100 "
              onClick={() => {
                initialize();
              }}
            >
              Annuler
            </button>
          </div>
          <div className="col-7">
            <button
              className="btn btn-success light btn-lg w-100 "
              onClick={add}
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
