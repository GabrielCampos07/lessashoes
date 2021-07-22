using LessaShoes.Domain.Identity;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LessaShoes.API.Controllers
{
    [ApiController]
    [Microsoft.AspNetCore.Mvc.Route("/api")]
    public class UsuarioController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly UserManager<Usuario> _userManager;
        private readonly SignInManager<Usuario> _signInManager;

        public UsuarioController(IConfiguration config,
            UserManager<Usuario> userManager,
            SignInManager<Usuario> signInManager)
        {
            _config = config;
            _userManager = userManager;
            _signInManager = signInManager;
        }

        // [HttpGet("CarregarUsuario")]
        // public async Task<IActionResult> CarregarUsuario()
        // {
        //     return Ok(new Usuario());
        // }

        // [HttpPost("Registrar")]
        // public async Task<IActionResult> RegistrarUsuario(Usuario usuario)
        // {
        //     return Ok();
        // }

    }
}
