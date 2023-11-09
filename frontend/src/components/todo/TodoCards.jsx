import React from "react";
import "./TodoCard.css";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

const TodoCards = ({ title, body, id, delId, display }) => {
  return (
    <div className="p-3 todo-card">
      <div>
        <h5>{title}</h5>
        <p>{body.split("", 77)}...</p>
      </div>
      <div className="d-flex justify-content-around">
        <div
          className="d-flex justify-content-between align-items-center card-icon-head  px-2 py-1 text-success"
          onClick={() => {
            display("block");
          }}
        >
          <AiFillEdit className="todo-cards-icons edit" />
          Update
        </div>
        <div
          className="d-flex justify-content-between align-items-center card-icon-head px-2 py-1 text-danger"
          onClick={() => {
            delId(id);
          }}
        >
          <AiFillDelete className="todo-cards-icons del" />
          Delete
        </div>
      </div>
    </div>
  );
};

export default TodoCards;
