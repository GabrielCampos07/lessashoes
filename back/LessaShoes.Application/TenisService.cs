using System;
using System.Threading.Tasks;
using AutoMapper;
using LessaShoes.Application.Contratos;
using LessaShoes.Application.Dtos;
using LessaShoes.Domain;
using LessaShoes.Persistance.Contratos;

namespace LessaShoes.Application
{
    public class TenisService : ITenisService
    {
        private IGeralPersist _GeralPersist;
        private readonly ITenisPersist _TenisPersist;
        private readonly IMapper _mapper;

        public TenisService(IGeralPersist GeralPersist, 
                            ITenisPersist TenisPersist,
                            IMapper mapper)
        {
            _GeralPersist = GeralPersist;
            _TenisPersist = TenisPersist;
            _mapper = mapper;
        }
        public async Task<TenisDto> AddTenis(TenisDto model)
        {
            try
            {
                var tenis = _mapper.Map<Tenis>(model);

                _GeralPersist.add<Tenis>(tenis);
                if (await _GeralPersist.SaveChangesAsync())
                {
                    var tenisRetorno = await _TenisPersist.GetTenisByIDAsync(tenis.TenisID);

                    return _mapper.Map<TenisDto>(tenisRetorno);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public async Task<TenisDto> UpdateTenis(int tenisID, TenisDto model)
        {
            try
            {
                var tenis = await _TenisPersist.GetTenisByIDAsync(tenisID);
                if (tenis == null) throw new Exception("O ID para atualização não foi encontrado");

                model.TenisID = tenisID;

                _mapper.Map(model, tenis);

                _GeralPersist.Update<Tenis>(tenis);

                if (await _GeralPersist.SaveChangesAsync())
                {
                    var tenisRetorno = await _TenisPersist.GetTenisByIDAsync(tenis.TenisID);

                    return _mapper.Map<TenisDto>(tenisRetorno);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<TenisDto[]> GetAllTenisAsync()
        {
            try
            {
                var tenis = await _TenisPersist.GetAllTenisAsync();
                if (tenis == null) return null;

                var resultado = _mapper.Map<TenisDto[]>(tenis);

                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<TenisDto[]> GetAllTenisByNameAsync(string nome)
        {
            var tenis = await _TenisPersist.GetAllTenisByNameAsync(nome);
            if (tenis == null) return null;

            var resultado = _mapper.Map<TenisDto[]>(tenis);

            return resultado;
        }

        public async Task<TenisDto> GetTenisByIDAsync(int tenisID)
        {
            try
            {
                var tenis = await _TenisPersist.GetTenisByIDAsync(tenisID);
                if (tenis == null) return null;

                var resultado = _mapper.Map<TenisDto>(tenis);

                return resultado;
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