using RestAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestAPI.Data
{
    public interface ILogin
    {
        UserDTO Login(UserDTO user);
        bool Logout(UserDTO user);
        UserDTO GetUser(string UserName);
    }
}
