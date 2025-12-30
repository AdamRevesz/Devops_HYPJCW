using Data.Repository;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Query;
using Models;
using System.Runtime.InteropServices;

namespace Logic
{
    public class MatchLogic
    {
        private readonly IRepository<Match> _matchRepository;

        public MatchLogic(IRepository<Match> matchRepository)
        {
            _matchRepository = matchRepository;
        }

        public async Task<Match> AddMatch(Match match)
        {
            match.Id = Guid.NewGuid().ToString();
            return await _matchRepository.Create(match);
        }

        public async Task RemoveMatchResult(string id)
        {
            await _matchRepository.Delete(id);
        }

        public async Task<List<Match>> GetAllMatches()
        {
            List<Match> matches = _matchRepository.GetAll().ToList();
            return matches;
        }

        public async Task<Match> GetMatchById(string id)
        {
           return await _matchRepository.GetOne(id);
        }

        public async Task<Match> UpdateMatch(Match match)
        {
            return await _matchRepository.Update(match);
        }
    }
}
