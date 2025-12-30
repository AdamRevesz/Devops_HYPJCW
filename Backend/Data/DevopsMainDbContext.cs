using Microsoft.EntityFrameworkCore;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data
{
    public class DevopsMainDbContext : DbContext
    {
        public DbSet<Match> Matches { get; set; }

        public DevopsMainDbContext(DbContextOptions<DevopsMainDbContext> options) : base(options){}
    }
}
