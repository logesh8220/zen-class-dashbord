
import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "./config";

function Signup() {
  let navigate = useNavigate()
  let [isloading, setloading] = useState(false)

  const formik = useFormik({
    initialValues: {
      Name: "",
      Email: "",
      Password: "",
    },
    validate: (values) => {
      let errors = {}


      if (values.Name.length < 3) {
        errors.Name = "Please enter the fullname"
      }

      if (values.Email.length < 5) {
        errors.Email = "Please provide a valid email address"
      }



      if (values.Password.length < 8) {
        errors.password = "Password must contain atleast 8 characters"
      }

      return errors
    },

    onSubmit: async (values) => {
      console.log(values);

      try {
        setloading(true)
        let registerData = await axios.post(`${api.Auth}/signin`, values)
        // console.log(registerData)
        setloading(false)
        if (registerData.status === 200) {
          alert("User registered successfully")
          navigate("/login");
        }

      } catch (error) {
        console.log(error);
        alert(error.response.data.message);

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
      <div className="container col-lg-4 ">
        <div className="addproduct">
          <h3 className=" text-muted fw-normal text-center mt-4 " id="login">
            Register Form
          </h3>
          <div className="">

            <form onSubmit={formik.handleSubmit}>
              {/* <!-- Full name --> */}
              <div className="mb-3">
                <label for="name" className="form-label lead ">
                  Full name<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  value={formik.values.Name}
                  onChange={formik.handleChange}
                  name="Name"
                  className="form-control formtrans"
                  id="name"
                  aria-describedby="emailHelp"

                  placeholder="Enter your full name"
                  required
                />
                <span className="text-warning">{formik.errors.Name}</span>
              </div>


              {/* <!-- Email --> */}
              <div className="mb-3">
                <label for="email" className="form-label  lead">
                  Email address<span className="text-danger">*</span>
                </label>
                <input
                  type="email"
                  value={formik.values.Email}
                  onChange={formik.handleChange}
                  name="Email"

                  className="form-control formtrans"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Enter your email"
                  required
                />

                <span className="text-warning">{formik.errors.Email}</span>
              </div>
              {/* <!-- Password --> */}
              <div className="my-3">
                <label for="exampleInputPassword1" className="form-label e lead">
                  Password<span className="text-danger">*</span>
                </label>
                <input
                  type="password"
                  value={formik.values.Password}
                  onChange={formik.handleChange}
                  name="Password"
                  className="form-control formtrans"
                  id="exampleInputPassword1"
                  placeholder="Enter your password"
                  pattern=".{8,}"
                  required
                />

                <span className="text-warning">{formik.errors.password}</span>
              </div>

              {/* <!-- Terms and Condition checkbox --> */}
              <div className="mb-3 form-check  lead">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                  required
                />
                <label className="form-check-label fs-6" for="exampleCheck1">
                  I agree to the terms and conditions
                </label>
              </div>

              {/* <!-- Submit button --> */}
              <div className="d-grid gap-2 pt-2">
                {
                  isloading ? <button type="submit" className=" button-color">
                    <div class="spinner-border ms-auto text-light" role="status" aria-hidden="true"></div>
                  </button> :
                    <button type="submit" className=" button-color">
                      <i className="fa-solid fa-lock me-1"></i>
                      <span className="lead fw-normal text-light">SignUp</span>
                    </button>
                }
              </div>
            </form>
          </div>
          <p class="text-center fs-5  lead ">Already a Have Account?, Click here for <Link to={"/login"} class="text-primary fw-normal tdn">Login</Link></p>

        </div>
      </div>


    </>
  );
}

export default Signup;
