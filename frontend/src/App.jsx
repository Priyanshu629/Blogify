import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import Home from './components/Home'
import Createpost from './components/Createpost'
import MyPost from './components/MyPost'
import './index.css'


const App = () => {
  return (
   
   <BrowserRouter>
   <Routes>
    <Route path='/home' Component={Home}></Route>
    <Route path='/mypost' Component={MyPost}></Route>
    <Route path='/createpost' Component={Createpost}></Route>
    <Route path='/' Component={Login} />
    <Route path='/register' Component={Register} />
   </Routes>
   
   </BrowserRouter>
  
  )
}

export default App
