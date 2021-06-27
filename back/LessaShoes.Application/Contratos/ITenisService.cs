using System.Threading.Tasks;
using LessaShoes.Domain;

namespace LessaShoes.Application.Contratos
{
    public interface ITenisService
    {
        Task<tenis> AddTenis(tenis model);
        Task<tenis> UpdateTenis(int tenisID, tenis model);
        Task<bool> DeleteTenis(int tenisID);
        Task<tenis[]> GetAllTenisAsync();
        Task<tenis> GetTenisByIDAsync(int tenisID);
        Task<tenis[]> GetAllTenisByNameAsync(string nome);
    }
}