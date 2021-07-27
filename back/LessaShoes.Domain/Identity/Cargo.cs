using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace LessaShoes.Domain.Identity
{
    public class Cargo : IdentityRole<int>
    {
        public List<UsuarioCargo> UsuarioCargos { get; set; }
    }
}