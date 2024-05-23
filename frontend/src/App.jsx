import CssBaseline from '@mui/material/CssBaseline';
import Home from './page/Home';
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer';
import { Route, Routes } from 'react-router-dom'
import Login from './page/Login'
import Register from './page/Register';
import JobTable from './components/JobTable/JobTable';
import Profile from './page/Profile';

function App() {


  return (
    <>

      <CssBaseline />

      <Header />
  
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='signup' element={<Register/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='myprofile' element={<Profile/>}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App
