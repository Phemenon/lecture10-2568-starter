import TaskCard from "../components/TaskCard";
import TodoModal from "../components/Modal";
import { type TaskCardProps } from "../libs/Todolist";
import { useState, useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState<TaskCardProps[]>([]);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  //useEffect runs at first and after tasks is updated
  useEffect(() => {
    if(isFirstLoad) {
      setIsFirstLoad(false);
      return;
    }
    // console.log("Jesus Kung Fu");
    const srrTasks = JSON.stringify(tasks);
    // console.log(srrTasks);
    localStorage.setItem("tasks", srrTasks);
  }, [tasks]);

  useEffect(() => {
    const strTasks = localStorage.getItem("tasks");
    if(strTasks === null) {
      return;
    }
    const loadedTasks = JSON.parse(strTasks);
    setTasks(loadedTasks);
  },[]);

  const handleAdd = (newTask: TaskCardProps) => {
    //make a new array based on old "tasks" and add newTask as last one
    const newTasks = [...tasks, newTask];
    setTasks(newTasks);
  };

  // Define the function with proper type
  const deleteTask = (taskId: string) => {
    const newTasks = tasks.filter((task: TaskCardProps) => task.id !== taskId);
    setTasks(newTasks);
  };

  // Define the function with proper type
  const toggleDoneTask = (taskId: string) => {
    const newTasks = tasks.map((todo: TaskCardProps) =>
      todo.id === taskId ? { ...todo, isDone: !todo.isDone } : todo
    );
    setTasks(newTasks);
  };

  const doneLength = tasks.filter((task) => task.isDone).length;

  return (
    <div className="col-12 m-2 p-0">
      <div className="container text-center">
        <h2>Todo List</h2>
        {/* Task summary */}
        <span className="m-2">
          All ({tasks.length}) Done ({doneLength})
        </span>
        {/* Modal Component */}
        <button
          type="button"
          className="btn btn-primary my-3"
          data-bs-toggle="modal"
          data-bs-target="#todoModal"
        >
          Add
        </button>
        <TodoModal onAdd={handleAdd} />
        <>
          {tasks.map((task) => (
            <TaskCard
              id={task.id}
              title={task.title}
              description={task.description}
              deleteTaskFunc={deleteTask}
              toggleDoneTaskFunc={toggleDoneTask}
              isDone={task.isDone}
              key={task.id}
            />
          ))}
        </>
      </div>
    </div>
  );
}

export default App;
