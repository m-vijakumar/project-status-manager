import React ,{useState ,useEffect}from 'react'
import { useLocation, useHistory } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';

export default function Update(props) {

    const [content, setContent] = useState({});
    const [editButton ,setEditButton] = useState({title:true,imgsrc:true,description:true})
    const [postId , setPostId] = useState("");
    const [message, setMessage] = useState("");
    const [isSpinner,setSpinner] =useState(true);
    const [isSpinner1,setSpinner1] =useState(false);
    const location = useLocation();
    const history = useHistory();

    // const userlog= async ()=>{

    //   try{
    //   const resp = await fetch("/api/auth/verfiy");
    //   const data = await resp.json();
    //   if(data.success === false){
    //     return props.history.push("/login");
    //    }
    //   }catch(e){
    //       // console.log(e);
    //      return props.history.push("/login");
    //   }
    // }

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

    const handleChange = e => {
   
      setContent({ ...content, [e.target.name]: e.target.value });
    };

    const getProjectContent = async(e)=>{
        // e.persist();
        // console.log(postId)
        try{
        const response = await fetch('/api/user/projects/get/project' , {
            method: "POST",
            headers: {
            Accept: "application/json",
            "Content-Type": "application/json"

            },
            mode:"cors",
            
            body :JSON.stringify({postId:location.pathname.split("/")[3]})
        })
    
        const data = await response.json();
        if (data.error === false) {
          setContent(data.data)
          setSpinner(false)
        } else {
          alert("error..!!!");
          props.history.push("/dashboard");
          setSpinner(false)
        }
        // console.log(data.data)
      }catch(err){
        alert("error..!");
         props.history.push("/dashboard");
        setSpinner(false)
      }

    }
    useEffect(()=>{
        try {           
          githublog();
          setPostId(location.pathname.split("/")[3]);
          getAddressContent();                
        } catch (error) {
            history.push("/")
        }

    },[])      

    const getContent = (content)=>{
        setContent(content)
    }
    const handleSubmit = async (e) => {
         
        try{
        if( !postId ||!content.name ||!content.phoneno ||!content.address){
    
          setMessage("fill the details")
        }else{
            
          const contactdata = {
            postId:postId,        
            name : content.name,
            phoneno:content.phoneno,
            address:content.address,
          };
       console.log(contactdata)
          setSpinner1(true)
          e.persist();
          const response = await fetch('/api/address/edit' , {
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
              props.history.push("/dashboard");
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
    
    const sp =  <input type="button" name="register"  value={isSpinner1 ? sp1 :"Update Contact"} className="btn btn-primary float-right" onClick={handleSubmit} />
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
          <label >Name</label>                
              <input type="text" class="form-control md-2" name="name"  placeholder="Name" defaultValue={content.name}/>
          </div>
          
          <div class="form-group ">
          <label >Phone No</label>                
          <input type="number" class="form-control md-2" name="phoneno" placeholder="phoneno" onInput={(e) => e.target.value = e.target.value.slice(0, 12)} defaultValue={content.phoneno}/>
          </div>
          <div class="form-group ">
          <label >Address</label>                
          <textarea rows="3" cols="15" className="form-control" name="address" placeholder="Address" defaultValue={content.address}></textarea>
          </div>
          </div>
          
          <div className="container " >{isSpinner1 ? sp1 :sp }</div>
      </div>
          
        </>
    )
}
}
