import { useState } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import './App.css'
import RegisterPage from './view/pages/RegisterPage'
import LoginPage from './view/pages/LoginPage'
import ProtectedRoute from './view/components/RouteProtected'
import AppPage from './view/pages/AppPage'
import ChatPage from './view/pages/ChatPage'

function App() {

  return (
    <>
        <BrowserRouter>
            <Routes>
              <Route path={"/register"} element={<RegisterPage/>}/>
              <Route path={"/login"} element={<LoginPage/>}/>

              <Route element={<ProtectedRoute/>}>
                  <Route path={"/chat/*"} element={<AppPage />}>
                      <Route path={'conversation/:id/:name'} element={<ChatPage/>}/>
                  </Route>
              </Route>
              
              <Route path={"/*"} element={<h1>Ruta desconocida</h1>}/>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
