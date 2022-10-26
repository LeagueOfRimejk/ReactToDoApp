import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";

import {getTasks} from "./api/tasks";

import NewTask from "./components/NewTask";
import Task from "./components/Task";

function App() {
  const [tasks, setTasks] = useState(null);

  useEffect(() => {
    getTasks(data => setTasks(data));
  }, []);

  const handleAddNewTask = (task) => {
    setTasks(prevState => [...prevState, task])
  };

  const handleRemoveTask = (taskId) => {
    setTasks(prevState => prevState.filter(element => element.id !== taskId));
  };

  const handleFinishTask = (taskId) => {
    setTasks(prevState => prevState.map(task => {

      if (task.id === taskId) {
        task.status = "closed";
      }
      return task;
    }));
  };

  return (
    <>
      <NewTask onNewTask={handleAddNewTask} />
      {
        tasks &&
        tasks.map(task => <Task key={task.id}
                                title={task.title}
                                description={task.description}
                                taskId={task.id}
                                status={task.status}
                                onRemoveTask={handleRemoveTask}
                                onFinishTask={handleFinishTask}/>)
      }
    </>
  );
}

ReactDOM.render(
  <App />,
  document.querySelector("#app")
);