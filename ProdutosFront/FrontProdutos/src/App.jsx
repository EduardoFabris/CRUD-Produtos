import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Produtos from './pages/Produtos';
import Navbar from './Components/Navbar';
import DetalhesProduto from './pages/DetalhesProduto';

function App() {
    return (
        <>
            <Navbar />
        
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/produtos" element={<Produtos />} />
                <Route path="/produtos/:id" element={<DetalhesProduto />} />
            </Routes>
        </>
    );
}

export default App;
