import { ProdutoContext } from "./ProdutoContext";
import { useProdutos } from "../Hooks/useProdutos";

export const ProdutoProvider = ({ children }) => {

    const {
        produtos,
        adicionaProduto,
        atualizaProduto,
        removeProduto,
        loading,
        erro
    } = useProdutos();

    return (
        <ProdutoContext.Provider
            value={{
                produtos,
                adicionaProduto,
                atualizaProduto,
                removeProduto,
                loading,
                erro
            }}
        >
            {children}
        </ProdutoContext.Provider>
    );
};