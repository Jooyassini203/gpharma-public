import {
  faEdit,
  faEye,
  faListAlt,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useRecoilState } from "recoil";
import {
  listajustement,
  toggleAddTableEdit,
  ajustementSelect,
} from "../../../atoms/ajustement";
import MyDataTable from "../../../utils/mydatatable/MyDataTable";
import {
  ButtonTable,
  confirmDelete,
  deleteData,
  getData,
} from "../../../utils/utils";

function Table() { 
  const [list, setList] = useRecoilState(listajustement);
  const [ajustementSelected, setAjustementSelected] = useRecoilState(ajustementSelect);
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
      name: "Fournisseur",
      selector: (row) => row.fournisseur.nom_fournisseur,
      sortable: true,
    },
    {
      name: "Efféctuer par",
      selector: (row) => row.utilisateur.nom_utilisateur,
      sortable: true,
    },
    {
      name: "Etat",
      selector: (row) => (
        <div className="text-center">
          <span
            className={
              row.etat_ajustement == "COMMANDE"
                ? "badge light badge-warning"
                : "badge light badge-success"
            }
          >
            <i
              className={
                row.etat_ajustement == "COMMANDE"
                  ? "fa fa-circle text-warning mr-1"
                  : "fa fa-circle text-success mr-1"
              }
            />
            {row.etat_ajustement === "COMMANDE" ? "Commandée" : "Livrée"}
          </span>
        </div>
      ),
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
              handleClick={() => {
                deleteData("ajustement", row.id, () => {
                  getData("ajustement", setList);
                });
              }}
            />
          </>
        );
      },
    },
  ];
  React.useEffect(() => {
    getData("ajustement", (data) => setList(data));
  }, []);
  return (
    <>
      <MyDataTable
        columns={columns}
        data={list}
        title="Liste des ajustements efféctuées"
        filterClass="form-control w-100"
        actions={
          <button className="btn btn-sm btn-primary">
            <i className="fa fa-plus mr-2"></i> Efféctuer une ajustement
          </button>
        }
      />
    </>
  );
}

export default Table;
