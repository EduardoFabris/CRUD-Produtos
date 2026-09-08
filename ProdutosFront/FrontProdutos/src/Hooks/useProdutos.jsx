import { useEffect, useState } from "react";
import { buscarProdutos, atualizarProduto, deletarProduto } from "../api/produtosApi";

export function useProdutos() {
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);

    useEffect(() => {
        async function getProdutos() {
            try {
                const data = await buscarProdutos();

                setProdutos(data);
            } catch (error) {
                setErro(error.message);
            } finally {
                setLoading(false);
            }
        }

        getProdutos();
    }, []);

    const adicionaProduto = (produto) => {
        setProdutos((produtosAtuais) => [
            ...produtosAtuais,
            produto
        ]);
    };

    const atualizaProduto = async (id, produto) => {
        try {
            const produtoAtualizado = await atualizarProduto(id, produto);

            setProdutos((produtosAtuais) =>
                produtosAtuais.map((produtoAtual) =>
                    produtoAtual.id === id
                        ? produtoAtualizado
                        : produtoAtual
                )
            );
        } catch (error) {
            setErro(error.message);
        }
    };

    const removeProduto = async (id) => {
        try {
            await deletarProduto(id);

            setProdutos((produtosAtuais) =>
                produtosAtuais.filter(
                    (produto) => produto.id !== id
                )
            );

        } catch (error) {
            setErro(error.message);
        }
    };

    return {
        produtos,
        adicionaProduto,
        atualizaProduto,
        removeProduto,
        loading,
        erro
    };
}