const url = "http://localhost:5219/api/produtos";

export async function buscarProdutos() {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Erro ao buscar produtos");
    }

    return response.json();
}

export async function criarProduto(produto) {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(produto)
    });

    if (!response.ok) {
        throw new Error("Erro ao cadastrar produto");
    }

    return response.json();
}

export async function atualizarProduto(id, produto) {
    const response = await fetch(`${url}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(produto)
    });

    if (!response.ok) {
        throw new Error("Erro ao atualizar produto");
    }

    if (response.status === 204) {
        return produto;
    }

    return response.json();
}

export async function deletarProduto(id) {
    const response = await fetch(`${url}/${id}`, {
        method: "DELETE"
    });

    if (!response.ok) {
        throw new Error("Erro ao excluir produto");
    }
}