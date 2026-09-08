using ProdutosAPI.Models;
using ProdutosAPI.Data;

namespace ProdutosAPI.Services
{
    public interface IProdutoService
    {
        Produto Create(Produto produto);

        List<Produto> GetAll();

        Produto ? GetById(int id);

        Produto ? Update(int id, Produto produto);

        bool Delete (int id);
    }
}