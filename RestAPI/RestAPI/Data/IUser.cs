using RestAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestAPI.Data
{
    public interface IUser
    {
        UserDTO GetUser(string UserName);
        List<UserDTO> GetUsers();
        UserDTO AddUser(UserDTO user);
        void DeleteUser(UserDTO user);
        UserDTO UpdateUser(UserDTO user);
    }
}
