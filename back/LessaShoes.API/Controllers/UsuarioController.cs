using AutoMapper;
using LessaShoes.Application.Dtos;
using LessaShoes.Domain.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace LessaShoes.API.Controllers
{
    [ApiController]
    [Route("/api/usuario")]
    public class UsuarioController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly UserManager<Usuario> _userManager;
        private readonly SignInManager<Usuario> _signInManager;
        private readonly IMapper _mapper;

        public UsuarioController(IConfiguration config,
            UserManager<Usuario> userManager,
            SignInManager<Usuario> signInManager,
            IMapper mapper)
        {
            _config = config;
            _userManager = userManager;
            _signInManager = signInManager;
            _mapper = mapper;
        }

        [HttpGet("CarregarUsuario")]
        
        public async Task<IActionResult> CarregarUsuario()
        {
            return Ok(new UsuarioDto());
        }

        [HttpPost("Registrar")]
        [AllowAnonymous]
        public async Task<IActionResult> RegistrarUsuario(UsuarioDto usuarioDto)
        {
            try
            {
                var usuario = _mapper.Map<Usuario>(usuarioDto);

                var resultado = await _userManager.CreateAsync(usuario, usuarioDto.Password);

                var retornarUsuario = _mapper.Map<UsuarioDto>(usuario);

                if (resultado.Succeeded)
                {
                    return Created("CarregarUsuario", retornarUsuario);
                }

                return BadRequest(resultado.Errors);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

        [HttpPost("Login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login(UsuarioLoginDto usuarioLogin)
        {
            try
            {
                var usuario = await _userManager.FindByNameAsync(usuarioLogin.UserName);

                var resultado = await _signInManager.CheckPasswordSignInAsync(usuario, usuarioLogin.Password, false);

                if(resultado.Succeeded)
                {
                    var appUsuario = await _userManager.Users
                        .FirstOrDefaultAsync(u => u.NormalizedUserName == usuarioLogin.UserName.ToUpper());

                    var usuarioRetorno = _mapper.Map<UsuarioLoginDto>(appUsuario); ;

                    return Ok(new
                    {
                        token = GenerateJWToken(appUsuario).Result,
                        usuario = usuarioRetorno
                    });
                }

                return Unauthorized();
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

        private async Task<string> GenerateJWToken(Usuario usuario)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, usuario.Id.ToString()),
                new Claim(ClaimTypes.Name, usuario.UserName)
            };

            var cargos = await _userManager.GetRolesAsync(usuario);

            foreach (var cargo in cargos)
            {
                claims.Add(new Claim(ClaimTypes.Role, cargo));
            }

            var chave = new SymmetricSecurityKey(Encoding.ASCII
                .GetBytes(_config.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(chave, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescritor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            var tokenManipulador = new JwtSecurityTokenHandler();

            var token = tokenManipulador.CreateToken(tokenDescritor);

            return tokenManipulador.WriteToken(token);
        }
    }
}
