import React from "react";
import MyDataTable from "../../../utils/mydatatable/MyDataTable";
import { addData, ButtonTable, getData, InputForm } from "../../../utils/utils";
import { faCheck, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { table_name } from "../../../atoms/parametre";

function Table() {
  const [tb_name, setTb_name] = useRecoilState(table_name);
  const [new_name, setNew_name] = useState("");
  const [edit_name, setEdit_name] = useState("");
  const [listBefore, setListBefore] = useState([]);
  const [list, setList] = useState([]);
  const [toggleEdit, setToggleEdit] = useState(false);
  let style = [];
  useEffect(() => {
    getData(tb_name, setListBefore);
  }, [tb_name]);
  useEffect(() => {
    let i = 0;
    let tempFull = [];
    Object.entries(listBefore).forEach(([key, value]) => {
      let temp = [];
      Object.entries(value).forEach(([k, val]) => {
        if (k == "id") {
          temp["id"] = val;
          temp["rang"] = ++i;
        } else if (k.indexOf("nom") > -1) {
          temp["nom"] = val;
        }
      });
      tempFull.push(temp);
    });
    setList(tempFull);
    console.log("list ;", list);
  }, [listBefore]);
  const columns = [
    {
      name: "#",
      selector: (row) => row.rang,
      sortable: true,
      width: "8%",
    },
    {
      name: "Nom",
      selector: (row) => {
        setEdit_name(row.nom);
        return (
          <span
            key={row.id}
            onDoubleClick={() => {
              setToggleEdit(!toggleEdit);
            }}
          >
            {toggleEdit ? (
              <input
                className="form-control"
                value={edit_name}
                onChange={(e) => setEdit_name(e.target.value)}
              />
            ) : (
              row.nom
            )}
          </span>
        );
      },
      sortable: true,
    },
    {
      name: "Action",
      width: "25%",
      selector: (row) => {
        let iconEdit = faEdit;
        let importance = "warning ml-2";
        if (toggleEdit) {
          importance = "success ml-2";
          iconEdit = faCheck;
        }
        return (
          <div className="btn-group">
            <ButtonTable
              importance={importance}
              icon={iconEdit}
              data-toggle="modal"
              data-target="#modalUtilisateur"
              handleClick={() => {
                setToggleEdit(!toggleEdit)
              }}
            />
            <ButtonTable
              importance="danger ml-2"
              icon={faTrash}
              handleClick={() => {}}
            />
          </div>
        );
      },
    },
  ];
  const formatName = (name) => {
    if (name == "mode_expedition") return "mode d'expedition";
    return name;
  };

  const add = () => {
    if (new_name != "") {
      const formData = new FormData();
      formData.append(`nom_${tb_name}`, new_name);
      console.log("data", formData);
      addData(
        tb_name,
        formData,
        () => {
          setTb_name("");
          getData(tb_name, setListBefore);
        } , true
      );
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="right-box-padding">
            <div className="read-content">
              <div className="media pt-3 d-sm-flex d-block justify-content-between">
                <div className="clearfix  w-100 mb-3 mr-2 d-flex">
                  <input
                    type="text"
                    className="form-control"
                    value={new_name}
                    onChange={(e) => setNew_name(e.target.value)}
                    placeholder={"Ajout d'un nouveau " + formatName(tb_name)}
                  />
                </div>
                <div className="clearfix mb-3 btn-group">
                  <a
                    type="button"
                    className="btn btn-primary px-3 light"
                    onClick={add}
                  >
                    <i className="fa fa-check" />{" "}
                  </a>
                  <a
                    type="button"
                    className="btn btn-primary px-3 light ml-2"
                    onClick={() => setNew_name("")}
                  >
                    <i className="fa fa-trash" />
                  </a>
                </div>
              </div>
              <hr />
              <MyDataTable
                data={list}
                columns={columns}
                filterClass="form-control form-control-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Table;
