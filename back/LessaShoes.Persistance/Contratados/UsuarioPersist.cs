using System.Linq;
using System.Threading.Tasks;
using LessaShoes.Domain;
using LessaShoes.Persistance.Contratos;
using Microsoft.EntityFrameworkCore;

namespace LessaShoes.Persistance.Contratados
{
    public class UsuarioPersist : IUsuarioPersist
    {
        private readonly LessaShoesContext _context;

        public UsuarioPersist(LessaShoesContext context)
        {
            _context = context;
        }
        public async Task<usuario[]> GetAllUsuariosAsync()
        {
            IQueryable<usuario> query = _context.usuarios;
                query = query.AsNoTracking().OrderBy(e => e.usuarioID);
                
                return await query.ToArrayAsync();
        }

        public async Task<usuario[]> GetAllUsuariosByNomeAsync(string nome)
        {
            IQueryable<usuario> query = _context.usuarios;
            query = query.AsNoTracking().OrderBy(e => e.nomeUsuario)
            .Where(e => e.nomeUsuario.ToLower().Contains(nome.ToLower()));

            return await query.ToArrayAsync();
        }

        public async Task<usuario> GetUsuarioByIDAsync(int usuarioID)
        {
            IQueryable<usuario> query = _context.usuarios;

            query = query.AsNoTracking().OrderBy(e => e.usuarioID)
            .Where(e => e.usuarioID == usuarioID);

            return await query.FirstOrDefaultAsync();
        }
    }
}