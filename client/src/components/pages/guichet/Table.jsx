import { faEdit, faEye, faListAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useRecoilState } from "recoil";
import { userConnected } from "../../../atoms/authentication";
import {
  isAddState, 
  listGuichet, 
} from "../../../atoms/guichet";
import MyDataTable from "../../../utils/mydatatable/MyDataTable";
import {
  ButtonTable,
  confirmDelete,
  deleteData,
  getData,
} from "../../../utils/utils";

function Table() {
  const [userConnect, setUserConnect] = useRecoilState(userConnected);
  const [isAdd, setIsAdd] = useRecoilState(isAddState);
  const [list, setList] = useRecoilState(listGuichet); 
  const columns = [
    {
      name: "#",
      selector: (row) => row.id,
      sortable: true,
      width: "15%",
    },
    {
      name: "Motif",
      selector: (row) => row.motif,
      sortable: true,
      // width: "30%",
    },
    {
      name: "Client",
      selector: (row) => (row.client.nom_prenom),
      sortable: true,
    }, 
    {
      name: "Date de saisie",
      selector: (row) => row.date_saisi,
      sortable: true,
    }, 
    {
      name: "Date de vente",
      selector: (row) => row.date_vente,
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
      width: "150px",
      selector: (row) => {
        return (
          <>
            <ButtonTable
              importance={ "success" }
              icon={ faListAlt}
              handleClick={() => { 
                  document.getElementById('btn-view-modal').click(); 
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
    getData("vente/myGuichet", (data) => setList(data), userConnect.id);
  }, []);
  return (
    <> 
      <MyDataTable
        columns={columns}
        data={list}
        title="Liste des guichets efféctuées"
        filterClass="form-control w-100"
        actions={
          <button
            className="btn btn-sm btn-primary"
            onClick={() => {
              setIsAdd("1");
            }}
          >
            <i className="fa fa-plus mr-2"></i> Ajouter un guichet
          </button>
        }
      />
    </>
  );
}

export default Table;
