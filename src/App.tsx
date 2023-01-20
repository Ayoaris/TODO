// Importing React, FC, ChangeEvent, useState
import React, { FC, ChangeEvent, useState } from "react";
import "./App.css";
import { ITask } from "./interfaces"; 
import TodoTask from "./components/TodoTask";


//  giving the type to App component (FC) function component.

const App: FC = () => {

// useState hook to set the state of the component {task, deadline, todoList} and assign the type of the state

  const [task, setTask] = useState<string>("");
  const [deadline, setDeadline] = useState<number>(0);
  const [todoList, setTodoList] = useState<ITask[]>([]);
  
// to handle the change in the input field and set the state of the component
  
const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "task") {
      setTask(e.target.value);
   
    } else {
      setDeadline(Number(e.target.value));
    }
};
  
// to add the task to the todoList
  const addTask = () => {
    if (task === "") {
      alert("Please enter the task");
      return;
    }
// storing the initial state of the component in newTask
    const newTask = { taskName:task, deadline:deadline };
    setTodoList([...todoList, newTask]); 

 // clearing the input field after adding the task
    setTask("");
    setDeadline(0);
  }
  // to delete the task from the todoList
  const completedTask = (taskNameToDelete: string) => { 
     setTodoList(todoList.filter((task) => task.taskName !== taskNameToDelete));  
  }
  return (
    <div className="App"> 
      <div className="header">
        <div className="inputContainer ">
          <input type="text" placeholder="Please add task" name="task" value={task} 
            onChange={handleChange} />
          
          <input
            type="number"
            placeholder="Deadline (in Days )..." name="deadline"
            value={deadline}
            onChange={handleChange} 
          />

        </div>
        <button className="add-btn" onClick={addTask}>Add Task</button>
      </div>
    
      <div className="todoList ">
  
        {todoList.map((task:ITask, key:number) => { 
          return (

  // passing the task and completedTask as props to TodoTask component
            <TodoTask key={key} task={task} completedTask={completedTask} />
          );
        }
        )}
      </div>
    </div>
  );
};

export default App; 
