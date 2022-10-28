import React from "react";
import { InputForm } from "../../../utils/utils";

function Insert() {
  return (
    <div className="card">
      <div className="card-body">
        <div className="row">
          <div className="col-6">
            <InputForm  >Motif</InputForm>
          </div>
          <div className="col-6">
            <InputForm  >Motif</InputForm>
          </div>
        </div>
      </div>
      <div className="card-footer">
        <div className="row">
          <button className="btn btn-primary btn-sm">Efféctuer</button>
        </div>
      </div>
    </div>
  );
}

export default Insert;
