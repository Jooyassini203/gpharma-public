import React from "react";

function FooterNav({...props}) {
  return (
    <>
      <div className="footer"{...props}>
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
