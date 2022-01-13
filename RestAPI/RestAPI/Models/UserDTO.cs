using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace RestAPI.Models
{
    public class UserDTO
    {
        [Key]
        [Required]
        public string UserName { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        [Required]
        public string Verification { get; set; }
        public Roles Role { get; set; }
    }
}
