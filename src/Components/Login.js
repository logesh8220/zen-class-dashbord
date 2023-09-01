import React, { useState } from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { api } from "./config";
import { useMyContext } from "./MyContext";

function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const {setMyState } = useMyContext(); 
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      Email: "",
      Password: "",
    },

    onSubmit: async (formValues) => {
      try {
        setIsLoading(true);
        const loginData = await axios.post(`${api.Login}`, formValues);
        setIsLoading(false);
        console.log(loginData)
        const token = loginData.data.user.Password;
        window.localStorage.setItem("apptoken", token);

        const destination = loginData.data.user.Type === "Admin" ? "/admin" : "/class";
        setMyState(loginData.data.user.Name);
        navigate(destination);
       
        toast.success(`Welcome! ${loginData.data.user.Name}`, {
          position: toast.POSITION.TOP_CENTER,
        });
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <>
      <nav className="navbar bg-white p-3 card nav" style={{ borderRadius: "0px", position: "static" }}>
        <div className="container-fluid d-flex justify-content-center">
          <h1>Zen Class</h1>
        </div>
      </nav>

      <div className="container col-lg-4">
        <div className="addproduct mt-5">
          <h1 className="text-muted fw-normal text-center" id="login">
            Login
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="my-2">
              <label htmlFor="Email" className="form-label lead">
                Email<span className="text-danger">*</span>
              </label>
              <div className="input-group mb-3">
                <span className="input-group-text" id="Email">
                  <i className="fa-solid fa-user"></i>
                </span>
                <input
                  id="Email"
                  type="email"
                  className="form-control formtrans"
                  placeholder="Enter the email"
                  value={values.Email}
                  onChange={handleChange}
                  name="Email"
                  aria-label="Email"
                  aria-describedby="Email"
                  required
                />
              </div>
            </div>

            <div className="my-2">
              <label htmlFor="Password" className="form-label lead">
                Password<span className="text-danger">*</span>
              </label>
              <div className="input-group mb-3">
                <span className="input-group-text" id="Password">
                  <i className="fa-solid fa-key"></i>
                </span>
                <input
                  type="password"
                  id="Password"
                  className="form-control formtrans"
                  placeholder="Enter your password"
                  aria-label="password"
                  value={values.Password}
                  onChange={handleChange}
                  name="Password"
                  aria-describedby="password"
                  required
                />
              </div>
            </div>

            <div className="d-grid gap-2 pt-2">
              <button type="submit" className={`button-color text-light ${isLoading ? "disabled" : ""}`}>
                {isLoading ? (
                  <div className="spinner-border ms-auto text-light" role="status" aria-hidden="true"></div>
                ) : (
                  <>
                    <i className="fa-solid fa-lock me-1"></i>
                    <span className="lead fw-normal">Login</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
        <div>
          <p className="text-center lead fs-5 mt-3">
            Don't have an account? <Link to={"/signup"} className="text-primary fw-normal tdn">Register now</Link>
          </p>
        </div>
      </div>

      <div className="text-center text-muted container p-3" style={{ boxShadow: "1px 1px 10px lightgray" }}>
        <h1 className="text-muted">Login Credentials</h1>
        <div>
          <h5>Mentor</h5>
          <h6>Admindemo@gmail.com</h6>
          <h6>Admindemo</h6>
        </div>
        <div>
          <h5>Student</h5>
          <h6>guvidemo@gmail.com</h6>
          <h6>guvidemo</h6>
        </div>
      </div>
    </>
  );
}

export default Login;
