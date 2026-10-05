import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    function irParaProdutos() {
        navigate("/produtos");
    }

    return (
        <div>
            <h1>Bem-vindo!</h1>

            <p>Sistema de Controle de Produtos</p>

            <button onClick={irParaProdutos}> Ver produtos </button>
        </div>
    );
}
export default Home;
