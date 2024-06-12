//imports
import { Routes, Route } from 'react-router-dom';
//components
import Container from './components/layout/Conteiner';
import Navbar from './components/layout/Navbar'
//pages 
import Home from './components/pages/Home';
import LinearProgramming from './components/pages/LinearProgramming';
import Simplex from './components/pages/Simplex';

function App() {
  return (
    <>
      <div className=''>
        <Navbar />

        <Container customClass='min-h-screen'>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/linearprogramming" element={<LinearProgramming />} />
            <Route path="/simplex" element={<Simplex />} />
          </Routes>

        </Container>

      </div>
    </>
  )
}

export default App