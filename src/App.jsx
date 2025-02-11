import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './App.css'
import LayOutOne from './layout/LayOutOne'
import Home from './pages/Home'
import Register from './components/register/Register'
import Login from './components/login/Login'
import app from './Firebase'
import ResetPassword from './components/resetPassword/ResetPassword'
import User from './pages/User'
import Request from './pages/Request'
import Friends from './pages/Friends'
import BlockList from './pages/BlockList'
import Message from './pages/Message'


function App() {
  const myRoute = createBrowserRouter(createRoutesFromElements(
    <Route>
    <Route path='/' element={<LayOutOne/>}>
        <Route index element={<Home/>}/>
        <Route path='/User' element={<User/>}/>
        <Route path='/Request' element={<Request/>}/>
        <Route path='/Friends' element={<Friends/>}/>
        <Route path='/BlockList' element={<BlockList/>}/>
        <Route path='/Message' element={<Message/>}/>
    </Route>
      <Route path='/Register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/ResetPassword' element={<ResetPassword/>}/>
    </Route>

      
  ))

  return (
    <>
      <RouterProvider router={myRoute}/>
    </>
  )
}

export default App
