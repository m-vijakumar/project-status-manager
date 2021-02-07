import React, { useEffect ,useState} from 'react'
import AdminNavbar from './AdminNavbar'
import "./../App.css"
import Projectdetails from './Projectdetails';



export default  function Dashboard(props) {

    const [isSpinner1,setSpinner1] =useState(false);
    const [isSpinner,setSpinner]=useState(true);
    const [projects,setProjects]=useState([]);
    const [userId , setUserId] = useState([])
    const [userData , setUserData] = useState([])
    const [errMessage , setErrMessage] = useState()


    const githublog = async() =>{

        try{
        const resp = await fetch("/api/auth/verify/github");
        const data = await resp.json();
        // console.log(data)
        if(data.success === false){
            props.history.push("/admin");
            }
            getAllProjects()
            
        }catch(e){
            console.log("err", e);
            props.history.push("/admin");

        }
    }
    
    const getAllProjects = async()=>{

        try {
          const resp = await fetch("api/user/projects/all-projects");
          const ProjectsData = await resp.json();
          console.log(ProjectsData.data.projects)
          if(ProjectsData.data.projects){
            await setProjects(ProjectsData.data.projects)
          }
        } catch (error) {
            console.log(error)
          return props.history.push("/login");
        }         
        // console.log(postsData)     
    }

    const updateProject = async(id,title)=>{
        setSpinner1(true)
        props.history.push(`/project/update/${id}/${title}`)
        setSpinner1(false)
    }

    const delProject = async(id)=>{
        try {
            if (!id) {
                alert("Internal ERROR...!")
            } else {
                setSpinner1(true)
                const response = await fetch('api/user/projects/delete',{
                    method: "DELETE",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"

                    },
                    mode:"cors",
                    body:JSON.stringify({projectId:id})
                })
                const data = await response.json();

                if (data.error === false) {
                    await getAllProjects()
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

    
    const showProjects = projects.map((project)=>{
        return <Projectdetails key={project._id} project={project} updateProject = {updateProject} delProject={delProject} />
    })

   const sp = <div className="spinner-border " role="status" id="spinner" style={{backgroundColor:"transparent"}}>
   <span className="sr-only">Loading...</span>
   </div> 

    useEffect(()=>{
        githublog();
        setSpinner(false)
        
    },[])


    if (isSpinner) {
        return (
            <div className="d-flex justify-content-center " >
                <div className="spinner-border" role="status" id="spinner">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
            )
    }else{
        return (
            <div>
                <AdminNavbar />
            
                {isSpinner1 ? sp : ''}
                <div className="AdminApp">
                    <h1>Welcome</h1>
                    <div className="d-flex justify-content-end mr-3" >
                    <a href="/projects/create"><button className="btn btn-primary"><h5>Add</h5></button></a>
                  </div>
                  <br />

                    {showProjects}
                    <br />
        
                </div>

                {errMessage}
            </div>
            
        )
    }
}
