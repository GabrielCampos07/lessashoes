using System.Threading.Tasks;
using LessaShoes.Domain;

namespace LessaShoes.Persistance.Contratos
{
    public interface ITenisPersist
    {
        Task<Tenis[]> GetAllTenisAsync();
        Task<Tenis> GetTenisByIDAsync(int tenisID);
        Task<Tenis[]> GetAllTenisByNameAsync(string nome);
    }
}