import CssBaseline from '@mui/material/CssBaseline';
import Home from './page/Home';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header'
import { Route, Routes } from 'react-router-dom'
import Register from './page/Register';
import JobList from './page/JobList'; 
import JobDescription from './page/JobDescription';
import './index.css';

function App() {


  return (
    <>
      <CssBaseline />
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='signup' element={<Register/>}/>
        <Route path='/jobs' element={<JobList />} /> {/* Static route for JobList */}
        <Route path='/jobdescription' element={<JobDescription/>}/>
      </Routes>
      <Footer />
    </>
  )
}

export default App
