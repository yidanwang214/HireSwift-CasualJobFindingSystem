import CssBaseline from '@mui/material/CssBaseline';
import Home from './page/Home';
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer';
import { Route, Routes } from 'react-router-dom'
import Register from './page/Register';
import JobTable from './components/JobTable/JobTable';

function App() {


  return (
    <>

      <CssBaseline />

      <Header />
  
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='signup' element={<Register/>}/>
        <Route path='myjob' element={<JobTable/>}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App
