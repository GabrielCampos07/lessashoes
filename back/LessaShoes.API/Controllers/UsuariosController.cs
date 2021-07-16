using System;
using System.Threading.Tasks;
using LessaShoes.Application.Contratos;
using LessaShoes.Domain;
using Microsoft.AspNetCore.Mvc;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace LessaShoes.API.Controllers
{
    [ApiController]
    [Route("/api/usuarios")]
    public class UsuariosController : ControllerBase
    {
        private readonly IUsuarioService _usuarioService;

        public UsuariosController(IUsuarioService usuarioService)
        {
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

        [HttpPost]

        public async Task<IActionResult> AddUsuarios(usuario model)
        {
            try
            {
                var usuarios = await _usuarioService.AddUsuario(model);
                if (usuarios == null) return NotFound("Não foi possível adicionar o usuário");

                return Ok(model);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
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

        public async Task<IActionResult> DeleteTenis(int id)
        {
            try
            {
                return await _usuarioService.DeleteUsuario(id)?
                Ok(new {message = "Deletado"}):
                BadRequest("Não foi possível deletar o usuário");
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }

}