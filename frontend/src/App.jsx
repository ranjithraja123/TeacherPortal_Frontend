import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './components/Navbar/NavBar.jsx'
import Signup from './pages/signup/Signup.jsx'
import Login from './pages/login/Login.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import DataTable from './components/dataTable/DataTable.jsx'
import { Toaster } from 'react-hot-toast'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      {/* <div className='p-5'> */}
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/dataTable' element={<DataTable />} />
        </Routes>
      {/* </div> */}

      <Toaster />
      {/* <Signup />
    <Login /> */}
    </>
  )
}

export default App
