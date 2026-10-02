import './App.css';
import { useState } from 'react';
import { useProdutos } from './Hooks/useProdutos';
import Formulario from "./Components/Formulario";

function App() {

    const [produtoEmEdicao, setProdutoEmEdicao] = useState(null);

    const { produtos, adicionaProduto, atualizaProduto, removeProduto, loading, erro } = useProdutos();

    if (loading) {
        return <p>Carregando produtos...</p>;
    }

    if (erro) {
        return <p>Erro: {erro}</p>;
    }

    return (
        <div className="app">
            <h1> Cadastro de Produtos </h1>
            <Formulario key={produtoEmEdicao?.id ?? "novo"} produtoEmEdicao={produtoEmEdicao} atualizaProduto={atualizaProduto} adicionaProduto={adicionaProduto} />

            <section className="lista-produtos">
                <h2>Produtos Cadastrados</h2>

                <ul>
                    {produtos.map( (produto) => (
                        <li className="produto" key={produto.id}>
                            <div className="produto-info">
                                <span className="produto-nome">
                                    {produto.nome}
                                </span>

                                <span className="produto-detalhes">
                                    R$ {produto.preco} - Estoque: {produto.estoque} 
                                </span>
                            </div>

                            <div className="produto-acoes">
                                <button className="btn-editar" onClick={() => setProdutoEmEdicao(produto)}> Editar </button> 
                                <button className="btn-excluir" 
                                    onClick={() => {
                                        if ( window.confirm(`Deseja remover ${produto.nome} dos produtos?`))
                                        {
                                            removeProduto(produto.id);
                                        }
                                    }}> Excluir </button> 
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}
export default App;