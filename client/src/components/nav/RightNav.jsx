import React from "react";

function RightNav({children}) {
  return (
    <>
      <div className="deznav">
        <div className="deznav-scroll">
          <ul className="metismenu" id="menu">
            {children} 
          </ul>
        </div>
      </div>
    </>
  );
}

export default RightNav;
