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
  const {
    motif,
    montant_total,
    societe_prise_en_charge,
    guichet_id,
    file_societe,
  } = vente;
  const {
    quantite_vente,
    prix_stock,
    montant_vente,
    unite_vente,
    produit_code_lot_produit,
  } = venteDetails;

  const [isAdd, setIsAdd] = useRecoilState(isAddState);
  const [isObSociete, setIsObSociete] = React.useState(false);
  const [isObOrdonnance, setIsObOrdonnance] = React.useState(false);
  const [isObVtDt, setIsObVtDt] = React.useState(false);
  const [isObGuichet, setIsObGuichet] = React.useState(false);
  const [produit, setProduit] = React.useState({});
  const [societe, setSociete] = React.useState({});
  const [OptionsProduit, setOptionsProduit] = React.useState([]);
  const [OptionsSociete, setOptionsSociete] = React.useState([]);
  const [OptionsGuichet, setOptionsGuichet] = React.useState([]);
  const [file, setFile] = React.useState("");
  const [listVenteDetails, setListVenteDetails] = React.useState([]);

  const [showAccordion, setShowAccordion] = React.useState(false);
  const [toggleUniteVente, setToggleUniteVente] = React.useState(true);
  const [unites, setUnites] = React.useState([]);

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
    if (!produit_code_lot_produit.value || !quantite_vente) {
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
        ["unite_vente"]: toggleUniteVente
          ? produit.unite_stock
          : produit.unite_presentation,
      },
    ]);
  };

  const verifObSocieteAndOrdonnance = () => {
    const withOrdonnance = nom_docteur || hopital ? true : false;
    const widhtSociete = file ? true : false;
    if (!withOrdonnance) setIsObOrdonnance(false);
    else setIsObOrdonnance(true);
    if (!widhtSociete) setIsObSociete(false);
    else setIsObSociete(true);
  };

  const getNameUniteById = (id) => {
    return unites.find((a) => a.id === id).nom_unite;
  };
  const add = () => {
    setIsObGuichet(true);
    if (!guichet_id.value) return;
    const withOrdonnance = nom_docteur || hopital ? true : false;
    const widhtSociete = file ? true : false;
    if (listVenteDetails.length <= 0) {
      toast.warning("Ajouter au moins une commande!");
      return;
    }
    verifObSocieteAndOrdonnance();
    if (withOrdonnance) if (verifObligatory(ordonnance)) return;
    if (widhtSociete) if ( !societe_id.value || !societe_prise_en_charge) return;
    setVente({
      ...vente,
      montant_total: listVenteDetails.reduce(
        (acc, item) => (acc += parseFloat(item.montant_vente)),
        0
      ),
      date_saisi: getDateNow(),
      unite_vente: toggleUniteVente
        ? produit.unite_stock
        : produit.unite_presentation,
    });
    const dataSendVente = {
      ...vente,
      ["societe_id"]: societe_id.value ? societe_id.value : null,
      montant_total: listVenteDetails.reduce(
        (acc, item) => (acc += parseFloat(item.montant_vente)),
        0
      ),
      date_saisi: getDateNow(),
      ["guichet_id"]: guichet_id.value,
      unite_vente: toggleUniteVente
        ? produit.unite_stock
        : produit.unite_presentation,
    };
    addData(
      "vente/guichet",
      JsonToFormData(
        { vente: dataSendVente, listVenteDetails, client, ordonnance },
        file,
        "file_societe"
      ),
      () => {
        initialize();
        setIsAdd("0");
      },
      true
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
        societe_prise_en_charge: societe.prise_en_charge,
      }));
    }
  }, [societe]);
  const calPrisEnCharge = () => {
    if (!societe_prise_en_charge) return; 
    setVenteDetails((prev) => ({
      ...prev,
      prix_stock: Math.round(
        produit.prix_stock * (1 - parseFloat(societe_prise_en_charge) / 100)
      ),
    })); 
  };
  const calPrisEnChargeList = () => {
    if (!societe_prise_en_charge) return; 
    let list = [...listVenteDetails];
    list.map((item) => {
      item.prix_stock = Math.round(
        item.prix_stock * (1 - parseFloat(societe_prise_en_charge) / 100)
      );
      item.montant_vente = Math.round(
        parseFloat(item.prix_stock) * parseFloat(item.quantite_vente)
      );
    });
    setListVenteDetails(list);
  };
  React.useEffect(() => {
    calPrisEnCharge();
  }, [societe_prise_en_charge, prix_stock, quantite_vente]);
  React.useEffect(() => {
    setListVenteDetails([])
  }, [societe_prise_en_charge]);
  React.useEffect(() => {
    getData("produitEtalage", (data) => {
      convertToOption(
        data,
        setOptionsProduit,
        "nom_produit",
        "code_lot_produit"
      );
    });
    getData("societeActive", (data) => {
      convertToOption(data, setOptionsSociete);
    });
    getData("guichet", (data) => {
      convertToOption(data, setOptionsGuichet);
    });
    getData("unite", setUnites);
  }, []);
  React.useEffect(() => {
    if (produit.emplacement) {
      if (toggleUniteVente)
        setVenteDetails({
          ...venteDetails,
          quantite_vente: getEmplacement(produit.emplacement)[0]
            .quantite_produit,
        });
      else
        setVenteDetails({
          ...venteDetails,
          quantite_vente: quantite_vente * produit.presentation_quantite,
        });
    }
  }, [toggleUniteVente]);
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
                    double
                    postIcon={{ text: "%" }}
                    name="societe_prise_en_charge"
                    val={societe_prise_en_charge}
                    onChange={(e) => {
                      onChange(e, setVente);
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
                    val={file_societe}
                    onChange={(e) => {
                      verifObSocieteAndOrdonnance();
                      if (e.target.files.length > 0) {
                        setFile(e.target.files[0]);
                        console.log("file", file);
                      }
                    }}
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
        <div className="col-3">
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
        <div className="col-2">
          <span className="font-w600 mb-1 w-100">Vendre par</span>
          <br />
          <span
            style={{ height: "41px", paddingTop: "2.5px", cursor: "pointer" }}
            className="badge badge-xl light badge-dark mt-1 w-100"
            onClick={() => {
              if (produit) setToggleUniteVente(!toggleUniteVente);
            }}
          >
            {!toggleUniteVente
              ? produit.unite_stock
                ? getNameUniteById(produit.unite_stock)
                : "Stock"
              : produit.unite_presentation
              ? getNameUniteById(produit.unite_presentation)
              : "Présentation"}
          </span>
        </div>
        <div className="col">
          <InputForm
            postIcon={{ text: "Ar" }}
            number
            name="prix_stock"
            val={prix_stock}
            onChange={(e) => onChange(e, setVenteDetails)}
            // obligatory={isObVtDt ? "active" : ""}
          >
            Prix Unit.
          </InputForm>
        </div>
        <div className="col">
          <InputForm
            double
            mini={0}
            maxi={
              produit.emplacement
                ? toggleUniteVente
                  ? getEmplacement(produit.emplacement)[0].quantite_produit
                  : getEmplacement(produit.emplacement)[0].quantite_produit *
                    produit.presentation_quantite
                : "0"
            }
            postIcon={{
              text: toggleUniteVente
                ? produit.unite_stock
                  ? getNameUniteById(produit.unite_stock)
                  : "Stock"
                : produit.unite_presentation
                ? getNameUniteById(produit.unite_presentation)
                : "Présentation",
            }}
            name="quantite_vente"
            val={quantite_vente}
            onChange={(e) => onChange(e, setVenteDetails)}
            obligatory={isObVtDt ? "active" : ""}
          >
            Quantité
          </InputForm>
        </div>
        <div className="col-2">
          <span className="font-w600 mb-1 w-100">Montant</span>
          <br />
          <span
            style={{ height: "41px", paddingTop: "2.5px" }}
            className="badge badge-xl light badge-warning mt-1 w-100"
          >
            {numberWithCommas(prix_stock * quantite_vente) + " Ar"}
          </span>
        </div>
      </div>
      <div className="row mt-1">
        <div className="col mt-1">
          <SelectForm
            val={guichet_id}
            defaultValue={
              OptionsGuichet[0]
                ? OptionsGuichet[0]
                : { label: "Choisissez un guichet", value: "0" }
            }
            value={filterOption(OptionsGuichet, guichet_id)}
            options={OptionsGuichet}
            onChange={(e) => {
              onChange(e, setVente, "guichet_id");
            }}
            obligatory={isObGuichet ? "active" : ""}
          />
        </div>
        <div className="col-8 align-items-center">
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
                        {`${numberWithCommas(
                          item.quantite_vente
                        )} (${getNameUniteById(item.unite_vente)}) `}
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
                      ) + " Ar"}
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
