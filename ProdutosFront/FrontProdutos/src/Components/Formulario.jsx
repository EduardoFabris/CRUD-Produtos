import { useState } from "react";
import { useContext } from "react";
import { ProdutoContext } from "../context/ProdutoContext";
import { criarProduto } from "../api/produtosApi";
import "./Formulario.css";

const Formulario = ({produtoEmEdicao}) => {

    //adicionaProduto e atualizaProduto vem do Context (Context ta compartilhando a lógica do Hook useProdutos pro componente do formulário)
    /*
        ProdutoEmEdição continua sendo passado como Prop porque sua lógica é do próprio formulário, não do useProdutos...
        é um estado de formulário controlado pela página de Produtos.jsx (Produtos diz ao Form qual produto está sendo editado)
    */
    const { adicionaProduto, atualizaProduto } = useContext(ProdutoContext);

    console.log("Context:", { adicionaProduto, atualizaProduto });

    const [formulario, setFormulario] = useState(() => ({
		// "?" = se existe produtoEmEdicao nome recebe nome - "??" = Se não existe nome recebe string vazia  
		nome: produtoEmEdicao?.nome ?? "", 
		preco: produtoEmEdicao?.preco ?? "",
		estoque: produtoEmEdicao?.estoque ?? ""
	}));

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormulario((formularioAtual) => ({
            ...formularioAtual,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const produto = {
            nome: formulario.nome,
            preco: Number(formulario.preco),
            estoque: Number(formulario.estoque)
        };

        try {

            if (produtoEmEdicao) {

                await atualizaProduto(
                    produtoEmEdicao.id,
                    produto
                );

            } else {

                const data = await criarProduto(produto);

                adicionaProduto(data);
            }

            setFormulario({
                nome: "",
                preco: "",
                estoque: ""
            });

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="campo">
                <label htmlFor="nome"> Nome do Produto: </label>
                <input type="text" name="nome" placeholder="Digite o nome do produto" onChange={handleChange} value={formulario.nome} />
			</div>

			<div className="campos-linha">

				<div className="campo">
					<label htmlFor="preco"> Preço: </label>
					<input type="number" name="preco" placeholder="Digite o preço" onChange={handleChange} value={formulario.preco} />
				</div>

				<div className="campo">
					<label htmlFor="estoque"> Quantidade em Estoque: </label>
					<input type="number" name="estoque" placeholder="Digite a quantidade" onChange={handleChange} value={formulario.estoque} />
				</div>
			</div>

            <input type="submit" value={produtoEmEdicao ? "Salvar alterações" : "Cadastrar"} />
        </form>
    );
};

export default Formulario;