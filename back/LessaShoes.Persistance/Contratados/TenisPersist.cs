using System.Linq;
using System.Threading.Tasks;
using LessaShoes.Domain;
using LessaShoes.Persistance.Contratos;
using Microsoft.EntityFrameworkCore;

namespace LessaShoes.Persistance.Contratados
{
    public class TenisPersist : ITenisPersist
    {
        private readonly LessaShoesContext _context;
        public TenisPersist(LessaShoesContext context)
        {
            _context = context;

        }
        public async Task<Tenis[]> GetAllTenisAsync()
        {
            IQueryable<Tenis> query = _context.Tenis;
            
            query = query.AsNoTracking().OrderBy(e => e.TenisID);

            return await query.ToArrayAsync();
        }

        public async Task<Tenis[]> GetAllTenisByNameAsync(string nome)
        {
            IQueryable<Tenis> query = _context.Tenis;

            query = query.AsNoTracking().OrderBy(e => e.NomeTenis)
            .Where(e => e.NomeTenis.ToLower().Contains(nome.ToLower()));

            return await query.ToArrayAsync();
        }

        public async Task<Tenis> GetTenisByIDAsync(int tenisID)
        {
            IQueryable<Tenis> query = _context.Tenis;

            query = query.AsNoTracking().OrderBy(e => e.TenisID)
                .Where(e => e.TenisID == tenisID);

            return await query.FirstOrDefaultAsync();
        }
    }
}