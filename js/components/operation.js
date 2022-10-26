import React, {useState} from "react";

import {removeOperation, setOperationTime} from "../api/operations";

function Operation(props) {
  const {description, operationId, onRemoveOperation, onUpdateOperation, status} = props;
  const [form, setForm] = useState(false);
  const [timeSpent, setTimeSpent] = useState(props.timeSpent);


  const removeOperationHandler = () => {
    removeOperation(operationId, () => onRemoveOperation(operationId))
  };

  const formHandler = (event) => {
    event.preventDefault();
    const [time] = event.target;

    if (Number(time.value)) {
      const operation = {
        description: description,
        timeSpent: time.value,
      };

      setOperationTime(operationId, operation, () => onUpdateOperation(operationId, time.value));
      setTimeSpent(time.value);
    }

    event.target.reset();
    handleDisplayForm();
  };

  const handleDisplayForm = () => {
    setForm(prevState => !prevState);
  };

  const formatTime = (number) => {
    if (number < 59) {
        return `${number}m`
    }

    let minutes = number % 60;
    let hours = (number - minutes) / 60
    return `${hours}h ${minutes}m`;
  };

  return (
    <li
      className="list-group-item d-flex justify-content-between align-items-center">
      <div>
        {description}
        {/** <!-- Czas wyświetlany tylko jeżeli większy od 0 --> **/}

        {timeSpent > 0 &&
          <span className="badge badge-success badge-pill ml-2">
          {formatTime(timeSpent)}
        </span>
        }

      </div>
      {/** <!-- Formularz wyświetlany po naciśnięciu "Add time", po zapisie czasu znika --> **/}
      {form &&
        <form onSubmit={formHandler}>
          <div className="input-group input-group-sm">
            <input type="number"
                   className="form-control"
                   placeholder="Spent time in minutes"
                   style={{width: "12rem"}}/>

            <div className="input-group-append">
              <button className="btn btn-outline-success"><i
                className="fas fa-save"></i></button>

              <button onClick={handleDisplayForm} className="btn btn-outline-dark"><i
                className="fas fa-times false"></i></button>

            </div>
          </div>
        </form>
      }

      {/** <!-- div wyświetlany domyślnie, znika po wciśnięciu "Add time" --> **/}
      {!form &&
        <div>

          {/** <!-- Przycisk widoczny tylko jeżeli status zadania jest "open" --> **/}
          {status === "open" &&
            <button onClick={handleDisplayForm} className="btn btn-outline-success btn-sm mr-2">
              Add time
              <i className="fas fa-clock ml-1"></i>
            </button>
          }

          <button onClick={removeOperationHandler}
                  className="btn btn-outline-danger btn-sm"><i
            className="fas fa-trash"></i></button>

        </div>
      }

    </li>
  );
}

export default Operation;