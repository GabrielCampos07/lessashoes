using System;
using System.Threading.Tasks;
using LessaShoes.Application.Contratos;
using LessaShoes.Domain;
using LessaShoes.Persistance.Contratados;
using LessaShoes.Persistance.Contratos;

namespace LessaShoes.Application
{
    public class UsuarioService : IUsuarioService
    {
        private readonly IGeralPersist _GeralPersist;
        private UsuarioPersist _UsuarioPersist;

        public UsuarioService(IGeralPersist GeralPersist, UsuarioPersist UsuarioPersist)
        {
            _GeralPersist = GeralPersist;
            _UsuarioPersist = UsuarioPersist;
        }
        public async Task<usuario> AddUsuario(usuario model)
        {
            try
            {
                _GeralPersist.add<usuario>(model);
                if(await _GeralPersist.SaveChangesAsync())
                {
                    return await _UsuarioPersist.GetUsuarioByIDAsync(model.usuarioID);
                }
                return null;
            }
            catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> DeleteUsuario(int usuarioID)
        {
            try{
            var usuario = await _UsuarioPersist.GetUsuarioByIDAsync(usuarioID);
            if(usuario == null) throw new Exception("ID de usuário para deletar não encontrado");

            _GeralPersist.Delete<usuario>(usuario);
            return await _GeralPersist.SaveChangesAsync();             
            }
            catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public async Task<usuario> UpdateUsuario(int usuarioID, usuario model)
        {
            try{
            var usuario = await _UsuarioPersist.GetUsuarioByIDAsync(usuarioID);
            if(usuario == null) throw new Exception("ID de usuário para atualizar não encontrado");

            _GeralPersist.Update<usuario>(model);

            if(await _GeralPersist.SaveChangesAsync())
            {
                return await _UsuarioPersist.GetUsuarioByIDAsync(usuarioID);
            }
            return null;
            }
            catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
            
        }
        public async Task<usuario[]> GetAllUsuariosAsync()
        {
            try
            {
                var usuario = await _UsuarioPersist.GetAllUsuariosAsync();
                if(usuario == null) throw new Exception("Usuário não encontrado");

                return usuario;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<usuario[]> GetAllUsuariosByNomeAsync(string nome)
        {
            try
            {
            var usuario = await _UsuarioPersist.GetAllUsuariosByNomeAsync(nome);
            if(usuario == null) throw new Exception("Usuário não encontrado");

            return usuario;
            }
            catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public async Task<usuario> GetUsuarioByIDAsync(int usuarioID)
        {
            try
            {
            var usuario = await _UsuarioPersist.GetUsuarioByIDAsync(usuarioID);
            if(usuario == null) throw new Exception("Usuário não encontrado");

            return usuario;
            }
            catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}