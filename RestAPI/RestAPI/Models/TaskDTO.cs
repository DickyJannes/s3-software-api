using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace RestAPI.Models
{
    public class TaskDTO
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public int DurationMinutes { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public int AmountOfPeople { get; set; }
    }
}
