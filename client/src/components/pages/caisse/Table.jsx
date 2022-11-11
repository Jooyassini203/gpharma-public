import {
  faEdit,
  faEye,
  faListAlt,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { userConnected } from "../../../atoms/authentication";
import { venteSelect, isAddState } from "../../../atoms/caisse";
import MyDataTable from "../../../utils/mydatatable/MyDataTable";
import {
  ButtonTable,
  confirmDelete,
  deleteData,
  getData,
  numberWithCommas,
} from "../../../utils/utils";

function Table() {
  const [userConnect, setUserConnect] = useRecoilState(userConnected);
  const [isAdd, setIsAdd] = useRecoilState(isAddState);
  const [venteSelected, setVenteSelected] = useRecoilState(venteSelect);
  const [list, setList] = useState([]);
  const columns = [
    {
      name: "#",
      selector: (row) => row.id,
      sortable: true,
      width: "12%",
    },
    {
      name: "Motif",
      selector: (row) => row.motif,
      sortable: true,
      // width: "30%",
    },
    {
      name: "Client",
      selector: (row) => row.client.nom_prenom,
      sortable: true,
    },
    {
      name: "Date de vente",
      selector: (row) => row.date_vente,
      sortable: true,
    },
    {
      name: "Montant total",
      selector: (row) =>(<>{ numberWithCommas(row.montant_total) } Ar</>),
      sortable: true,
    },
    {
      name: "Etat",
      selector: (row) => (
        <div className="text-center">
          <span
            className={
              row.etat_vente == "0"
                ? "badge light badge-warning"
                : "badge light badge-success"
            }
          >
            <i
              className={
                row.etat_vente == "0"
                  ? "fa fa-circle text-warning mr-1"
                  : "fa fa-circle text-success mr-1"
              }
            />
            {row.etat_vente == "0" ? "Commandée" : "Livrée"}
          </span>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Action",
      width: "80px",
      selector: (row) => {
        return (
          <>
            <ButtonTable
              importance={"success"}
              icon={faListAlt}
              data-toggle="modal"
              data-target="#modalViewVente"
              handleClick={() => {
                getData(
                  "vente/details",
                  (data) => {
                    setVenteSelected(data);
                    console.log(venteSelected);
                  },
                  row.id
                );
              }}
            />
            {/* <ButtonTable
              importance="danger"
              icon={faTrash}
              handleClick={() => {
                confirmDelete(
                  <>
                    Voulez-vous vraimment supprimé le guichet{" "}
                    <strong>{row.motif}</strong> ?
                  </>,
                  () => {
                    deleteData("guichet", row.id, () => {
                      getData("guichet", setList);
                    });
                  }
                );
              }}
            /> */}
          </>
        );
      },
    },
  ];
  React.useEffect(() => {
    console.log("userConnect", userConnect);
    getData("vente/myCaisse", (data) => setList(data), userConnect.id);
  }, []);
  return (
    <>
      <MyDataTable
        columns={columns}
        data={list}
        title="Liste des ventes efféctuées"
        filterClass="form-control w-100"
        actions={
          <button
            className="btn btn-sm btn-primary"
            onClick={() => {
              setIsAdd("1");
            }}
          >
            <i className="fa fa-plus mr-2"></i> Valider une vente
          </button>
        }
      />
    </>
  );
}

export default Table;
