import React from "react";  
import Nav from "../../nav";

function Accueil() { 
  return (
    <div id="main-wrapper" className="show">
      <Nav />
      <div className="content-body" style={{ minHeight: "930px" }}>
        <div className="container-fluid">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col w-100">
                  <p className="text-justify">
                    Bienvenue sur GPHARMA Chez vous, en déplacement, depuis
                    votre tablette, smartphone ou ordinateur personnel, votre
                    officine reste toujours accessible et connectée. Vérifiez
                    l’état de vos stocks, suivez l’évolution de vos ventes,
                    communiquez avec vos collaborateurs, surveillez que tout se
                    passe bien.
                  </p>
                </div>
                <div className="col-3">
                  <div className="mt-2">
                    <img
                      src="./images/logo.png"
                      style={{ width: "100%" }}
                      alt="logo"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Accueil;
