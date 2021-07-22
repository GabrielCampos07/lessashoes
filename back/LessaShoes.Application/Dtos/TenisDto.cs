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
        [RegularExpression(@"*\. (jpe?g | gif | png)",
            ErrorMessage = "Não é uma imagem válida (jpeg, jpg, gif e png")]
        public string ImagemURL { get; set; }
        [Required(ErrorMessage = "O campo {0} é obrigatório")]
        public string NomeTenis { get; set; }
        [Required(ErrorMessage = "O campo {0} é obrigatório"),
            Range(2, 2, ErrorMessage = "Apenas dois caracteres são validos")]
        public int Tamanho { get; set; }
        [MinLength(1, ErrorMessage = "{0} deve ter no minímo de um caractere"),
        Range(0, 1200, ErrorMessage = "Não pode ser menor que zero e maior que 1200")]
        public int QtdTenis { get; set; }
        public string Marca { get; set; }
    }
}
