//imports
import { Routes, Route } from 'react-router-dom';

//pages 
import Home from './components/pages/Home';
import LinearProgramming from './components/pages/LinearProgramming';
import Simplex from './components/pages/Simplex';
import DevelopedBy from './components/pages/DevelopedBy';

//components
import Container from './components/layout/Conteiner';
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer';


function App() {
  return (
    <>
      <div className=''>
        <Navbar />

        <Container customClass='min-h-screen'>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/linearprogramming" element={<LinearProgramming />} />
            <Route path="/simplex/*" element={<Simplex />} />
            <Route path="/developedby" element={<DevelopedBy/>} />
          </Routes>

        </Container>

        <Footer/>

      </div>
    </>
  )
}

export default App