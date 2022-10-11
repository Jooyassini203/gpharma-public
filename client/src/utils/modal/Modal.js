import React from "react";
import "./Modal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

export default function Modal({
  active,
  setActive,
  children,
  handleClick,
  size,
}) {
  return (
    <div className={active ? "modal active" : "modal"}>
      <div
        className={
          active ? `modal__content-${size} active` : `modal__content-${size}`
        }
      >
        <div className="title">
          <h5>My title</h5>
          <button className="modal__close" onClick={() => setActive(false)}>
            <FontAwesomeIcon icon={faClose} />
          </button>
        </div>
        <div className={"body body-" + size}>{children}</div>
        <div className="footer">
          <button className="btn btn-success" onClick={handleClick}>
            {/* <FontAwesomeIcon icon={faCheck} className="mr-3" /> */}
            Valider
          </button>
        </div>
      </div>
    </div>
  );
}
