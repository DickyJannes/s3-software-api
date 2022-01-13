using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using RestAPI.Data;
using RestAPI.Models;
using RestAPI.Services;
using System.Collections.Generic;

namespace RestAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors]
    public class LoginController : ControllerBase
    {
        private readonly ILogin _login;
        private readonly LoginService _loginService;
        public LoginController(ILogin login)
        {
            this._login = login;
            this._loginService = new LoginService();
        }

        [HttpPost("login")]
        public IActionResult Login(UserDTO user)
        {
            UserDTO existingUser = _login.GetUser(user.UserName);
            if (existingUser != null)
            {
                var verificationString = _loginService.Login(new List<UserDTO>() { user, existingUser });
                if (verificationString != null)
                {
                    existingUser.Verification = verificationString;
                    UserDTO loggedInUser = _login.Login(existingUser);
                    if (loggedInUser != null)
                    {
                        loggedInUser.Password = null;
                        return Ok(loggedInUser);
                    }
                }
                return Unauthorized();
            }
            
            return NotFound();
        }

        [HttpPost("logout")]
        public IActionResult Logout(UserDTO user)
        {
            UserDTO existingUser = _login.GetUser(user.UserName);
            if (existingUser != null)
            {
                if (_loginService.Logout(new List<UserDTO>() { user, existingUser }))
                {
                    if (_login.Logout(existingUser)) return Ok(true);
                }
                return Unauthorized(false);
            }

            return NotFound();
        }

        [HttpPost("verify")]
        public IActionResult Verify(UserDTO user)
        {
            UserDTO existingUser = _login.GetUser(user.UserName);
            if (existingUser != null)
            {
                var verificationString = _loginService.Verify(new List<UserDTO>() { user, existingUser });
                if (verificationString != null)
                {
                    existingUser.Verification = verificationString;
                    UserDTO loggedInUser = _login.Login(existingUser);
                    if (loggedInUser != null)
                    {
                        loggedInUser.Password = null;
                        return Ok(loggedInUser);
                    }
                }
                return Unauthorized();
            }

            return NotFound();
        }
    }
}
