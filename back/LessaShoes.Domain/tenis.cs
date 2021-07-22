using System.ComponentModel.DataAnnotations;

namespace LessaShoes.Domain
{
    public class Tenis
    {
        public int TenisID { get; set; }
        public string ImagemURL { get; set; }
        [Required]
        public string NomeTenis { get; set; }
        [Required]
        public int Tamanho { get; set; }
        [Required]
        public int QtdTenis { get; set; }
        public string Marca {get; set;}
    }
}