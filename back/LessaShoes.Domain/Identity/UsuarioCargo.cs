using Microsoft.AspNetCore.Identity;

namespace LessaShoes.Domain.Identity
{
    public class UsuarioCargo : IdentityUserRole<int>
    {
        public Usuario Usuario { get; set; }
        public Cargo Cargo { get; set; }
    }
}