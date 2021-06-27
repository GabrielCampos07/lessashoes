using System.Threading.Tasks;
using LessaShoes.Domain;

namespace LessaShoes.Persistance.Contratos
{
    public interface ITenisPersist
    {
        Task<tenis[]> GetAllTenisAsync();
        Task<tenis> GetTenisByIDAsync(int tenisID);
        Task<tenis[]> GetAllTenisByNameAsync(string nome);
    }
}