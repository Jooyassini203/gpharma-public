import { faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import MyDataTable from "../../../utils/mydatatable/MyDataTable";
import { ButtonTable, confirmDelete, getData } from "../../../utils/utils";

function Table({showAdd, showEdit}) {
    const columns = [
    {
      name: "Logo",
      selector: (row) => {},
      sortable: true,
      width: "5%",
    },
    {
      name: "Sigle",
      selector: (row) => {},
      sortable: true,
      width: "5%",
    },
    {
      name: "Nom",
      selector: (row) => { },
      sortable: true,
    },
    {
      name: "Cont. Sécret.",
      selector: (row) => {},
      sortable: true,
      width: "20%",
    },
    {
      name: "Email",
      selector: (row) => {},
      sortable: true,
      width: "8%",
    },
    {
      name: "Adresse",
      selector: (row) => {},
      sortable: true,
      width: "8%",
    },
    {
      name: "Action",
      width: "15%",
      selector: (row) => { 
        return (
          <div className="btn-group">
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
        );
      },
    },
  ];
  
  const [list, setList] = useState([])
    useEffect(()=>{
        getData('fournisseur', setList)
    },[])
  
  return (
    <div className="card-body"> 
        <MyDataTable
            title='Liste des fournisseurs'
            data={list}
            columns={columns}
            actions={<div className="btn-group float-right">
            <button className="btn btn-primary mr-3" onClick={showAdd}>
              Ajout d'un founrisseur
            </button>
            <button className="btn btn-outline-primary">
              <i className="fa fa-list-alt mr-3"></i>Activités
            </button>
          </div> }
        />
    </div>
  );
}

export default Table;
