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
        public async Task<tenis[]> GetAllTenisAsync()
        {
            IQueryable<tenis> query = _context.Tenis;
            
            query = query.AsNoTracking().OrderBy(e => e.tenisID);

            return await query.ToArrayAsync();
        }

        public async Task<tenis[]> GetAllTenisByNameAsync(string nome)
        {
            IQueryable<tenis> query = _context.Tenis;

            query = query.AsNoTracking().OrderBy(e => e.nomeTenis)
            .Where(e => e.nomeTenis.ToLower().Contains(nome.ToLower()));

            return await query.ToArrayAsync();
        }

        public async Task<tenis> GetTenisByIDAsync(int tenisID)
        {
            IQueryable<tenis> query = _context.Tenis;

            query = query.AsNoTracking().OrderBy(e => e.tenisID)
                .Where(e => e.tenisID == tenisID);

            return await query.FirstOrDefaultAsync();
        }
    }
}