import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { buscarProdutoPorId } from '../api/produtosApi';
import { useNavigate } from 'react-router-dom';

function DetalhesProduto() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [produto, setProduto] = useState(null);
    const [erro, setErro] = useState(null);

    useEffect(() => {
        async function carregarProduto() {
            try {
                const produtoEncontrado = await buscarProdutoPorId(id);

                setProduto(produtoEncontrado);
            } catch {
                setErro("Não foi possível carregar o produto.");
            }
        }

        carregarProduto();
    }, [id]);

    if (erro) {
        return <p>Erro: {erro}</p>;
    }

    if (!produto) {
        return <p>Carregando produto...</p>;
    }

    return (
        <div>
            <h1>Detalhes do Produto</h1>

            <p>Nome: {produto.nome}</p>
            <p>Preço: R$ {produto.preco}</p>
            <p>Estoque: {produto.estoque}</p>

            <button onClick={() => navigate("/produtos")}>  Voltar para produtos </button>
        </div>
    );
}

export default DetalhesProduto;