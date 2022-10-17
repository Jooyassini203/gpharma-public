import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { useEffect } from "react";
import MyDataTable from "../../../utils/mydatatable/MyDataTable";
import { ButtonTable, getData, InputForm } from "../../../utils/utils";
import Nav from "../../nav";
import FooterNav from "../../nav/FooterNav";
import Table from "../utilisateur/Table";

const ItemParametre = ({ table, children }) => {
  const [count, setCount] = useState([]);
useEffect(()=> {
  console.log('count', count);
  getData("count/"+table, setCount);},[])
  const getClassBagde = (nbr) => {
    let classText = "primary";
    if (nbr <= 4) classText = "dark";
    else if (nbr <= 12) classText = "success";
    else if (nbr <= 15) classText = "secondary";
    else if (nbr <= 20) classText = "info";
    else if (nbr <= 30) classText = "warning";
    else if (nbr > 30) classText = "danger";
    return classText;
  };
  return (
    <>
      <a type="button" className="list-group-item">
        <i className="mdi mdi-file-document-box font-18 align-middle mr-2" />
        {children}
        <span
          className={`badge badge-${getClassBagde(count[0].count
          )} badge-sm text-white float-right`}
        >
          {count[0].count}
        </span>
      </a>
    </>
  );
};

function Parametre() {
  return (
    <>
      <Nav />

      <div
        className="content-body"
        style={{ minHeight: "90vh", marginTop: "-8vh" }}
      >
        <div className="card-body">
          <div className="email-left-box generic-width px-0 mb-5">
            <div className="mail-list mt-4">
              <a className="list-group-item active">
                <i className="fa fa-inbox font-18 align-middle mr-2" />{" "}
                Paramètres
                <span className="badge badge-primary badge-sm float-right">
                  7
                </span>
              </a> 
              <ItemParametre table="caisse" >Caisse</ItemParametre>
              <ItemParametre table="fabricant" >Fabricant</ItemParametre>
              <ItemParametre table="famille" >Famille</ItemParametre>
              <ItemParametre table="forme" >Forme</ItemParametre>
              <ItemParametre table="mode_expredition" >Mode expredition</ItemParametre> 
              <ItemParametre table="unite" >Unité</ItemParametre>
              <ItemParametre table="voie" >Voie</ItemParametre>
            </div>
          </div>
          <div className="email-right-box ml-0 ml-sm-4 ml-sm-0">
            <div className="row">
              <div className="col-12">
                <div className="right-box-padding">
                  {/* <div className="toolbar mb-4" role="toolbar">
                  <div className="btn-group mb-1">
                    <button
                      type="button"
                      className="btn btn-primary light px-3"
                    >
                      <i className="fa fa-archive" />
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary light px-3"
                    >
                      <i className="fa fa-exclamation-circle" />
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary light px-3"
                    >
                      <i className="fa fa-trash" />
                    </button>
                  </div>
                  <div className="btn-group mb-1">
                    <button
                      type="button"
                      className="btn btn-primary light dropdown-toggle px-3"
                      data-toggle="dropdown"
                    >
                      <i className="fa fa-folder" />{" "}
                      <b className="caret m-l-5" />
                    </button>
                    <div className="dropdown-menu">
                      <a className="dropdown-item" href="javascript: void(0);">
                        Social
                      </a>
                      <a className="dropdown-item" href="javascript: void(0);">
                        Promotions
                      </a>
                      <a className="dropdown-item" href="javascript: void(0);">
                        Updates
                      </a>
                      <a className="dropdown-item" href="javascript: void(0);">
                        Forums
                      </a>
                    </div>
                  </div>
                  <div className="btn-group mb-1">
                    <button
                      type="button"
                      className="btn btn-primary light dropdown-toggle px-3"
                      data-toggle="dropdown"
                    >
                      <i className="fa fa-tag" /> <b className="caret m-l-5" />
                    </button>
                    <div className="dropdown-menu">
                      <a className="dropdown-item" href="javascript: void(0);">
                        Updates
                      </a>
                      <a className="dropdown-item" href="javascript: void(0);">
                        Social
                      </a>
                      <a className="dropdown-item" href="javascript: void(0);">
                        Promotions
                      </a>
                      <a className="dropdown-item" href="javascript: void(0);">
                        Forums
                      </a>
                    </div>
                  </div>
                  <div className="btn-group mb-1">
                    <button
                      type="button"
                      className="btn btn-primary light dropdown-toggle v"
                      data-toggle="dropdown"
                    >
                      More <span className="caret m-l-5" />
                    </button>
                    <div className="dropdown-menu">
                      {" "}
                      <a className="dropdown-item" href="javascript: void(0);">
                        Mark as Unread
                      </a>{" "}
                      <a className="dropdown-item" href="javascript: void(0);">
                        Add to Tasks
                      </a>
                      <a className="dropdown-item" href="javascript: void(0);">
                        Add Star
                      </a>{" "}
                      <a className="dropdown-item" href="javascript: void(0);">
                        Mute
                      </a>
                    </div>
                  </div>
                </div> */}
                  <div className="read-content">
                    <div className="media pt-3 d-sm-flex d-block justify-content-between">
                      <div className="clearfix  w-100 mb-3 mr-2 d-flex">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Ajout d'un nouveau ..."
                        />
                      </div>
                      <div className="clearfix mb-3 btn-group">
                        <a type="button" className="btn btn-primary px-3 light">
                          <i className="fa fa-check" />{" "}
                        </a>
                        <a
                          type="button"
                          className="btn btn-primary px-3 light ml-2"
                        >
                          <i className="fa fa-trash" />
                        </a>
                      </div>
                    </div>
                    <hr />
                    {/* <MyDataTable></MyDataTable> */}
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th width="10%">#</th>
                          <th>Nom</th>
                          <th width="20%">Option</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>Unite</td>
                          <td>
                            <ButtonTable
                              importance="warning ml-2"
                              icon={faEdit}
                              handleClick={() => {}}
                            />
                            <ButtonTable
                              importance="danger ml-2"
                              icon={faTrash}
                              handleClick={() => {}}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterNav />
    </>
  );
}

export default Parametre;
