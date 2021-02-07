import React from 'react'

export default function Tododetails(props) {

    const deltodo =()=>{
        props.deltodo(props.todo._id);
    }
    const getStyle =()=>{
        return{
            backgroundColor : '#50D689  ',
            padding : '10px ',
            textDecoration : props.todo.completed ?
            'line-through' : 'none'
     }}

     const handleTodoClick = () =>{

        props.markComplete(props.todo.id)
      }
      
    return (

        <div style={getStyle()}>
           
            <h3>  <input type="checkbox" className="checkbox" checked={props.todo.status} onChange={handleTodoClick} />
             {"  "}{props.todo.task}
             <button onClick={deltodo} style={btnStyle}>x</button>
             </h3>
             
        </div>
    );
}

const btnStyle = {
    backgroundColor : '#1C1D1C ',
    color: "#fff",
    border:'none',
    padding : '5px 10px',
    borderRadius : '50%',
    cursor :'pointer',
    float:'right'
}