using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using LessaShoes.Domain;
using LessaShoes.Application.Contratos;
using Microsoft.AspNetCore.Http;

namespace LessaShoes.API.Controllers
{
    [ApiController]
    [Route("api")]
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
                if(tenis == null) return NotFound("Nenhum Tenis encontrado.");

                return Ok(tenis);
            }
            catch(Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar eventos. Erro{ex.Message}");
            }
        }
    }
}

