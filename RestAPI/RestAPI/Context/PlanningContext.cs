using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using RestAPI.Models;

namespace RestAPI.Context
{
    public class PlanningContext : DbContext
    {
        public PlanningContext(DbContextOptions<PlanningContext> options) : base(options)
        {

        }
        public DbSet<TaskDTO> Tasks { get; set; }
        public DbSet<UserDTO> Users { get; set; }
    }
}
