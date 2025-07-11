using System.ComponentModel.DataAnnotations;

namespace BillingForm_API.Models
{
    public class BillingRequest
    {
        [Key]   
        public int Id { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string PaymentMethod { get; set; }

    }
}
