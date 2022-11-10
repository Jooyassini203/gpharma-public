import React from "react";
import { Doughnut, Line, Pie, PolarArea } from "react-chartjs-2";
import { Chart, ArcElement, registerables } from "chart.js";

Chart.register(...registerables);
Chart.register(ArcElement);
const data = {
  labels: ["Red", "Blue", "Yellow"],
  datasets: [
    {
      label: "My First Dataset",
      data: [300, 50, 100],
      backgroundColor: [
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        "rgb(255, 205, 86)",
      ],
      hoverOffset: 4,
    },
  ],
};
function StatisticGeneral() {
  return (
    <>
      <div className="col-xl-12 ml-3">
        <div className="card">
          <div className="card-header border-0 pb-0">
            <div>
              <h4 className="fs-20 text-black mb-1">Statistique</h4>
              <span className="fs-12">Générale</span>
            </div>
          </div>
          <div className="card-body">
            <div className="row align-items-center">
              {/* <div className="col-lg-5 mb-lg-0 mb-3">
                <div className="d-flex mb-3 align-items-center">
                  <span className="fs-12 col-6 p-0 text-black">
                    <svg
                      className="mr-2"
                      width={19}
                      height={19}
                      viewBox="0 0 19 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width={19} height={19} fill="#5F74BF" />
                    </svg>
                    Commande
                  </span>
                  <div className="progress rounded-0 col-6 p-0">
                    <div
                      className="progress-bar rounded-0 progress-animated"
                      style={{ width: "80%", height: 6, background: "#5F74BF" }}
                      role="progressbar"
                    >
                      <span className="sr-only">60% Complete</span>
                    </div>
                  </div>
                </div>
                <div className="d-flex mb-3 align-items-center">
                  <span className="fs-12 col-6 p-0 text-black">
                    <svg
                      className="mr-2"
                      width={19}
                      height={19}
                      viewBox="0 0 19 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width={19} height={19} fill="#FFD439" />
                    </svg>
                    Livraison
                  </span>
                  <div className="progress rounded-0 col-6 p-0">
                    <div
                      className="progress-bar rounded-0 progress-animated"
                      style={{ width: "40%", height: 6, background: "#FFD439" }}
                      role="progressbar"
                    >
                      <span className="sr-only">60% Complete</span>
                    </div>
                  </div>
                </div>
                <div className="d-flex mb-3 align-items-center">
                  <span className="fs-12 col-6 p-0 text-black">
                    <svg
                      className="mr-2"
                      width={19}
                      height={19}
                      viewBox="0 0 19 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width={19} height={19} fill="#FF6E5A" />
                    </svg>
                    Guichet
                  </span>
                  <div className="progress rounded-0 col-6 p-0">
                    <div
                      className="progress-bar rounded-0 progress-animated"
                      style={{ width: "90%", height: 6, background: "#FF6E5A" }}
                      role="progressbar"
                    >
                      <span className="sr-only">60% Complete</span>
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <span className="fs-12 col-6 p-0 text-black">
                    <svg
                      className="mr-2"
                      width={19}
                      height={19}
                      viewBox="0 0 19 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width={19} height={19} fill="#5FBF91" />
                    </svg>
                    Caisse
                  </span>
                  <div className="progress rounded-0 col-6 p-0">
                    <div
                      className="progress-bar rounded-0 progress-animated"
                      style={{ width: "80%", height: 6, background: "#5FBF91" }}
                      role="progressbar"
                    >
                      <span className="sr-only">60% Complete</span>
                    </div>
                  </div>
                </div>
              </div> */}
              <div className="col -lg-7">
                <div className="row align-items-center">
                  <div className="col-lg-6 col-sm-6 mb-sm-0 mb-3"></div>
                  <div className="col-lg-4 col-sm-6">
                    <div className="d-flex align-items-center">
                      <Doughnut data={data}  />
                    </div>
                  </div>
                </div>
              </div>
            </div>
              <div className="row m-3">
                <span class="fs-12">Hebdomadaire</span>
                <div className="card-body">

                <Line data={data} />
                </div>
              </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StatisticGeneral;
