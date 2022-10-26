import React, {useState, useEffect} from "react";

import Operations from "./operations";

import {getOperations} from "../api/operations";
import {removeTask, finishTask} from "../api/tasks";

function Task(props) {
  const {title, description, taskId, onRemoveTask, onFinishTask} = props;

  const [operations, setOperations] = useState(null);
  const [form, setForm] = useState(false);
  const [status, setStatus] = useState(props.status);

  useEffect(() => {
    getOperations(taskId, data => setOperations(data));
  }, []);

  const displayFormHandler = () => {
    setForm(prevState => !prevState);
  };

  /** Tasks **/
  const finishTaskHandler = () => {
    const task = {
      title: title,
      description: description,
      status: "closed",
    };
    finishTask(taskId, task, () => onFinishTask(taskId));
    setStatus("closed");
  };

  const removeTaskHandler = () => {
    removeTask(taskId, () => onRemoveTask(taskId));
  };

  /** Operations **/
  const addOperationHandler = (operation) => {
    setOperations(prevState => [...prevState, operation]);
  };

  const removeOperationHandler = (operationId) => {
    setOperations(prevState => prevState.filter(element => element.id !== operationId));
  };

  const updateOperationHandler = (operationId, time) => {
    setOperations(prevState => prevState.map(operation => {
      if (operation.id === operationId) {
        operation.timeSpent = time
      }
      return operation
    }))
  }

  return (
    <section className="card mt-5 shadow-sm">
      <div
        className="card-header d-flex justify-content-between align-items-center">
        <div>
          <h5>{title}</h5>
          <h6 className="card-subtitle text-muted">{description}</h6>
        </div>

        <div>
          {/** <!--
            Przyciski "Add operation" i "Finish" mają być widoczne
            tylko jeżeli status zadania jest "open"
          --> **/}

          {status === "open" &&
            <>
              <button onClick={displayFormHandler} className="btn btn-info btn-sm mr-2">
                Add operation
                <i className="fas fa-plus-circle ml-1"></i>
              </button>

              <button onClick={finishTaskHandler} className="btn btn-dark btn-sm">
              Finish
              <i className="fas fa-archive ml-1"></i>
              </button>
            </>
          }

          {/** <!--
            Przycisk usuwania ma być widoczny tylko
            jeżeli nie ma żadnych operacji w zadaniu
          --> **/}
          {operations && operations.length <= 0 &&
            <button onClick={removeTaskHandler}
                    className="btn btn-outline-danger btn-sm ml-2">
              <i className="fas fa-trash false"></i>
            </button>
          }
        </div>
      </div>

      {/** <!-- Komponent Operations --> **/}
      <Operations taskId={taskId}
                  form={form}
                  onSetForm={displayFormHandler}
                  operations={operations}
                  onSetOperations={addOperationHandler}
                  onRemoveOperation={removeOperationHandler}
                  onUpdateOperation={updateOperationHandler}
                  status={status} />
    </section>
  );
}

export default Task;