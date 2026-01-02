
using Data.Repository;
using Logic;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Devops_Backend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);


            // Add services to the container.
            builder.Services.AddTransient<MatchLogic>();
            builder.Services.AddTransient<IRepository<Match>, Repository<Match>>();
            builder.Services.AddDbContext<Data.DevopsMainDbContext>(options =>
            {
                options.UseSqlServer(builder.Configuration["db:conn"], sqlServerOptions =>
                {
                    sqlServerOptions.EnableRetryOnFailure(
                        maxRetryCount: 5,
                        maxRetryDelay: TimeSpan.FromSeconds(30),
                        errorNumbersToAdd: null);
                });
                options.UseLazyLoadingProxies();

            });

            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAngular", policy =>
                {
                    policy.WithOrigins(builder.Configuration["settings:frontend"] ?? "http://localhost:4200")
                          .AllowAnyHeader()
                          .AllowAnyMethod();
                });
            });

            if (builder.Environment.IsProduction())
            {
                builder.WebHost.ConfigureKestrel(options =>
                {
                    options.ListenAnyIP(int.Parse(builder.Configuration["settings:port"] ?? "6500"));
                });
            }

            var app = builder.Build();



            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseCors("AllowAngular");

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
