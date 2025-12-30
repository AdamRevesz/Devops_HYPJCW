using Logic;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace Devops_Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MatchController : ControllerBase
    {
        private readonly MatchLogic _matchLogic;

        public MatchController(MatchLogic matchLogic)
        {
            _matchLogic = matchLogic;
        }

        [HttpPost]
        public async Task<IActionResult> AddMatch([FromBody] Match match)
        {
            await _matchLogic.AddMatch(match);
            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> GetAllMatches()
        {
            var matches = await _matchLogic.GetAllMatches();
            return Ok(matches);
        }
    }
}
