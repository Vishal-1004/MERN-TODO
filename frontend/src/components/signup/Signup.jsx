import React, { useState } from "react";
import "./Signup.css";
import HeadingComp from "./HeadingComp";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const history = useNavigate();
  const [input, setInput] = useState({ email: "", username: "", password: "" });

  const change = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
    //console.log(input);
  };

  const submit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:1000/api/signup", input)
      .then((response) => {
        console.log(response);
        if (response.data.message === "User Already Exists") {
          toast.error(response.data.message);
        } else {
          toast.success(response.data.message);
          toast.info("You will be directed to Sign In page shortly");
          setInput({ email: "", username: "", password: "" });
          setTimeout(() => {
            history("/signin");
          }, 5000);
        }
      });
    //console.log(input);
  };

  return (
    <div className="signup">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="container">
        <div className="row">
          <div className="col-lg-8 column d-flex justify-content-center align-items-center">
            <div className="d-flex flex-column w-100 p-5">
              <input
                className="p-2 my-3 input-signup"
                type="email"
                name="email"
                placeholder="Enter your email"
                onChange={change}
                value={input.email}
              />
              <input
                className="p-2 my-3 input-signup"
                type="username"
                name="username"
                placeholder="Enter your username"
                onChange={change}
                value={input.username}
              />
              <input
                className="p-2 my-3 input-signup"
                type="password"
                name="password"
                placeholder="Enter your password"
                onChange={change}
                value={input.password}
              />
              <button className="btn-signup p-2" onClick={submit}>
                Sign Up
              </button>
            </div>
          </div>
          <div className="col-lg-4 column d-flex justify-content-center align-items-center">
            <HeadingComp first="Sign" second="Up" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
