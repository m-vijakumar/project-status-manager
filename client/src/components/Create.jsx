import React ,{useState , useEffect} from 'react'
import AdminNavbar from './AdminNavbar';

export default function Create(props) {

  const [projectData, setProjectData] = useState({});
  const [projectContent, setProjectContent] = useState("");
  const [isSpinner,setSpinner] =useState(true);
  const [isSpinner1,setSpinner1] =useState(false);

  const githublog = async() =>{

    try{
      const resp = await fetch("/api/auth/verify/github");
      const data = await resp.json();
      // console.log(data)
      if(data.success === false){
          props.history.push("/admin");
        }
            
    }catch(e){
      console.log("err", e);
      props.history.push("/admin");

    }
  }

  const getContent = (content)=>{
    setProjectContent(content)
  }

  const handleChange = e => {
    setProjectData({ ...projectData, [e.target.name]: e.target.value });
  };

  useEffect(()=>{
    githublog();
    setSpinner(false)
  },[])

  const handleSubmit = async (e) => {
         
    try{
      if( !projectData.title ){
    
        alert("fill the details")
      }else{
            
        const projectdata = {              
          title: projectData.title,
          description:projectData.description, 
        };
     
        setSpinner1(true)
        e.persist();
        const response = await fetch('/api/user/projects/create' ,{

          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          mode:"cors",
          body :JSON.stringify(projectdata)
        })
        const data = await response.json();

        if (data.error === false) {
          alert("Contact Added");
          props.history.push("/dashboard");
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

    const sp1 =  <button className="btn btn-primary float-right" type="button" disabled>
        <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
        Adding...
      </button>
    
    const sp =  <input type="button" name="register"  value={isSpinner1 ? sp1 :"Add Project"} className="btn btn-primary float-right" onClick={handleSubmit} />
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
              <input type="text" class="form-control md-2" name="title"  placeholder="name"/>
            </div>

            <div class="form-group ">
              <label >Descrition</label>                
              <textarea rows="3" cols="15" className="form-control" name="description" placeholder="Description"></textarea>
            </div>

          </div>
            
          <div className="container " >{isSpinner1 ? sp1 :sp }</div>
        
          </div>
          
        </>
    )
}
}