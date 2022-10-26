import React from "react";

import {addTask} from "../api/tasks";

function NewTask(props) {
  const {onNewTask} = props;

  const addTaskHandler = (event) => {
    event.preventDefault();

    const [title, description] = event.target;
    const task = {
      title: title.value,
      description: description.value,
      status: "open",
    };

    addTask(task, data => onNewTask(data))
    event.target.reset();
  };

  return (
    <div className="card shadow">
      <div className="card-body">
        <h1 className="card-title">New task</h1>

        <form onSubmit={addTaskHandler}>
          <div className="form-group">
            <input type="text"
                   className="form-control"
                   name="title"
                   placeholder="Title"/>
          </div>

          <div className="form-group">
            <input type="text"
                   className="form-control"
                   name="description"
                   placeholder="Description"/>
          </div>

          <button className="btn btn-info">
            Add task
            <i className="fas fa-plus-circle ml-1"></i>
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewTask;