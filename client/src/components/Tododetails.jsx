import React, { useState ,useEffect} from 'react'

export default function Tododetails(props) {

    const [todoContent, setTodoContent] = useState(props.todo);
    const deltodo =()=>{
        props.deltodo(props.todo._id);
    }
    const updatetodos =()=>{
        console.log("todoContent,", todoContent)
        props.updateTodo(todoContent);
    }

    const updateTodo =()=>{
        setTodoContent({...todoContent,status : !todoContent.status })
        updatetodos()
    }


    const getStyle =()=>{
        return{
            backgroundColor : '#50D689  ',
            padding : '10px ',
            textDecoration : props.todo.status ?
            'line-through' : 'none',
            border:"0.5px solid black"
     }}
     
    useEffect(() => {
        setTodoContent(props.todo)
    }, [])


    
    return (

        <div style={getStyle()}>
           
            <h6>  <input type="checkbox" className="checkbox" checked={props.todo.status} onChange={updateTodo} />
             {"  "}{props.todo.task}
             <button onClick={deltodo} style={btnStyle}>x</button>
             </h6>
             
        </div>
    );
}

const btnStyle = {
    backgroundColor : '#1C1D1C ',
    color: "#fff",
    border:'none',
    padding : '0px 5px 0px 5px',
    borderRadius : '50%',
    cursor :'pointer',
    float:'right'
}