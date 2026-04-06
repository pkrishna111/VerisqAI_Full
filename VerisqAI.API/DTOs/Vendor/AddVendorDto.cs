using System.ComponentModel.DataAnnotations;


namespace VerisqAI.API.DTOs.Vendor
{
    public class AddVendorDto
    {
        [Required]
        [MaxLength(150)]
        public string Name { get; set; } = "";

        [Required]
        [MaxLength(150)]
        public string Domain { get; set; } = "";
    }
}
