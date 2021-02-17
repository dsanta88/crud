import { isEmpty } from "lodash"
import React, { useState, useEffect } from "react"
import { size } from "lodash"
import shortid from "shortid"
import { addDocument, getColletions } from "./actions"

function App() {
  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState([])
  const [editMode, setEditMode] = useState(false)
  const [id, setId] = useState("")
  const [error, setError] = useState(null)

  useEffect(() => {
   (async ()=>{
     const result= await getColletions("tasks")
     if(result.statusResponse)
     {
      setTasks(result.data)
     }
 
   })()
  }, [])

  const validForm = () => {
    let isValid = true;
    setError(null);
    if (isEmpty(task)) {
      setError("Debes ingresar una taréa");
      isValid = false;
    }

    return isValid;
  };

  const addTask = async (e) => {
    e.preventDefault();

    if (!validForm()) {
      return;
    }

    const result = await addDocument("tasks", {name: task} )
    console.log(result)
    if(!result.statusResponse)
    {
     setError(result.error)
     return
    }
    
    setTasks([...tasks, {id:result.data.id, name:task}]);
    setTask("");
  }

  const deleteTask = (id) => {
    const filteredTasks = tasks.filter((t) => t.id !== id);
    console.log(filteredTasks);
    setTasks(filteredTasks);
  }

  const editTask = (item) => {
    setTask(item.name);
    setEditMode(true);
    setId(item.id);
  }

  const saveTask = (e) => {
    e.preventDefault();
    if (!validForm()) {
      return;
    }

    const editedTaks = tasks.map((item) =>
      item.id === id ? { id, name: task } : item
    )
    setTasks(editedTaks);
    setEditMode(false);
    setTask("");
    setId("");
  }

  return (
    <div className="container mt-5">
      <hr />
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Lista Tareas</h4>
          {size(tasks) == 0 ? (
           <li className="list-group-item"> No hay tareas programadas</li>
          ) : (
            <ul className="list-group">
              {tasks.map((item) => (
                <li className="list-group-item" key={item.id}>
                  <span className="lead">{item.name}</span>
                  <button
                    className="btn btn-danger btn-sm float-right mx-2"
                    onClick={() => deleteTask(item.id)}
                  >
                    Eliminar
                  </button>
                  <button
                    className="btn btn-info btn-sm float-right"
                    onClick={() => editTask(item)}
                  >
                    Editar
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="col-4">
          <h4 className="text-center">
            {editMode ? "Modificar Taréa" : "Agragar Tarea"}
          </h4>
          <form onSubmit={editMode ? saveTask : addTask}>
           {
             error && <span className="text-danger">{error}</span>
           }
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Ingrese la taréa.."
              onChange={(text) => setTask(text.target.value)}
              value={task}
            />
         
            <button
              className={
                editMode
                  ? "btn btn-warning btn-block"
                  : "btn btn-dark btn-block"
              }
              type="submit"
            >
              {editMode ? "Guardar" : "Agregar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default App;
