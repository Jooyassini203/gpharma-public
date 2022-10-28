import React from "react";
import { InputForm, SelectForm } from "../../../utils/utils";

function Insert() {
  return (
    <div className="card m-auto">
      <div className="card-body">
        <div className="row">
          <div className="col-6">
            <InputForm textarea rows="2">
              Motif
            </InputForm>
            <div className="row">
              <div className="col-6">
                <SelectForm>Fournisseur</SelectForm>
              </div>
              <div className="col-6">
                <InputForm>Mode d'expedition</InputForm>
              </div>
            </div>
            <div className="row">
              <div className="col-8">
              <InputForm date > Date prévue pour la livraison</InputForm>
                {/* <label className="font-w600" htmlFor="datepicker">
                  Date prévue pour la livraison
                </label>
                <input
                  name="datepicker"
                  className="datepicker-default form-control picker__input"
                  id="datepicker"
                  readOnly
                  aria-haspopup="true"
                  aria-expanded="false"
                  aria-readonly="false"
                  aria-owns="datepicker_root"
                />*/}
              </div> 
              <div className="col-4">
                <InputForm integer postIcon={{ text: "%" }}>
                  TVA
                </InputForm>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="shadow-sm p-4">
              <div className="row">
                <div className="col-7">
                  <SelectForm>Produit</SelectForm>
                </div>
                <div className="col-5">
                  <InputForm postIcon={{ text: "Ar" }} integer>
                    Prix
                  </InputForm>
                </div>
              </div>
              <div className="row">
                <div className="col-8">
                  <InputForm integer>Qte demandé</InputForm>
                </div>
                <div className="col-4">
                  <label className="font-w600">Unité stock</label>
                  <span className="badge badge-warning p-2 light">
                    Unité stock
                  </span>
                </div>
              </div>
              <p className="mt-3 text-center mb-0">Prix HT : <b>0000 Ar</b> &nbsp;&nbsp;&nbsp; & &nbsp;&nbsp;&nbsp; Prix TCC : <b>0000 Ar</b></p>
            </div>
          </div>
        </div>
        <div>
          <div className="table-responsive">
            <table className="table table-striped table-responsive-md">
              <thead>
                <tr>
                  <th className="center">#</th>
                  <th>Code</th>
                  <th>Produit</th>
                  <th className="right">Prix Unit</th>
                  <th className="center">Qte</th>
                  <th className="right">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="center">1</td>
                  <td className="left strong">Origin License</td>
                  <td className="left">Extended License</td>
                  <td className="right">$999,00</td>
                  <td className="center">1</td>
                  <td className="right">$999,00</td>
                </tr>
                <tr>
                  <td className="center">2</td>
                  <td className="left">Custom Services</td>
                  <td className="left">
                    Instalation and Customization (cost per hour)
                  </td>
                  <td className="right">$150,00</td>
                  <td className="center">20</td>
                  <td className="right">$3.000,00</td>
                </tr>
                <tr>
                  <td className="center">3</td>
                  <td className="left">Hosting</td>
                  <td className="left">1 year subcription</td>
                  <td className="right">$499,00</td>
                  <td className="center">1</td>
                  <td className="right">$499,00</td>
                </tr>
                <tr>
                  <td className="center">4</td>
                  <td className="left">Platinum Support</td>
                  <td className="left">1 year subcription 24/7</td>
                  <td className="right">$3.999,00</td>
                  <td className="center">1</td>
                  <td className="right">$3.999,00</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="row">
            <div className="col-lg-4 col-sm-5"> </div>
            <div className="col-lg-4 col-sm-5 ml-auto">
              <table className="table table-clear">
                <tbody>
                  <tr>
                    <td className="left">
                      <strong>Subtotal</strong>
                    </td>
                    <td className="right">$8.497,00</td>
                  </tr>
                  <tr>
                    <td className="left">
                      <strong>Discount (20%)</strong>
                    </td>
                    <td className="right">$1,699,40</td>
                  </tr>
                  <tr>
                    <td className="left">
                      <strong>VAT (10%)</strong>
                    </td>
                    <td className="right">$679,76</td>
                  </tr>
                  <tr>
                    <td className="left">
                      <strong>Total</strong>
                    </td>
                    <td className="right">
                      <strong>$7.477,36</strong>
                      <br />
                      <strong>0.15050000 BTC</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="card-footer">
        <div className="row">
          <button className="btn btn-primary btn-lg w-100">Efféctuer</button>
        </div>
      </div>
    </div>
  );
}

export default Insert;
