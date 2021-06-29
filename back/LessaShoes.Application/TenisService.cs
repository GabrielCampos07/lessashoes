using System;
using System.Threading.Tasks;
using LessaShoes.Application.Contratos;
using LessaShoes.Domain;
using LessaShoes.Persistance.Contratos;

namespace LessaShoes.Application
{
    public class TenisService : ITenisService
    {
        private IGeralPersist _GeralPersist;
        private readonly ITenisPersist _TenisPersist;

        public TenisService(IGeralPersist GeralPersist, ITenisPersist TenisPersist)
        {
            _GeralPersist = GeralPersist;
            _TenisPersist = TenisPersist;
        }
        public async Task<tenis> AddTenis(tenis model)
        {
            try
            {
                _GeralPersist.add<tenis>(model);
                if (await _GeralPersist.SaveChangesAsync())
                {
                    return await _TenisPersist.GetTenisByIDAsync(model.tenisID);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public async Task<tenis> UpdateTenis(int tenisID, tenis model)
        {
            try
            {
                var tenis = await _TenisPersist.GetTenisByIDAsync(tenisID);
                if (tenis == null) throw new Exception("O ID para atualização não foi encontrado");

                model.tenisID = tenisID;

                _GeralPersist.Update(model);
                if (await _GeralPersist.SaveChangesAsync())
                {
                    return await _TenisPersist.GetTenisByIDAsync(model.tenisID);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<tenis[]> GetAllTenisAsync()
        {
            try
            {
                var tenis = await _TenisPersist.GetAllTenisAsync();
                if (tenis == null) return null;

                return tenis;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<tenis[]> GetAllTenisByNameAsync(string nome)
        {
            var tenis = await _TenisPersist.GetAllTenisByNameAsync(nome);
            if (tenis == null) return null;

            return tenis;
        }

        public async Task<tenis> GetTenisByIDAsync(int tenisID)
        {
            try
            {
                var tenis = await _TenisPersist.GetTenisByIDAsync(tenisID);
                if (tenis == null) return null;

                return tenis;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> Delete(int tenisID)
        {
            try
            {
                var tenis = await _TenisPersist.GetTenisByIDAsync(tenisID);
                if (tenis == null) throw new Exception("Não foi possível excluir o tenis");

                _GeralPersist.Delete(tenis);
                return await _GeralPersist.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}