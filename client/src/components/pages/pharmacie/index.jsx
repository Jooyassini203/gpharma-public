import axios from "axios";
import React from "react";
import { toast } from "react-toastify";
import { getData, getUrl, urlRead } from "../../../utils/utils";
import Nav from "../../nav";
import FooterNav from "../../nav/FooterNav";
import Edit from "./Edit"; 

function Pharmacie() {
  const [urlFileDownload, seturlFileDownload] = React.useState('')
  const closeRef = React.useRef();
  const generatePdf = () =>{
    const get = async () => {
      try {
        const response = await axios.get(urlRead('download/pdf/vente', 'VENTE_0001'));
        if (response.status === 200 ) { 
          seturlFileDownload(getUrl('pdf/vente/facture',response.data.url))  
          console.log('btn', urlFileDownload);
          document.getElementById('btnFileDownload_'+'VENTE_0001').click()
          closeRef.current.click();
        }
      } catch (error) { 
        toast.error("Une erreur est survenue !"); 
      }
    };
    toast.promise(get, {
      pending: `Génération de la facture de vente #${"VENTE_0001"} en cours ...`,
      // success: "Promise  Loaded",
      error: `Une erreur de chargement est survenue !`,
    });
  }
  return (
    <div id="main-wrapper" className="show">
      <Nav />
      <div className="content-body" style={{ minHeight: "60vh", marginTop:"-8vh" }}>
        <div className="container-fluid">
          <div className="card">
            <div className="card-body">
              <a id="btnFileDownload_VENTE_0001" href={urlFileDownload} target="_blank"
                          download="facture" ref={closeRef}>facture</a>
              <button className="btn btn-warning" onClick={generatePdf}>Telecharger le pdf</button>
              <Edit/> 
            </div>
          </div>
        </div>
      </div>
      <FooterNav />
    </div>
  );
}

export default Pharmacie;
