using Microsoft.AspNetCore.Mvc;
using BillingForm_API.Models;
using BillingForm_API.DATA;

namespace BillingForm_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BillingController : ControllerBase
    {
        private readonly BillingDBcontext _context;

        public BillingController(BillingDBcontext context)
        {
            _context = context;
        }

        [HttpPost("submit")]
        public IActionResult SubmitBilling([FromBody] BillingRequest request)
        {
            if (request == null ||
                string.IsNullOrWhiteSpace(request.FullName) ||
                string.IsNullOrWhiteSpace(request.Email) ||
                string.IsNullOrWhiteSpace(request.Address) ||
                string.IsNullOrWhiteSpace(request.PaymentMethod))
            {
                return BadRequest(new { success = false, message = "All fields are required." });
            }

            _context.BillingRequests.Add(request);     
            _context.SaveChanges();                    

            return Ok(new { success = true, message = "Form submitted succesfully" });
        }
    }
}
