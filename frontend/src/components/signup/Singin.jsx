import React, { useState } from "react";
import "./Signup.css";
import HeadingComp from "./HeadingComp";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../store";
import { useDispatch } from "react-redux";

const Singin = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [input, setInput] = useState({ email: "", password: "" });

  const change = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
    //console.log(input);
  };

  const submit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:1000/api/signin", input)
      .then((response) => {
        console.log(response);
        //console.log(response.data.others._id);
        if (
          response.data.message === "Please Sign Up First" ||
          response.data.message === "Password is Not Correct" ||
          response.data.message === "Some Error Occured"
        ) {
          toast.error(response.data.message);
        } else {
          toast.success("Login Successful !");
          setInput({ email: "", password: "" });
          sessionStorage.setItem("id", response.data.others._id);
          dispatch(authActions.login());
          setTimeout(() => {
            history("/todo");
          }, 3000);
        }
      });
    //console.log(input);
  };

  return (
    <div className="signup">
      <ToastContainer
        position="top-right"
        autoClose={3000}
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
          <div className="col-lg-4 column d-flex justify-content-center align-items-center">
            <HeadingComp first="Sign" second="In" />
          </div>
          <div className="col-lg-8 column d-flex justify-content-center align-items-center">
            <div className="d-flex flex-column w-100 p-5">
              <input
                className="p-2 my-3 input-signup"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={input.email}
                onChange={change}
              />
              <input
                className="p-2 my-3 input-signup"
                type="password"
                name="password"
                placeholder="Enter your password"
                value={input.password}
                onChange={change}
              />
              <button className="btn-signup p-2" onClick={submit}>
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Singin;
