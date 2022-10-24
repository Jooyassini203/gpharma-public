import React from "react"; 

function Activity({ id }) { 
  return (
    <>
      <div
        className="modal fade"
        id="modalActivityFournisseur"
        style={{ display: "none" }}
        aria-modal="true"
        data-backdrop="static"
        data-keyboard="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                Activité sur le {/* {fournisseur.nom_fournisseur} */}
              </h5>
              <button
                // ref={closeRef}
                type="button"
                className="close"
                data-dismiss="modal"
                onClick={() => {}}
              >
                <span>×</span>
              </button>
            </div>
            <div className="modal-body">
                
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Activity;
