using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using LessaShoes.Application.Contratos;
using LessaShoes.Domain;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace LessaShoes.API.Controllers
{
    [ApiController]
    [Route("/api/usuarios")]
    public class UsuariosController : ControllerBase
    {
        private readonly IUsuarioService _usuarioService;
        private readonly IWebHostEnvironment _hostEnvironment;

        public UsuariosController(IUsuarioService usuarioService,
        IWebHostEnvironment hostEnvironment)
        {
            _hostEnvironment = hostEnvironment;
            _usuarioService = usuarioService;
        }

        [HttpGet]

        public async Task<IActionResult> Get()
        {
            try
            {
                var usuarios = await _usuarioService.GetAllUsuariosAsync();
                if (usuarios == null) return NotFound("Não foi possível encontrar os usuários");

                return Ok(usuarios);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }

        [HttpGet("{id}")]

        public async Task<IActionResult> GetByID(int id)
        {
            try
            {
                var usuarios = await _usuarioService.GetUsuarioByIDAsync(id);
                if (usuarios == null) return NotFound("Não foi possível encontrar esse usuário");

                return Ok(usuarios);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpGet("{nome}/nome")]

        public async Task<IActionResult> GetByName(string nome)
        {
            try
            {
                var usuarios = await _usuarioService.GetAllUsuariosByNomeAsync(nome);
                if (usuarios == null) return NotFound("Não foi possível encontrar esse usuário");

                return Ok(usuarios);

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpPost("upload/{UsuarioId}")]

        public async Task<IActionResult> UploadImagem(int UsuarioId)
        {
            try
            {
                var usuarios = await _usuarioService.GetUsuarioByIDAsync(UsuarioId);
                if (usuarios == null) return NoContent();

                var arquivo = Request.Form.Files[0];
                if (arquivo.Length > 0)
                {
                    DeletarImagem(usuarios.imagemURL);
                    usuarios.imagemURL = await SalvarImagem(arquivo);
                }

                var UsuarioRetorno = await _usuarioService.UpdateUsuario(UsuarioId, usuarios);

                return Ok(UsuarioRetorno);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpPost]

        public async Task<IActionResult> AddUsuarios(usuario model)
        {
            try
            {
                var usuarios = await _usuarioService.AddUsuario(model);
                if (usuarios == null) return NotFound("Não foi possível adicionar o usuário");

                return Ok(usuarios);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar adicionar um novo tenis. Erro{ex.Message}");
            }
        }

        [HttpPut("{id}")]

        public async Task<IActionResult> UpdateUsuarios(int id, usuario model)
        {
            try
            {
                var usuarios = await _usuarioService.UpdateUsuario(id, model);
                if (usuarios == null) return NotFound("Não foi possível atualizar o usuário");

                return Ok(model);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpDelete("{id}")]

        public async Task<IActionResult> DeleteUsuarios(int id)
        {
            try
            {
                var usuario = await _usuarioService.GetUsuarioByIDAsync(id);
                if (usuario == null) return NoContent();

                if (await _usuarioService.DeleteUsuario(id))
                {
                    DeletarImagem(usuario.imagemURL);
                    return Ok(new { message = "Deletado" });
                }
                else
                {
                    throw new Exception("Ocorreu um erro ao deletar o usuário");
                }
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                     $"Erro ao tentar deletar eventos. Erro: {ex.Message}");
            }
        }

        [NonAction]
        public async Task<string> SalvarImagem(IFormFile arquivoImagem)
        {
            string nomeImagem = new string(Path.GetFileNameWithoutExtension(arquivoImagem.FileName)
            .Take(10)
            .ToArray())
            .Replace(' ', '-');

            nomeImagem = $"{nomeImagem}{DateTime.UtcNow.ToString("yymmssfff")}{Path.GetExtension(arquivoImagem.FileName)}";

            var caminhoImagem = Path.Combine(_hostEnvironment.ContentRootPath, @"Recursos/imagens", nomeImagem);

            using (var arquivoStream = new FileStream(caminhoImagem, FileMode.Create))
            {
                await arquivoImagem.CopyToAsync(arquivoStream);
            }

            return nomeImagem;
        }

        [NonAction]
        public void DeletarImagem(string nomeImagem)
        {
            var caminhoImagem = Path.Combine(_hostEnvironment.ContentRootPath, @"Recursos/imagens", nomeImagem);
            if (System.IO.File.Exists(caminhoImagem))
                System.IO.File.Delete(caminhoImagem);
        }
    }

}