using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace LessaShoes.Domain.Identity
{
    public class Usuario : IdentityUser<int>
    {
        [Column(TypeName = "varchar(150)")]
        public string NomeCompleto { get; set; }
        public List<UsuarioCargo> UsuarioCargos { get; set; }
    }
}