import { faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import MyDataTable from "../../../utils/mydatatable/MyDataTable";
import { ButtonTable, confirmDelete, getData } from "../../../utils/utils";

function Table({ showAdd, showEdit }) {
  const columns = [
    {
      name: "Logo",
      selector: (row) => (
        <img
          style={{ height: "5vh", verticalAlign: "middle" }}
          className="img-fluid"
          styles={{ borderRadius: "5%" }}
          src={row.logo ? row.logo : `images/users/1.jpg`}
          alt={`image de ${row.nom_utilisateur}`}
        />
       ),
      sortable: true,
      width: "5%",
    },
    {
      name: "Sigle",
      selector: (row) => (row.sigle),
      sortable: true,
      width: "5%",
    },
    {
      name: "Nom",
      selector: (row) => (row.nom_fournisseur),
      sortable: true,
    },
    {
      name: "Cont. Sécret.",
      selector: (row) => (row.contact_secretaire),
      sortable: true,
      width: "20%",
    },
    {
      name: "Email",
      selector: (row) => (row.email),
      sortable: true,
      width: "8%",
    },
    {
      name: "Adresse",
      selector: (row) => (row.adtesse),
      sortable: true,
      width: "8%",
    },
    {
      name: "Action",
      width: "15%",
      selector: (row) => {
        return (
          <div class="dropdown">
            <button
              class="btn btn-primary tp-btn-light sharp"
              type="button"
              data-toggle="dropdown"
            >
             <i className="fa fa-plus"></i>
            </button>
            <div class="dropdown-menu dropdown-menu-right border py-0">
              <div class="py-2"> 
          <ButtonTable
            importance="info ml-2"
            icon={faEye}
            data-toggle="modal"
            data-target="#modalUtilisateur"
            handleClick={() => { }}
          />
          <ButtonTable
            importance="warning ml-2"
            icon={faEdit}
            data-toggle="modal"
            data-target="#modalUtilisateur"
            handleClick={() => { }}
          />
            <ButtonTable
              importance="danger ml-2"
              icon={faTrash}
              handleClick={() => { 
                confirmDelete(
                  "Voulez-vous vraimment supprimé cet fournisseur ?",
                  () => { }
                );
              }}
            /> 
              </div>
            </div>
          </div>
        );
      },
    },
  ];

  const [list, setList] = useState([]);
  useEffect(() => {
    getData("fournisseur", setList);
  }, []);

  return (
    <div className="card-body">
      <MyDataTable
        title="Liste des fournisseurs"
        data={list}
        columns={columns}
        actions={
          <div className="btn-group float-right">
            <button className="btn btn-primary mr-3" onClick={showAdd}>
              Ajout d'un founrisseur
            </button>
            <button className="btn btn-outline-primary">
              <i className="fa fa-list-alt mr-3"></i>Activités
            </button>
          </div>
        }
      />
    </div>
  );
}

export default Table;
