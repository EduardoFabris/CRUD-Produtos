import { useState } from "react";
import { useContext } from "react";
import { ProdutoContext } from "../context/ProdutoContext";
import Formulario from "../components/Formulario";
import "./Produtos.css";

function Produtos() {

    const [produtoEmEdicao, setProdutoEmEdicao] = useState(null);

    const { produtos, removeProduto, loading, erro } = useContext(ProdutoContext);

    if (loading) {
        return <p>Carregando produtos...</p>;
    }

    if (erro) {
        return <p>Erro: {erro}</p>;
    }

    return (
        <div className="produtos">
            <h1> Cadastro de Produtos </h1>
            <Formulario key={produtoEmEdicao?.id ?? "novo"} produtoEmEdicao={produtoEmEdicao} />

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
export default Produtos; 
