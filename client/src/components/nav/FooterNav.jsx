import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function FooterNav() {
  return (
    <>
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
      <div className="footer">
        <div className="copyright">
          <p>
            Copyright © Developed by{" "}
            <a href="https://www.mada-digital.net/" target="_blank">
              MADA-DIGITAL
            </a>
            {"  "}
            2022
          </p>
        </div>
      </div>
    </>
  );
}

export default FooterNav;
