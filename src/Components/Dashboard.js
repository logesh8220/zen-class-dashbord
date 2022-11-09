import { LabelList, LineChart, Tooltip } from "recharts";
import React, { useEffect, useState } from "react";
import { Bar } from "recharts";
import { BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import Navbar from "./Navbar";
import Sidbar from "./Sidbar";
import { Line } from "recharts";
import { api } from "./config";
import axios from "axios";

function Dashboard() {
  const [isloading, setloading] = useState(false);
  const [codekataPoints, setcodkata] = useState([]);
  const [webkataPoints, setwebkata] = useState([]);
  const [task, settasks] = useState([]);
  const [total, settotal] = useState([]);
  const [completion, set] = useState([]);
  let com = completion.Completion;

  useEffect(() => {
    Loaddata();
  }, []);

  let Loaddata = async () => {
    try {
      setloading(true);
      let codekata = await axios.get(`${api.codakta}`);
      let webkata = await axios.get(`${api.webkata}`);
      let tasks = await axios.get(`${api.tasks}`);
      let totals = await axios.get(`${api.total}`);
      let completion = await axios.get(`${api.completion}`);

      setcodkata(codekata.data.data);
      setwebkata(webkata.data.data);
      settasks(tasks.data.data);
      set(completion.data.data[0]);
      settotal(totals.data.data[0]);
      setloading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Sidbar></Sidbar>
      <div style={{ marginLeft: "3%" }} class="ms-5 ">
        <Navbar></Navbar>
        {isloading ? (
          <div class="d-flex justify-content-center">
          <div class="spinner-border " style={{width: "3rem", height :"3rem",marginTop:"20%"}} role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        </div>
        ) : (
          <div>
            <div class="p-5 col-lg-8 main-div">
              <h1 class="text-muted">Overview</h1>
              <div
                class="card pt-5 px-5"
                style={{
                  height: "150px",
                  borderRadius: "20px",
                  position: "static",
                }}
              >
                <div>
                  <div class=" d-flex justify-content-between">
                    <span class="text-muted">
                      <h4>Completion</h4>
                    </span>
                    <span class="text-muted">
                      <h4>{com}%/100%</h4>
                    </span>
                  </div>

                  <div
                    style={{
                      boxShadow: "-1px 4px 5px lightgray",
                      borderRadius: "5px",
                    }}
                  >
                    <div
                      class="progress"
                      style={{ borderRadius: "5px", height: "18px" }}
                    >
                      <div
                        class="progress-bar "
                        role="progressbar"
                        aria-label="Success example"
                        style={{ width: `${com}%`, backgroundColor: "#4b0dba" }}
                        aria-valuenow={com}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="main-chart mt-5">
                <div
                  class="card col-lg-6 p-5 me-5 charts-div"
                  style={{
                    borderRadius: "20px",
                    height: "400px",
                    width: "765px",
                  }}
                >
                  <div class="d-flex justify-content-between">
                    <div>
                      <h4 style={{ color: "#33028a" }}>Codekata</h4>
                    </div>
                    <div class="text-muted">
                      <h5>Today:{total.CToday}</h5>
                      <h5>Total:{total.CTotal}</h5>
                    </div>
                  </div>
                  <BarChart
                    width={530}
                    height={250}
                    style={{ paddingLeft: "50px" }}
                    margin={{ top: 15, right: 30, left: 20, bottom: 5 }}
                    data={codekataPoints}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="DAY" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="POINTS" fill="#ffbebe">
                      <LabelList dataKey="POINTS" position="top" fill="gray" />
                    </Bar>
                  </BarChart>
                </div>

                <div
                  class="card col-lg-6 p-5 charts-div"
                  style={{
                    borderRadius: "20px",
                    height: "400px",
                    width: "765px",
                  }}
                >
                  <div class="d-flex justify-content-between">
                    <div>
                      <h4 style={{ color: "#33028a" }}>Webkata</h4>
                    </div>
                    <div class="text-muted">
                      <h5>Today:{total.WToday}</h5>
                      <h5>Total:{total.WTotal}</h5>
                    </div>
                  </div>
                  <BarChart
                    width={530}
                    height={250}
                    style={{ paddingLeft: "50px" }}
                    margin={{ top: 15, right: 30, left: 20, bottom: 5 }}
                    data={webkataPoints}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="DAY" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="POINTS" fill="#ffbebe">
                      <LabelList dataKey="POINTS" position="top" fill="gray" />
                    </Bar>
                  </BarChart>
                </div>
              </div>
            </div>
            <div
              class="card col-lg-7 p-5 charts-div"
              style={{
                borderRadius: "20px",
                height: "400px",
                marginLeft: "2%",
              }}
            >
              <div class="d-flex justify-content-between">
                <div>
                  <h4 style={{ color: "#33028a" }}>Task</h4>
                </div>

                <div class="text-muted">
                  <h5>Submitted Tasks :{total.TSubmitted} </h5>
                  <h5>Pending Tasks : {total.TPending} </h5>
                </div>
              </div>
              <LineChart
                width={930}
                height={250}
                style={{ paddingLeft: "50px" }}
                margin={{ top: 15, right: 30, left: 20, bottom: 5 }}
                data={task}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="Submitted" stroke="#ffbebe" />
                <Line type="monotone" dataKey="Pending" stroke="#ffbebe" />
              </LineChart>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
