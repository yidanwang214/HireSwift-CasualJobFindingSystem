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
      <div style={{ marginTop: '150px' }}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='signup' element={<Register/>}/>
          <Route path='/joblist' element={<JobList />} /> {/* Static route for JobList */}
          <Route path='/jobdescription/:jobid' element={<JobDescription/>}/>
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
