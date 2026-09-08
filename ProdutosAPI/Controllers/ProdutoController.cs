using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using ProdutosAPI.Models;
using ProdutosAPI.Services;

namespace ProdutosAPI.Controllers
{
    [ApiController]
    [Route ("api/produtos")]

    public class ProdutoController : ControllerBase
    {
        private readonly IProdutoService _service;

        public ProdutoController (IProdutoService service)
        {
            _service = service;
        }

        [HttpPost]
        public IActionResult Create(Produto produto)
        {
            try
            {
                var result = _service.Create(produto);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var produtos = _service.GetAll();

            return Ok(produtos);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var produto = _service.GetById(id);

            if (produto == null)
            {
                return NotFound("Produto não encontrado");
            }

            return Ok(produto);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, Produto produto)
        {
            try
            {
                var produtoAtualizado = _service.Update(id, produto);

                if (produtoAtualizado == null)
                {
                    return NotFound("Produto não encontrado");
                }

                return Ok(produtoAtualizado);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var produtoDeletado = _service.Delete(id);

            if (!produtoDeletado)
            {
                return NotFound("Produto não encontrado");
            }

            return NoContent();
        }
    }
}