using Microsoft.EntityFrameworkCore;
using ProdutosAPI.Models;
using ProdutosAPI.Data;

namespace ProdutosAPI.Services
{
    public class ProdutoService : IProdutoService
    {
        private readonly AppDbContext _context;

        public ProdutoService (AppDbContext context)
        {
            _context = context;
        }

        public Produto Create(Produto produto)
        {
            if (produto.Estoque <= 0)
            {
                throw new Exception("Produto esgotado");
            }

            _context.Produtos.Add(produto);
            
            _context.SaveChanges();

            return produto;
        }

        public List<Produto> GetAll()
        {
            return _context.Produtos.ToList();
        }

        public Produto ? GetById(int id)
        {
            return _context.Produtos
                .FirstOrDefault( p => p.Id == id);
        }

        public Produto? Update(int id, Produto produto)
        {
            var produtoExistente = _context.Produtos.Find(id);

            if (produtoExistente == null)
            {
                return null;
            }

            if (produto.Estoque <= 0)
            {
                throw new Exception("Produto esgotado");
            }

            produtoExistente.Nome = produto.Nome;
            produtoExistente.Preco = produto.Preco;
            produtoExistente.Estoque = produto.Estoque;

            _context.SaveChanges();

            return produtoExistente;
        }

        public bool Delete(int id)
        {
            var produto = _context.Produtos.Find(id);

            if (produto == null)
            {
                return false;
            }

            _context.Produtos.Remove(produto);

            _context.SaveChanges();

            return true;
        }
    }
}