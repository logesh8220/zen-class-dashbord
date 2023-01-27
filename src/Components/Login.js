import React, { useState } from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { api } from "./config";


function Login() {

  let navigate = useNavigate()
  let [isloading, setloading] = useState(false)

  let formik = useFormik({
    initialValues: {
      Email: "",
      Password: "",
    },

    onSubmit: async (values) => {
      try {
        setloading(true)
        let loginData = await axios.post(`${api.Auth}/login`, values)
        setloading(false)
        if (loginData.status === 200) {
          if (loginData.data.Type === "Admin") {
            window.localStorage.setItem("apptoken", loginData.data.Password)
            navigate("/admin")
            toast.success(`Welcome! ${loginData.data.Name}`, {
              position: toast.POSITION.TOP_CENTER,
            });
          }
          else {
            window.localStorage.setItem("apptoken", loginData.data.Password)
            navigate("/class")
            toast.success(`Welcome! ${loginData.data.Name}`, {
              position: toast.POSITION.TOP_CENTER,
            });
          }

        }

      }
      catch (error) {
        console.log(error);

      }
    },
  });

  return (
    <>

      <nav class="navbar bg-white p-3 card nav" style={{ borderRadius: "0px", position: "static" }}>
        <div class="container-fluid d-flex justify-content-center">
          <h1 class="">Zen Class</h1>
        </div>
      </nav>

      <div className="container col-lg-4">
        <div className="addproduct mt-5">
          <h1 className="text-muted fw-normal text-center " id="login">
            Login
          </h1>
          <form onSubmit={formik.handleSubmit} >

            {/* <!-- Username --> */}
            <div className="my-2">
              <label for="Username" className="form-label  lead">
                Username<span className="text-danger">*</span>
              </label>
              <div className="input-group mb-3">
                <span className="input-group-text" id="Username">
                  <i className="fa-solid fa-user"></i>
                </span>
                <input
                  id="Username"
                  type="email"
                  className="form-control formtrans"
                  // pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  placeholder="Enter the email"

                  value={formik.values.Email}
                  onChange={formik.handleChange}
                  name="Email"

                  aria-label="Username"
                  aria-describedby="Username"
                  required
                />
              </div>
            </div>

            {/* <!-- Password --> */}
            <div className="my-2">
              <label for="Password1" className="form-label  lead">
                Password<span className="text-danger">*</span>
              </label>
              <div className="input-group mb-3">
                <span className="input-group-text" id="Password">
                  <i className="fa-solid fa-key"></i>
                </span>
                <input
                  type="password"
                  id="Password1"
                  className="form-control formtrans"
                  placeholder="Enter your password"
                  aria-label="password"

                  value={formik.values.Password}
                  onChange={formik.handleChange}
                  name="Password"

                  aria-describedby="password"
                  // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  // title="Must contain at least one number and one uppercase and lowercase letter and at least 8 or more characters"
                  required
                />
              </div>
            </div>

            {/* <!-- Submit button --> */}
            <div className="d-grid gap-2 pt-2">
              {
                isloading ? <button type="submit" className=" button-color">
                  <div class="spinner-border ms-auto text-light" role="status" aria-hidden="true"></div>
                </button> :
                  <button type="submit" className=" button-color text-light">
                    <i className="fa-solid fa-lock me-1"></i>
                    <span className="lead fw-normal">Login</span>
                  </button>
              }
            </div>
          </form>

        </div>
        <div>
          <p class="text-center  lead fs-5 mt-3">Don't have an account? <Link to={"/"} class="text-primary fw-normal tdn">Register now</Link></p>
        </div>
      </div>
      <div className="text-center text-muted container p-3" style={{ boxShadow: "1px 1px 10px lightgray" }}>
        <h1 className="text-muted">Login Credentials</h1>
        <div>
          <h5>Admin</h5>
          <h6>Admindemo@gmail.com</h6>
          <h6>Admindemo</h6>
        </div>
        <div>
          <h5>User</h5>
          <h6>guvidemo@gmail.com</h6>
          <h6>guvidemo</h6>
        </div>
      </div>
    </>
  );
}

export default Login;
