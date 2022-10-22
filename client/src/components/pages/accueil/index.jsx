import React from "react";
import { useEffect } from "react";
import cryptojs from "crypto-js";
import { useRecoilState } from "recoil";
import { userConnected } from "../../../atoms/authentication";
import Nav from "../../nav";

function Accueil() {
  const [userConnect, setUserConnect] = useRecoilState(userConnected);

  useEffect(() => {
    if (!userConnect) {
      const datdCrypted =  sessionStorage.getItem("gpharma@2.0.0")
      // console.log("pure ", datdCrypted);
      // const userJson = cryptojs.AES.decrypt(
      //   datdCrypted,
      //   process.env.REACT_APP_KEY_SESSION
      // ).toString(cryptojs.enc.Utf8);
      console.log("\n\nbefore parse ", datdCrypted);
      setUserConnect(JSON.parse(datdCrypted));
    }
  }, []);
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
