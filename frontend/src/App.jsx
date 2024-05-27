import CssBaseline from '@mui/material/CssBaseline';
import Home from './page/Home';
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer';
import { Route, Routes } from 'react-router-dom'
import Register from './page/Register';
import JobList from './page/JobList'; 

function App() {


  return (
    <>
      <CssBaseline />
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='signup' element={<Register/>}/>
        <Route path='/jobs' element={<JobList />} /> {/* Static route for JobList */}
      </Routes>
      <Footer />
    </>
  )
}

export default App
