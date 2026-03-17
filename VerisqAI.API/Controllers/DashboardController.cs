using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace VerisqAI.API.Controllers
{
    [Authorize(Roles = "User")]
    [ApiController]
    [Route("api/dashboard")]
    public class DashboardController:ControllerBase
    {
        [HttpGet("vendors")]
        public IActionResult GetVendors()
        {
            return Ok("Protected Vendor Data");
        }
    }
}
