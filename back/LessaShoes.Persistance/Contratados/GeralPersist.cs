using System.Threading.Tasks;
using LessaShoes.Persistance.Contratos;

namespace LessaShoes.Persistance.Contratados
{
    public class GeralPersist : IGeralPersist
    {
        private readonly LessaShoesContext _context;

        public GeralPersist(LessaShoesContext context)
        {
            _context = context;
        }
        public void add<T>(T entity) where T : class
        {
            _context.AddAsync(entity);         
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public void DeleteRange<T>(T[] entityArray) where T : class
        {
            _context.RemoveRange(entityArray);
        }

        public async Task<bool> SaveChangesAsync()
        {
            return (await _context.SaveChangesAsync()) > 0;
        }

        public void Update<T>(T entity) where T : class
        {
            _context.Update(entity);
        }
    }
}