using Microsoft.EntityFrameworkCore;
using BillingForm_API.Models;

namespace BillingForm_API.DATA
{
    public class BillingDBcontext : DbContext
    {
        public BillingDBcontext(DbContextOptions<BillingDBcontext> options)
            : base(options)
        {
        }
        public DbSet<BillingRequest> BillingRequests { get; set; }
    }
}
