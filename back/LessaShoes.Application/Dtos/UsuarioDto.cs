using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LessaShoes.Application.Dtos
{
    public class UsuarioDto
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string NomeCompleto { get; set; }
    }
}
