import { isEmpty } from 'lodash'
import React, {useState} from 'react'
import shortid from 'shortid'


function App() {

  const [task, setTask]=useState("")
  const [tasks, setTasks]=useState([])

   const addTask=(e)=>{
    e.preventDefault()
     if(isEmpty(task)){
       console.log("Task Vacio")
       return
     }

     const newTaksk ={
       id:shortid.generate(),
       name:task
     }
    
     setTasks([ ...tasks, newTaksk])
     console.log(tasks)
     setTask("")
   }


  return ( 
    <div className="container mt-5">
  
      <hr/>
      <div className="row">
        <div className="col-8">
        <h4 className="text-center">Lista Tareas</h4>
         <ul className="list-group">
           {
             tasks.map((t)=>(
               <li className="list-group-item" key={t.id}>
                 <span className="lead">{t.name}</span>
                 <button className="btn btn-danger btn-sm float-right mx-2">Eliminar</button>
                 <button className="btn btn-info btn-sm float-right">Editar</button>
               </li>
             ))
           }
         </ul>
        </div>
        <div className="col-4">
           <h4 className="text-center">Formulario</h4>
           <form onSubmit={addTask}>
             <input
              type="text"
              className="form-control mb-2"
              placeholder="Ingrese la taréa.."
              onChange={(text)=>setTask(text.target.value)}
              value={task}
             />
                <button className="btn btn-dark btn-block" type="submit">Agregar</button>
           </form>
        </div>
      </div>
    </div>
  )
}

export default App
