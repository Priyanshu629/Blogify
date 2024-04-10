import {useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'



const Login = () => {
  const [name,setName]=useState('')
  const [password,setPassword]=useState('')
 
  const handleLogin=()=>{

    if( !name || !password){
     return alert('all the fileds required')
    }
   
    axios.post(`http://localhost:5000/login`,{name,password},
    
   {
    headers:{
      "Content-Type":"application/json"
    },
     
   },
   {withCredentials:true}
    ).then((response)=>{

      if(response.status==200){
      
  
   
        localStorage.setItem('token',response.data.token) 
        localStorage.setItem('username',response.data.username) 
        localStorage.setItem('useremail',response.data.useremail) 
        localStorage.setItem('userid',response.data.userid) 
        
        
         
       document.getElementById('animatediv').style.display='block'
       document.getElementById('logindiv').style.display='none'
        setInterval(()=>{
          window.location.href='/home'
    
        },3000)
           
      }

    }).catch((error)=>{
      if(error.response && error.response.status===422){
        alert("Invalid")
      }
    })
    
  
  }
  return (
    <div className='d-flex  w-100 vh-100 align-items-center justify-content-center'>
       
       <div className='animate' id='animatediv'>    
       </div>
    <div className='w-45  p-3 rounded-3 ' style={{backgroundColor:"aqua"}} id='logindiv'>
      <h1 className='text-center'>Welcome to Blogify</h1>
      <p style={{fontStyle:"italic"}}>Make an account  and start writing blogs and share your knowledge</p>
      <h2 className='text-center text-primary'>Login</h2> 
     <div>
      <label htmlFor="">User Name</label>
      <input type="text" className='form-control  mb-3' placeholder='Enter Your username ' 
      value={name} onChange={(e)=>setName(e.target.value)}/>
     </div>
     <div>
      <label htmlFor="">Password</label>
      <input type="password" className='form-control' placeholder='Enter Your Password ' 
        value={password} onChange={(e)=>setPassword(e.target.value)}/>
     </div>
    <button className='btn btn-success mt-2 w-100' type='submit' onClick={handleLogin}>Login</button>

    <p className='mt-2'>Dont have an account?</p>
    <Link to={'/register'} className='btn btn-success mt-2 w-100'>Register</Link>

    </div>
  
  </div>
  )
}

export default Login
