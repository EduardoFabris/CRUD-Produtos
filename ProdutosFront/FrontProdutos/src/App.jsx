import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Produtos from './pages/Produtos';
import Navbar from './Components/Navbar';

function App() {
    return (
        <>
            <Navbar />
        
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/produtos" element={<Produtos />} />
            </Routes>
        </>
    );
}

export default App;
