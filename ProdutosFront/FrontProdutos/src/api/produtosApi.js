import api from "./axios";

export async function buscarProdutos() {
    const resposta = await api.get("/produtos");

    return resposta.data;
}

export async function criarProduto(produto) {
    const resposta = await api.post("/produtos", produto);

    return resposta.data;
}

export async function atualizarProduto(id, produto) {
    const resposta = await api.put(`/produtos/${id}`, produto);

    if (resposta.status === 204) {
        return produto;
    }

    return resposta.data;
}

export async function deletarProduto(id) {
    await api.delete(`/produtos/${id}`);
}