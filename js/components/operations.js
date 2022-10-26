import React from "react";

import Operation from "./operation";

import {addOperation} from "../api/operations";

function Operations(props) {
  const {taskId, form, onSetForm, operations, onSetOperations, status} = props;

  const addOperationHandler = (event) => {
    const [description] = event.target;
    const operation = {
      description: description.value,
      timeSpent: 0,
    };
    addOperation(taskId, operation, data => onSetOperations(data));
    onSetForm();
    event.target.reset();
  }

  return (
    <>
      <div className="card-body">

        {form &&
          <form onSubmit={addOperationHandler}>
            <div className="input-group">

              <input type="text"
                     className="form-control"
                     placeholder="Operation description"/>

              <div className="input-group-append">
                <button className="btn btn-info">
                  Add
                  <i className="fas fa-plus-circle ml-1"></i>
                </button>
              </div>
            </div>
          </form>
        }

      </div>

    <ul className="list-group list-group-flush">
      {/** <!-- Komponenty Operation --> **/}
      {operations &&
        operations.map(operation => <Operation key={operation.id}
                                               description={operation.description}
                                               operationId={operation.id}
                                               onRemoveOperation={props.onRemoveOperation}
                                               onUpdateOperation={props.onUpdateOperation}
                                               timeSpent={operation.timeSpent}
                                               status={status}/>)
      }
    </ul>
  </>
  );
}

export default Operations;