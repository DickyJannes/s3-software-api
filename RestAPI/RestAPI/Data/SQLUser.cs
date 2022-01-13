using RestAPI.Context;
using RestAPI.Models;
using RestAPI.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestAPI.Data
{
    public class SQLUser : IUser, ILogin
    {
        private readonly PlanningContext _planningContext;
        public SQLUser(PlanningContext planningContext)
        {
            this._planningContext = planningContext;
        }
        public UserDTO AddUser(UserDTO user)
        {
            UserDTO existingUser = _planningContext.Users.Find(user.UserName);
            if (existingUser == null)
            {
                _planningContext.Users.Add(user);
                _planningContext.SaveChanges();
                return user;
            }
            return null;
        }

        public void DeleteUser(UserDTO user)
        {
            UserDTO existingUser = _planningContext.Users.Find(user.UserName);
            if (existingUser != null)
            {
                _planningContext.Users.Remove(existingUser);
                _planningContext.SaveChanges();
            }
        }

        public UserDTO GetUser(string UserName)
        {
            UserDTO existingUser = _planningContext.Users.Find(UserName);
            if (existingUser != null)
            {
                return existingUser;
            }
            return null;
        }

        public List<UserDTO> GetUsers()
        {
            return _planningContext.Users.ToList();
        }

        public UserDTO Login(UserDTO user)
        {
            UserDTO existingUser = _planningContext.Users.Find(user.UserName);
            if (existingUser != null)
            {
                existingUser.Verification = user.Verification;
                _planningContext.Users.Update(existingUser);
                _planningContext.SaveChanges();
                return existingUser;
            }
            return null;
        }

        public bool Logout(UserDTO user)
        {
            UserDTO existingUser = _planningContext.Users.Find(user.UserName);
            if (existingUser != null)
            {
                existingUser.Verification = "";
                _planningContext.Users.Update(existingUser);
                _planningContext.SaveChanges();
                return true;
            }
            return false;
        }

        public UserDTO UpdateUser(UserDTO user)
        {
            UserDTO existingUser = _planningContext.Users.Find(user.UserName);
            if (existingUser != null)
            {
                existingUser.Name = user.Name;
                existingUser.Role = user.Role;

                _planningContext.Users.Update(existingUser);
                _planningContext.SaveChanges();
                return existingUser;
            }
            return null;
        }
    }
}
