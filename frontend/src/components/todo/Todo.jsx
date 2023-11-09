import React, { useEffect, useState } from "react";
import "./Todo.css";
import TodoCards from "./TodoCards";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Update from "./Update";
import axios from "axios";

let id = sessionStorage.getItem("id");

const Todo = () => {
  const [input, setInput] = useState({ title: "", body: "" });
  const [array, setArray] = useState([]);

  const show = () => {
    document.getElementById("textarea").style.display = "block";
  };

  const change = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const submit = async () => {
    if (input.title === "" || input.body === "") {
      toast.error("Title or Body Should Not Be Empty !");
    } else {
      if (id) {
        await axios
          .post("http://localhost:1000/addTask", {
            title: input.title,
            body: input.body,
            id: id,
          })
          .then((response) => {
            console.log(response);
          });
        //setArray([...array, input]);
        setInput({ title: "", body: "" });
        toast.success("Your Task Is Added");
      } else {
        setArray([...array, input]);
        setInput({ title: "", body: "" });
        toast.success("Your Task Is Added");
        toast.error("Your Task Is Not Saved ! Please SignUp");
      }
    }
  };

  const deleteId = async (cardID) => {
    console.log(id);
    await axios
      .delete(`http://localhost:1000/deleteTask/${cardID}`, {
        data: { id: id },
      })
      .then((response) => {
        console.log(response.message);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const dis = (value) => {
    console.log(value);
    document.getElementById("todo-update").style.display = value;
  };

  useEffect(() => {
    const fetch = async () => {
      await axios
        .get(`http://localhost:1000/getTask/${id}`)
        .then((response) => {
          setArray(response.data.list);
        });
    };
    fetch();
  }, [submit]);

  return (
    <>
      <div className="todo">
        <ToastContainer />
        <div className="todo-main container d-flex justify-content-center align-items-center flex-column">
          <div className="d-flex flex-column todo-inputs-div w-50 p-1">
            <input
              type="text"
              placeholder="Title"
              name="title"
              value={input.title}
              className="my-2 p-2 todo-inputs"
              onClick={show}
              onChange={change}
            />
            <textarea
              id="textarea"
              type="text"
              placeholder="Body"
              name="body"
              value={input.body}
              className="my-2 p-2 todo-inputs"
              onChange={change}
            />
          </div>
          <div className="w-50 d-flex justify-content-end my-1">
            <button className="btn-add my-3 py-1 px-2" onClick={submit}>
              Add
            </button>
          </div>
        </div>
        <div className="todo-body">
          <div className="container-fluid">
            <div className="row">
              {array &&
                array.map((element, index) => (
                  <div className="col-lg-3 col-10 mx-5 my-2" key={index}>
                    <TodoCards
                      id={element._id}
                      delId={deleteId}
                      display={dis}
                      title={element.title}
                      body={element.body}
                    />
                  </div>
                ))}
              {array.length === 0 && (
                <>
                  <h1>Nothing to display</h1>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="todo-update" id="todo-update">
        <div className="container update">
          <Update display={dis} />
        </div>
      </div>
    </>
  );
};

export default Todo;
