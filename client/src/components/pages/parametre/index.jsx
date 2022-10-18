
import React, { useState } from "react";
import { useEffect } from "react"; 
import { getData } from "../../../utils/utils";
import Nav from "../../nav";
import FooterNav from "../../nav/FooterNav";
import Table from "./Table";
import { useRecoilState } from "recoil";
import {table_name} from '../../../atoms/parametre' 

const ItemParametre = ({ array, table, children }) => {
  const [tb_name, setTb_name] = useRecoilState(table_name);
  const [number, setNumber] = useState(0)

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
  useEffect(()=>{ 
    if (array.length > 0) { 
      setNumber(array[0]["count_"+table]) 
    }
  },[array])
  return (
    <> 
      <a type="button" className="list-group-item" onClick={()=> setTb_name(table)}>
        <i className="mdi mdi-file-document-box font-18 align-middle mr-2" />
        {children}
        <span
          className={`badge badge-${ getClassBagde(number) } badge-sm text-white float-right`}
        >
          {number}
        </span>
      </a>
    </>
  );
};

function Parametre() {
  const [countArray, setCountArray] = useState([]);
  
  useEffect(() => { 
    getData("parametre/count", setCountArray);
  }, []);

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
              <ItemParametre array={countArray} table="caisse">Caisse</ItemParametre>
              <ItemParametre  array={countArray} table="fabricant">Fabricant</ItemParametre>
              <ItemParametre  array={countArray} table="famille">Famille</ItemParametre>
              <ItemParametre  array={countArray} table="forme">Forme</ItemParametre>
              <ItemParametre  array={countArray} table="mode_expedition">
                Mode expredition
              </ItemParametre>
              <ItemParametre  array={countArray} table="unite">Unité</ItemParametre>
              <ItemParametre  array={countArray} table="voie">Voie</ItemParametre>
            </div>
          </div>
          <div className="email-right-box ml-0 ml-sm-4 ml-sm-0">
      <Table/> 
          </div>
        </div>
      </div>
      <FooterNav />
    </>
  );
}

export default Parametre;
