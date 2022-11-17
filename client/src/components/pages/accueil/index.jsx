import React from "react";
import { useRecoilState } from "recoil";
import { userConnected } from "../../../atoms/authentication";
import Nav from "../../nav";
import FooterNav from "../../nav/FooterNav";
import StatisticGeneral from "./StatisticGeneral";

function Accueil() { 
  return (
    <div id="main-wrapper" className="show">
      <Nav />
      <div
        className="content-body"
        style={{ minHeight: "80vh", marginTop: "-10vh" }}
      >
        <div className="container-fluid">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div
                  className="col w-100 align-items-center"
                  style={{ marginBottom: " 0vh" }}
                >
                  <p className="text-justify">
                    Bienvenue sur <b>Gpharma</b>. Chez vous, en déplacement, depuis
                    votre tablette, smartphone ou ordinateur personnel, votre
                    officine reste toujours accessible et connectée. Vérifiez
                    l’état de vos stocks, suivez l’évolution de vos ventes,
                    communiquez avec vos collaborateurs, surveillez que tout se
                    passe bien.
                  </p>
                </div>
                <div className="col-3">
                  <div className="mt-2 text-center">
                    <img
                      src="./images/logo.png"
                      style={{ width: "80%", marginTop: "-3vh" }}
                      alt="logo"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="form-head d-flex align-items-center mb-sm-4 mb-3 ml-5">
          <div className="mr-auto">
            <h2 className="text-black font-w600">Infos</h2>
            {/* <p className="mb-0">Générale</p> */}
          </div>
          {/* <a href="javascript:void(0)" class="btn btn-outline-primary"><i class="las la-cog scale5 mr-3"></i>Customize Layout</a> */}
        </div>
        <StatisticGeneral />
      </div>
      <FooterNav />
    </div>
  );
}

export default Accueil;
