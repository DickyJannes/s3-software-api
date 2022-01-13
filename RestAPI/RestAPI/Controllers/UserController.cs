using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using RestAPI.Data;
using RestAPI.Models;
using System.Collections.Generic;

namespace RestAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors]
    public class UserController : ControllerBase
    {
        private readonly IUser _user;
        public UserController(IUser user)
        {
            this._user = user;
        }

        private string GetVerification(UserDTO user)
        {
            UserDTO existingUser = _user.GetUser(user.UserName);
            if (existingUser != null)
            {
                if (existingUser.Verification == user.Verification)
                {
                    return existingUser.Verification;
                }
            }
            return null;
        }

        [HttpGet("{UserName}")]
        public IActionResult GetUser(string UserName)
        {
            UserDTO user = _user.GetUser(UserName);
            if (user != null)
            {
                user.Password = null;
                return Ok(user);
            }
            return NotFound();
        }

        [HttpPost("Users")]
        public IActionResult GetUsers(UserDTO user)
        {
            if (user.Role >= Roles.Supervisor && GetVerification(user) != null)
            {
                List<UserDTO> users = _user.GetUsers();
                foreach (UserDTO DTO in users)
                {
                    DTO.Password = null;
                    DTO.Verification = null;
                }
                return Ok(users);
            }

            return Unauthorized();
        }

        [HttpPost]
        public IActionResult AddUser(List<UserDTO> users)
        {
            if (_user.GetUser(users[0].UserName).Role >= Roles.HeadSupervisor && GetVerification(users[0]) != null)
            {
                if (users.Count == 2)
                {
                    users[1].Verification = "";
                    UserDTO user = _user.AddUser(users[1]);
                    return Ok(user);
                }

                return NotFound();
            }

            return Unauthorized();
        }

        [HttpDelete]
        public IActionResult DeleteUser(List<UserDTO> users)
        {
            if (_user.GetUser(users[0].UserName).Role >= Roles.HeadSupervisor && GetVerification(users[0]) != null)
            {
                if (users.Count == 2)
                {
                    _user.DeleteUser(users[1]);
                    return Ok();
                }

                return NotFound();
            }

            return Unauthorized();
        }

        [HttpPatch]
        public IActionResult UpdateUser(List<UserDTO> users)
        {
            if (_user.GetUser(users[0].UserName).Role >= Roles.HeadSupervisor && GetVerification(users[0]) != null)
            {
                if (users.Count == 2)
                {
                    _user.UpdateUser(users[1]);
                    return Ok();
                }

                return NotFound();
            }

            return Unauthorized();
        }
    }
}
