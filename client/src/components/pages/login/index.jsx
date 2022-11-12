import cryptojs from "crypto-js";
import React from "react";
import axios from "axios";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useRecoilState } from "recoil";
import { userConnected } from "../../../atoms/authentication";
import { InputForm, urlInsert } from "../../../utils/utils";

function Login() {
  const [userConnect, setUserConnect] = useRecoilState(userConnected);
  const [showPswd, setShowPswd] = useState(false);
  const [isObligatory, setIsObligatory] = useState(false);
  const [isLoged, setIsLoged] = useState(false);
  const [nom_login, setNom_login] = useState("");
  const [mot_de_passe, setMot_de_passe] = useState("");

  const login = () => {
    setIsObligatory(true);
    if (!nom_login || !mot_de_passe) {
      return;
    }
    toast.promise(
      async () => {
        try {
          const response = await axios.post(urlInsert("login"), {
            nom_login,
            mot_de_passe,
          });
          if (response.status == 200) {
            toast.success(response.data.message);
            window.localStorage.setItem(
              "gpharma@2.0.0",
              response.data.dataUser
            ); 
            const userJson = cryptojs.AES.decrypt(
              localStorage.getItem("gpharma@2.0.0"),
              process.env.REACT_APP_KEY_SESSION
            ).toString(cryptojs.enc.Utf8);
            setUserConnect(JSON.parse(userJson)); 
            console.log(window.localStorage.getItem("gpharma@2.0.0"));
            document.getElementById("btn-login").click();
          }
        } catch (error) {
          toast.error(JSON.parse(error.response.request.response).message);
        }
      },
      {
        pending: `Authentification en cours ...`,
        error: `Une erreur est survenue lors du tentative d'authentification!`,
      }
    );
  };

  return (
    <div
      className="authincation h-100 align-middle"
      style={{ marginTop: "8vh" }}
    >
      <a href="/" className="d-none" id="btn-login"></a>
      <div className="container h-100">
        <div className="row justify-content-center h-100 align-items-center">
          <div className="col-md-6">
            <div className="authincation-content">
              <div className="row no-gutters">
                <div className="col-xl-12">
                  <div className="auth-form">
                    <div className="text-center mb-3">
                      <img
                        src="images/logo.png"
                        style={{ width: "40%" }}
                        alt="Image"
                      />
                    </div>
                    <h4 className="text-center mb-4 text-white">
                      <font style={{ verticalAlign: "inherit" }}>
                        <font style={{ verticalAlign: "inherit" }}>
                          Connectez-vous à votre compte
                        </font>
                      </font>
                    </h4>
                    <form action="index.html">
                      <InputForm
                        classLabel="text-white"
                        classSpan="text-secondary"
                        text
                        val={nom_login}
                        onChange={(e) => setNom_login(e.target.value)}
                        obligatory={isObligatory ? "active" : ""}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") login();
                        }}
                      >
                        Identifiant
                        {/* Nom d'utilisateur */}
                      </InputForm>
                      <InputForm
                        classLabel="text-white"
                        classSpan="text-secondary"
                        type={!showPswd ? "password" : "text"}
                        val={mot_de_passe}
                        onChange={(e) => setMot_de_passe(e.target.value)}
                        obligatory={isObligatory ? "active" : ""}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") login();
                        }}
                      >
                        Mot de passe
                      </InputForm>
                      <div className="custom-control custom-checkbox m-3 checkbox-warning">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          defaultChecked
                          id="customCheckBox4"
                          required
                          style={{ cursor: "pointer !important" }}
                          onClick={() => setShowPswd(!showPswd)}
                        />
                        <label
                          className="custom-control-label text-white"
                          style={{
                            marginBottom: "-10px !important", 
                          }}
                          onClick={() => {
                            document.getElementById("customCheckBox4").click();
                            setShowPswd(!showPswd);
                          }}
                        >
                          {!showPswd ? "Afficher" : "Cacher"} le mot de passe
                        </label>
                      </div>

                      <div className="text-center">
                        <button
                          type="button"
                          className="btn bg-white text-primary btn-block"
                          onClick={login}
                        >
                          <font style={{ verticalAlign: "inherit" }}>
                            <font style={{ verticalAlign: "inherit" }}>
                              Se connecter
                            </font>
                          </font>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default Login;
