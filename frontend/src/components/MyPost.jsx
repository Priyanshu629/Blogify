import React,{useEffect,useState} from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
const MyPost = () => {
  let token = localStorage.getItem("token");
  let username=localStorage.getItem("username")
  let useremail=localStorage.getItem("useremail")
  
    const [post, setPost] = useState([]);
    const navigate = useNavigate();
    
    
 
    //getting data
    useEffect(()=>{

        axios.get('/getpost',{
            headers:{
                "Content-Type":"application/json",
                "token":token
            }
        })
        .then(response=>{ 
          // console.log(response)
          setPost(response.data.mypost)
        }).catch(err=> console.log(err))
      
      },[])

    
      if (!token) {
        window.location.href='/'
      }
else{

   return (    
    <>
    <div className='w-100 '>
      <h1>profile</h1>
      <p className='h3'>User name : {username}</p>
      <p className='h3'>User email : {useremail}</p>
     
    </div>
    <hr />
   
    { post.map((posts,key)=>
    
    
           <div key={key}>
            
            <div className="card p-3 mt-3">
            <img src={`/${posts.image}`} width={"60%"} height={"400px"} className="mx-auto" />
              <div className="card-title">             
                <h1>{posts.title}</h1>
              </div>
              <div className="card-body">
                <p>{posts.body}</p>
              </div>   
            </div> 
           
            </div>
            
    )}
   

</>
   
   )
    }

} 



export default MyPost
