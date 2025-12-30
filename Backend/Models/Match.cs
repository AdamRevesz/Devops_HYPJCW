namespace Models
{
    public class Match
    {
        public DateTime Date { get; set; } = DateTime.Now.Date;
        public string[] Results { get; set; } = Array.Empty<string>();
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public int EnemyRounds { get; set; }
        public int PlayerRounds { get; set; }
    }
}
