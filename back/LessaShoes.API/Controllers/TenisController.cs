using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using LessaShoes.Domain;
using LessaShoes.Application.Contratos;
using Microsoft.AspNetCore.Http;

namespace LessaShoes.API.Controllers
{
    [ApiController]
    [Route("api/tenis")]
    public class TenisController : ControllerBase
    {
        private readonly ITenisService _TenisService;

        public TenisController(ITenisService tenisService)
        {
            _TenisService = tenisService;
        }
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var tenis = await _TenisService.GetAllTenisAsync();
                if (tenis == null) return NotFound("Nenhum Tenis encontrado.");

                return Ok(tenis);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar procurar os tenis. Erro{ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetByID(int id)
        {
            try
            {
                var tenis = await _TenisService.GetTenisByIDAsync(id);
                if (tenis == null) return NotFound("Nenhum Tenis com esse id foi encontrado.");

                return Ok(tenis);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar procurar o tenis pelo ID. Erro{ex.Message}");
            }
        }
        [HttpGet("{nome}/nome")]
        public async Task<IActionResult> GetByName(string nome)
        {
            try
            {
                var tenis = await _TenisService.GetAllTenisByNameAsync(nome);
                if (tenis == null) return NotFound("Nenhum Tenis com esse id foi encontrado.");

                return Ok(tenis);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar procurar o tenis pelo nome. Erro{ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddTenis(tenis model)
        {
            try
            {
                var tenis = await _TenisService.AddTenis(model);
                if (tenis == null) return NotFound("Não foi possível adicionar um tenis");

                return Ok(tenis);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar adicionar um novo tenis. Erro{ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, tenis model)
        {
            try
            {
                var tenis = await _TenisService.UpdateTenis(id, model);
                if (tenis == null) return NotFound("Não foi possível atualizar o tenis.");

                return Ok(tenis);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar atualizar o tenis. Erro{ex.Message}");
            }
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                return await _TenisService.Delete(id) ?
                Ok("Deletado") :
                BadRequest("Tenis não deletado");
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar atualizar o tenis. Erro{ex.Message}");
            }
        }
    }
}

