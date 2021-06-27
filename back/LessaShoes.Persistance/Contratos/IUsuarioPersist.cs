using System.Threading.Tasks;
using LessaShoes.Domain;

namespace LessaShoes.Persistance.Contratos
{
    public interface IUsuarioPersist
    {
        Task<usuario[]> GetAllUsuariosAsync();
        Task<usuario> GetUsuarioByIDAsync(int usuarioID);
        Task<usuario[]> GetAllUsuariosByNomeAsync(string nome);
    }
}