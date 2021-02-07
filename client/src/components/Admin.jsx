import React, {useEffect, useState }  from 'react'

export default function Home() {

    const [isSpinner,setSpinner] =useState(true);
    const [message , setMessage] =useState("");
   

    useEffect( () => {
        
        setSpinner(false)
    }, []);

    if (isSpinner) {
        return (
          <div className="spinner-border" role="status" id="spinner">
            <span className="sr-only">Loading...</span>
          </div>
        )
    }else{

            return (
                <div className="App">
                <br /> <br />
                    <h1>Welcome </h1>
        
                    <h4 style={{display:"flex",justifyContent:"center"}}><a href="http://localhost:5000/api/auth/github">Signup With Github</a></h4>

                    <br />
                    <br />
                    {message}
                </div>
            )
        }
   
}
