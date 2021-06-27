using System.Threading.Tasks;
using LessaShoes.Domain;

namespace LessaShoes.Application.Contratos
{
    public interface IUsuarioService
    {
        Task<usuario> AddUsuario(usuario model);
        Task<usuario> UpdateUsuario(int usuarioID, usuario model);
        Task<bool> DeleteUsuario(int usuarioID);
        Task<usuario[]> GetAllUsuariosAsync();
        Task<usuario> GetUsuarioByIDAsync(int usuarioID);
        Task<usuario[]> GetAllUsuariosByNomeAsync(string nome);
    }
}