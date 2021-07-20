using LessaShoes.Domain;
using LessaShoes.Domain.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace LessaShoes.Persistance
{
    public class LessaShoesContext : IdentityDbContext<Usuario, Cargo, int,
        IdentityUserClaim<int>, UsuarioCargo, IdentityUserLogin<int>,
        IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public LessaShoesContext(DbContextOptions<LessaShoesContext> options) : base(options) { }
        public DbSet<tenis> Tenis { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<UsuarioCargo>(UsuarioCargo =>
            {
                UsuarioCargo.HasKey(uc => new { uc.UserId, uc.RoleId });

                UsuarioCargo.HasOne(uc => uc.Cargo)
                .WithMany(c => c.UsuarioCargos)
                .HasForeignKey(uc => uc.RoleId)
                .IsRequired();

                UsuarioCargo.HasOne(uc => uc.Usuario)
                .WithMany(c => c.UsuarioCargos)
                .HasForeignKey(uc => uc.UserId)
                .IsRequired();
            }
            );
        }
    }
}