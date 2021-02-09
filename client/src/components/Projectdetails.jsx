import React,{useState , useEffect} from 'react'
import { Redirect , useHistory} from 'react-router-dom';
import '../Admin.css'
import Tododetails from './Tododetails';

export default function Projectdetails(props) {
    
    const [show,setShow] = useState(false);
    const [task,setTask] = useState(null);
    const [isSpinner1,setSpinner1] =useState(false);
    const [isSpinner,setSpinner]=useState(true);

    const history = useHistory();

    const updateProject = () =>{
        props.updateProject(props.project._id,props.project.title)
    }
    const delProject = async()=>{
        props.delProject(props.project._id)
    }

    const exportgist = async()=>{

        let mdFileData = `### ${props.project.title} \n\n`
        var mddata = props.project.todos.map(todo=>{
                        var status = todo.status ? "[x]" : "[ ]"
                        mdFileData +=`- ${status} ${todo.task} \n`
                    })
                console.log(mdFileData)
        try{
            if( !mdFileData ){
            
                alert("in valid data")
            }else{               
        
                const filedata = {
                    projectId : props.project._id, 
                    projectName : props.project.title, 
                    mdData : mdFileData
                }
                setSpinner1(true)
                // e.persist();
                const response = await fetch('/api/user/projects/todos/exportgist' ,{

                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    },
                    mode:"cors",
                    body :JSON.stringify(filedata)
                })

                const data = await response.json();

                if (data.error === false) {
                    alert("todo Added");
                    props.setprojects()
                    setSpinner1(false)       
                }else{
                    setSpinner1(false);
                    alert(data.msg)
                }
        
            }
        }catch(e){
            setSpinner1(false) ;
            alert("Internal Error...")
            console.log(e)
        }            

    }

    const onSubmit = async(e)=>{
        // e.preventDefault();

        try{
          if( !task ){
        
            alert("fill the details")
          }else{
                
            const todoData = {              
              projectId: props.project._id,
              todo:task
            };
         
            console.log(todoData)
            setSpinner1(true)
            e.persist();
            const response = await fetch('/api/user/projects/add-todo' ,{
    
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              },
              mode:"cors",
              body :JSON.stringify(todoData)
            })
            const data = await response.json();
            // console.log("data")
            // console.log(data)
            if (data.error === false) {
                
              alert("Task Added");
               setShow(true)
              setSpinner1(false)       
            }
              setSpinner1(false);
              alert(data.msg)
              props.setprojects()
          setShow(true)
        
          }
        }catch(error){
            console.log(error)
            alert("Internal Error in ProjectDetails...")
          setSpinner1(false) ;
          props.setprojects()
          setShow(true)
          console.log(e)
        }
      }    

    const onchange =(e)=>{ 
        setTask(e.target.value);
    }

    const deltodo = async(todoId)=>{
        try {
            
            if (!todoId || !props.project._id) {
                alert("Internal ERROR...!")
            } else {
                setSpinner1(true)
                const response = await fetch('api/user/projects/todo/delete',{
                    method: "DELETE",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    },
                    mode:"cors",
                    body:JSON.stringify({projectId:props.project._id,todoId:todoId})
                })
                const data = await response.json();
                console.log(data)
                if (data.error === false) {

                    alert("todo deleted")
                    props.setprojects()
                    setShow(true)
                    
                    setSpinner1(false)
                } else {
                    setSpinner1(false);
                    alert("error"+data.msg)        
                }
            }
        } catch (error) {
            setSpinner1(false) ;
            alert("Internal Error... in delproject")
        }
    }

    const updateTodo = async(todo)=>{
        try {
            
            if (!todo._id || !props.project._id) {
                alert("Internal ERROR...!")
            } else {
                setSpinner1(true)
                const todoData = {
                    projectId:props.project._id,
                    todoId:todo._id,
                    status: !todo.status,
                    task: todo.task
                }
                const response = await fetch('api/user/projects/todo/update',{
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    },
                    mode:"cors",
                    body:JSON.stringify(todoData)
                })
                const data = await response.json();
                console.log(data)
                if (data.error === false) {

                    alert("todo updated")

                    props.setprojects()
                    
                    setShow(true)
                    
                    setSpinner1(false)
                } else {
                    setSpinner1(false);
                    alert("error"+data.msg)        
                }
            }
        } catch (error) {
            setSpinner1(false) ;
            alert("Internal Error...")
        }
    }



    const showTodos =props.project.todos.map((todo)=>{
        return <Tododetails todo={todo} deltodo={deltodo} updateTodo={updateTodo} ></Tododetails>
    })

    return (

        <>
            
            <div className="postStyle">
            
                    <button  onClick={exportgist} className="exportButton" value={props.project._id}><i class="fas fa-file-export"></i></button>
                    <button onClick={delProject} className="delButton mr-3" value={props.project._id}><i class='fas fa-trash'></i></button>
                    <button onClick={updateProject} className="updateButton mr-3"><i class='fas fa-marker'></i></button>
                    
                <div onClick={()=>setShow(!show)}>
                    {"  "}{props.project.title}<br />
                    {"  "}{props.project.description}<br />
                </div>
                {show ? 
                    <div style={{visibility:show ? "visible":"hidden"}}>
                        <form onSubmit={onSubmit} style={{display :'flex'}}>
                            <input type="text" name="task"
                            style={{flex :10 ,padding: '10px',fontSize : '10px'}}
                            value={task}
                            onChange={onchange}
                            placeholder="Add Todo......"
                            />
                            <input type="submit"
                            value="Add Todo"
                            className="btn"
                            style={{flex :1,backgroundColor:"black",color:"white",padding:"0px",borderRadius:"0px"}}
                            />
                        </form>
                        {showTodos}
                    </div> : ""
                }
   
            </div>
        </>
    )
}
