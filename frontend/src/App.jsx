import React, { useState } from 'react'
import {BrowserRouter,Routes,Route, Navigate} from 'react-router-dom';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';



function Logout(){
  localStorage.clear()
  return <Navigate to='/login'/>
}
function RegisterAndLogout(){
  localStorage.clear()
  return <Register/>
}

function App() {
  

  return (
    <>
    
    <BrowserRouter>
    
      <Routes>
        <Route
        path = '/'
        element={
          <ProtectedRoute>
            <Home log = "Logout()"/>
          </ProtectedRoute>
        }
        />
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/logout' element={<Logout/>}></Route>

        <Route path="/register" element={<RegisterAndLogout/>}></Route>
        <Route path="*" element={<NotFound/>}></Route>
      </Routes>
    </BrowserRouter>

      
    </>
  )
}

export default App
