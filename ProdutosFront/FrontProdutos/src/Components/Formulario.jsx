import { useState } from "react";
import { criarProduto } from "../api/produtosApi";
import "./Formulario.css";

const Formulario = ({adicionaProduto,produtoEmEdicao,atualizaProduto}) => {

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