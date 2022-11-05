import { faListAlt } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useRecoilState } from "recoil";
import { listAjustement, ajustementSelect } from "../../../atoms/ajustement";
import MyDataTable from "../../../utils/mydatatable/MyDataTable";
import { ButtonTable, getData } from "../../../utils/utils";

function Table() {
  const [list, setList] = useRecoilState(listAjustement);
  const [ajustementSelected, setAjustementSelected] =
    useRecoilState(ajustementSelect);
  const columns = [
    {
      name: "#",
      selector: (row) => row.id,
      sortable: true,
      width: "8%",
    },
    {
      name: "Motif",
      selector: (row) => row.motif,
      sortable: true,
      width: "30%",
    },
    {
      name: "Date",
      selector: (row) => row.date_ajustement,
      sortable: true,
    },
    {
      name: "Etat",
      selector: (row) =>(
        <div className="text-center">
          <span
            className={
              row.etat_vente == "COMMANDE"
                ? "badge light badge-dark"
                : "badge light badge-success"
            }
          >
            <i
              className={
                row.etat_vente == "COMMANDE"
                  ? "fa fa-circle text-dark mr-1"
                  : "fa fa-circle text-success mr-1"
              }
            />
            {row.etat_vente == "COMMANDE" ? "Commandé" : "Vendue"}
          </span>
        </div>
      ),
      sortable: true,
      width: "15%",
    },
    {
      name: "Efféctuer par",
      selector: (row) => row.utilisateur.nom_utilisateur,
      sortable: true,
    },
    {
      name: "Action",
      width: "150px",
      selector: (row) => {
        return (
          <>
            <ButtonTable
              importance="success"
              icon={faListAlt}
            data-toggle="modal"
            data-target="#modalView"
              handleClick={() => { 
              }}
            />
          </>
        );
      },
    },
  ];
  React.useEffect(() => {
    getData("societe", setList);
  }, []);
  return (
    <>
      <MyDataTable
        columns={columns}
        data={list}
        title="Liste des sociétés"
        filterClass="form-control w-100"
        actions={
          <button
            className="btn btn-sm btn-primary"
            data-toggle="modal"
            data-target="#modalSociete"
          >
            <i className="fa fa-plus mr-2"></i> Ajouter une société
          </button>
        }
      />
    </>
  );
}

export default Table;
