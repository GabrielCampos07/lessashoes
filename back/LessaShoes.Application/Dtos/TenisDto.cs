using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace LessaShoes.Application.Dtos
{
    public class TenisDto
    {
        public int TenisID { get; set; }
        public string ImagemURL { get; set; }
        [Required(ErrorMessage = "O campo {0} é obrigatório")]
        public string NomeTenis { get; set; }
        [Required(ErrorMessage = "O campo {0} é obrigatório")]
        public int Tamanho { get; set; }
        [Range(0, 1200, ErrorMessage = "Não pode ser menor que zero e maior que 1200")]
        public int QtdTenis { get; set; }
        public string Marca { get; set; }
    }
}
