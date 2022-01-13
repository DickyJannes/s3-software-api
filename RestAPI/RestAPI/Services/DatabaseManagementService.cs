using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using RestAPI.Context;

namespace RestAPI.Services
{
    public static class DatabaseManagementService
    {
        public static void MigrationInitialisation(IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.CreateScope())
            {
                var database = serviceScope.ServiceProvider.GetService<PlanningContext>().Database;
                var migrations = database.GetMigrations();
                if (migrations == null)
                {
                    database.Migrate();
                }
            }
        }
    }
}
