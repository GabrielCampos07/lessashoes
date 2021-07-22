using AutoMapper;
using LessaShoes.Application.Dtos;
using LessaShoes.Domain;

namespace LessaShoes.Application.Ajudantes
{
    public class AutoMapperProf : Profile
    {
        public AutoMapperProf()
        {
            CreateMap<Tenis, TenisDto>().ReverseMap();
        }
    }
}
