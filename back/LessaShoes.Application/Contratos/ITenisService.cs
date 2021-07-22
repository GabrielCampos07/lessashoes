using System.Threading.Tasks;
using LessaShoes.Application.Dtos;

namespace LessaShoes.Application.Contratos
{
    public interface ITenisService
    {
        Task<TenisDto> AddTenis(TenisDto model);
        Task<TenisDto> UpdateTenis(int tenisID, TenisDto model);
        Task<bool> Delete(int tenisID);
        Task<TenisDto[]> GetAllTenisAsync();
        Task<TenisDto> GetTenisByIDAsync(int tenisID);
        Task<TenisDto[]> GetAllTenisByNameAsync(string nome);
    }
}