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
            var user = HttpContext.User.Identity?.Name;
            var claims = HttpContext.User.Claims;

            return Ok(new
            {
                message = "Protected Vendor Data",
                user,
                claims = claims.Select(c => new { c.Type, c.Value })
            });
            //return Ok("Protected Vendor Data");
        }
    }
}
