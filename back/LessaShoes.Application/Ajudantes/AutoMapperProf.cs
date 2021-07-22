using AutoMapper;
using LessaShoes.Application.Dtos;
using LessaShoes.Domain;
using LessaShoes.Domain.Identity;

namespace LessaShoes.Application.Ajudantes
{
    public class AutoMapperProf : Profile
    {
        public AutoMapperProf()
        {
            CreateMap<Tenis, TenisDto>().ReverseMap();
            CreateMap<Usuario, UsuarioDto>().ReverseMap();
            CreateMap<Usuario, UsuarioLoginDto>().ReverseMap();
        }
    }
}
