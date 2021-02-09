import React ,{useState ,useEffect}from 'react'
import { useLocation, useHistory } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';

export default function Update(props) {

    const [content, setContent] = useState({});
    const [editButton ,setEditButton] = useState({title:true,imgsrc:true,description:true})
    const [projectId , setProjectId] = useState("");
    const [message, setMessage] = useState("");
    const [isSpinner,setSpinner] =useState(true);
    const [isSpinner1,setSpinner1] =useState(false);
    const location = useLocation();
    const history = useHistory();

    const githublog = async() =>{

      try{
      const resp = await fetch("/api/auth/verify/github");
      const data = await resp.json();
      // console.log(data)
      if(data.success === false){
          props.history.push("/");
          }
          
      }catch(e){
          console.log("err", e);
          props.history.push("/");

      }
    }    

    const handleChange = e => {
   
      setContent({ ...content, [e.target.name]: e.target.value });
    };

    const getProjectContent = async(e)=>{
        // e.persist();
        // console.log(projectId)
        try{
        const response = await fetch('/api/user/projects/get/project' , {
            method: "POST",
            headers: {
            Accept: "application/json",
            "Content-Type": "application/json"

            },
            mode:"cors",
            
            body :JSON.stringify({projectId:location.pathname.split("/")[3]})
        })
    
        const data = await response.json();
        if (data.error === false) {
          setContent(data.data)
          setSpinner(false)
          console.log("adwedwedW",data)
        } else {
          alert("error..!!!");
          props.history.push("/404");
          setSpinner(false)
        }
        // console.log(data.data)
      }catch(err){
        alert("error..!");
        //  props.history.push("/404");
        setSpinner(false)
      }

    }
    useEffect(()=>{
        try {           
          githublog();
          setProjectId(location.pathname.split("/")[3]);
          getProjectContent();                
        } catch (error) {
            // history.push("/")
            alert(error)
        }

    },[])      

    const getContent = (content)=>{
        setContent(content)
    }
    const handleSubmit = async (e) => {
         
        try{
          e.preventDefault()
        if( !projectId ||!content.title ){
    
          setMessage("fill the details")
        }else{
            
          const contactdata = {
            projectId:projectId,        
            title : content.title,
            description:content.description,
            todos:content.todos
          };
       console.log(contactdata)
          setSpinner1(true)
          e.persist();
          const response = await fetch('/api/user/projects/update' , {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
        
            },
            mode:"cors",
            body :JSON.stringify(contactdata)
          })
          const data = await response.json();
          // console.log(data)
          if (data.error === false) {
          
            // console.log(data.success)
            props.history.push("/dashboard");
            setSpinner1(false)
            
          }else{
              setSpinner1(false) ;
              alert(data.msg);
              props.history.push("/404");
              setSpinner(false)
            }
        }
      }catch(e){setSpinner1(false) ;
         alert("Internal Error...")
         props.history.push("/dashboard");
         setSpinner(false)
        }
      }
      
      const sp1 =  <button className="btn btn-primary float-right " type="button" disabled>
      <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
      Updating...
    </button>
    
    const sp =  <input type="button" name="register"  value={isSpinner1 ? sp1 :"Update Project"} className="btn btn-primary float-right" onClick={handleSubmit} />
        if (isSpinner) {
          return (
            <div className="d-flex justify-content-center " >
              <div className="spinner-border" role="status" id="spinner">
                  <span className="sr-only">Loading...</span>
              </div>
            </div>
          )
      }else{
        return(
            
        <>
        <AdminNavbar />
        <div>
              
              
          <div onChange={handleChange} className="container">
          
          <div class="form-group ">
          <label >Title</label>                
              <input type="text" class="form-control md-2" name="title"  placeholder="Title" defaultValue={content.title}/>
          </div>
          
          
          <div class="form-group ">
          <label >Description</label>                
          <textarea rows="3" cols="15" className="form-control" name="description" placeholder="description" defaultValue={content.description}></textarea>
          </div>
          </div>
          
          <div className="container " >{isSpinner1 ? sp1 :sp }</div>
      </div>
          
        </>
    )
}
}
