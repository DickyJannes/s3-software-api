using RestAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestAPI.Services
{
    public class LoginService
    {
        // User from frontend = userToVerify[0], User from database = userToVerify[1]
        public string Login(List<UserDTO> userToVerify)
        {
            if (userToVerify.Count != 2) return null;
            if (userToVerify[0].UserName != userToVerify[1].UserName) return null;
            if (userToVerify[0].Password != userToVerify[1].Password) return null;

            return GenerateVerification();
        }

        public bool Logout(List<UserDTO> userToVerify)
        {
            if (userToVerify.Count != 2) return false;
            if (userToVerify[0].UserName != userToVerify[1].UserName) return false;
            if (userToVerify[0].Verification != userToVerify[1].Verification) return false;

            return true;
        }

        public string Verify(List<UserDTO> userToVerify)
        {
            if (userToVerify.Count != 2) return null;
            if (userToVerify[0].UserName != userToVerify[1].UserName) return null;
            if (userToVerify[0].Verification != userToVerify[1].Verification) return null;

            return GenerateVerification();
        }

        private string GenerateVerification()
        {
            Random random = new Random();
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            return new string(Enumerable.Repeat(chars, 10)
                .Select(s => s[random.Next(s.Length)]).ToArray());
        }
    }
}
