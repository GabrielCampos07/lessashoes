using LessaShoes.Domain;
using Microsoft.EntityFrameworkCore;

namespace LessaShoes.Persistance
{
    public class LessaShoesContext : DbContext
    {
        public LessaShoesContext(DbContextOptions<LessaShoesContext> options) : base (options) {}
        public DbSet<tenis> Tenis {get ; set ;}
        public DbSet<usuario> usuarios { get; set; }
    }
}