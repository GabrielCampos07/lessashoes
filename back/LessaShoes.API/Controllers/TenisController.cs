using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using LessaShoes.Application.Contratos;
using Microsoft.AspNetCore.Http;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using System.Linq;
using LessaShoes.Application.Dtos;

namespace LessaShoes.API.Controllers
{
    [ApiController]
    [Route("/api/tenis")]
    public class TenisController : ControllerBase
    {
        private readonly ITenisService _TenisService;
        private readonly IWebHostEnvironment _hostEnvironment;

        public TenisController(ITenisService tenisService,
         IWebHostEnvironment hostEnvironment)
        {
            _hostEnvironment = hostEnvironment;
            _TenisService = tenisService;
        }
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var tenis = await _TenisService.GetAllTenisAsync();
                if (tenis == null) return NoContent();

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
                if (tenis == null) return NoContent();

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
                if (tenis == null) return NoContent();

                return Ok(tenis);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar procurar o tenis pelo nome. Erro{ex.Message}");
            }
        }

        [HttpPost("upload/{tenisId}")]

        public async Task<IActionResult> UploadImagem(int tenisId)
        {
            try
            {
                var tenis = await _TenisService.GetTenisByIDAsync(tenisId);
                if (tenis == null) return NoContent();

                var arquivo = Request.Form.Files[0];
                if (arquivo.Length > 0)
                {
                    DeletarImagem(tenis.ImagemURL);
                    tenis.ImagemURL = await SalvarImagem(arquivo);
                }

                var tenisRetorno = await _TenisService.UpdateTenis(tenisId, tenis);

                return Ok(tenisRetorno);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddTenis(TenisDto model)
        {
            try
            {
                var tenis = await _TenisService.AddTenis(model);
                if (tenis == null) return NoContent();

                return Ok(tenis);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar adicionar um novo tenis. Erro{ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, TenisDto model)
        {
            try
            {
                var tenis = await _TenisService.UpdateTenis(id, model);
                if (tenis == null) return NoContent();

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
                var tenis = await _TenisService.GetTenisByIDAsync(id);
                if (tenis == null) return NoContent();

                if (await _TenisService.Delete(id))
                {
                    DeletarImagem(tenis.ImagemURL);
                    return Ok(new { message = "Deletado" });
                }
                else
                {
                    throw new Exception("Ocorreu um erro ao deletar o tênis");
                }

            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar atualizar o tenis. Erro{ex.Message}");
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

