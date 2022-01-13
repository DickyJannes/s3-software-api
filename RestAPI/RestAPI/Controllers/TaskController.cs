using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR.Client;
using RestAPI.Data;
using RestAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors]
    public class TaskController : ControllerBase
    {
        private ITask _task;
        public static HubConnection _connection;
        public TaskController(ITask task)
        {
            this._task = task;
            if (_connection == null || _connection.State == HubConnectionState.Disconnected)
            {
                _connection = new HubConnectionBuilder()
                .WithUrl("http://localhost:5000/ws/task")
                .WithAutomaticReconnect()
                .Build();
                _connection.StartAsync();
            }
        }
        private List<TaskDTO> GetAllTasks()
        {
            List<TaskDTO> tasks = _task.GetAllTasks();
            return tasks.OrderByDescending(x => x.Name).ToList();
        }

        [HttpGet]
        public IActionResult GetTasks()
        {
            return Ok(GetAllTasks());
        }

        [HttpGet("{id}")]
        public IActionResult GetTask(Guid id)
        {
            var task = _task.GetTask(id);

            if (task == null)
            {
                return NotFound($"Task with Id: {id} was not found.");
            }

            return Ok(task);
        }

        [HttpPost]
        public async Task<IActionResult> AddTask(TaskDTO task)
        {
            task.Id = Guid.NewGuid();
            _task.AddTask(task);
            await _connection.InvokeAsync("GetTasks", GetAllTasks());
            return Created(HttpContext.Request.Scheme + "://" + HttpContext.Request.Host + HttpContext.Request.Path + "/" + task.Id, task);
        }

        [HttpPatch]
        public async Task<IActionResult> UpdateTask(TaskDTO task)
        {
            var existingTask = _task.GetTask(task.Id);

            if (task == null)
            {
                return NotFound($"Task with Id: {task.Id} was not found.");
            }

            if (task.Name != null && task.Name != existingTask.Name) existingTask.Name = task.Name;
            if (task.Description != null && task.Description != existingTask.Description) existingTask.Description = task.Description;
            if (task.DurationMinutes != 0 && task.DurationMinutes != existingTask.DurationMinutes) existingTask.DurationMinutes = task.DurationMinutes;
            if (task.AmountOfPeople != 0 && task.AmountOfPeople != existingTask.AmountOfPeople) existingTask.AmountOfPeople = task.AmountOfPeople;

            _task.UpdateTask(existingTask);
            await _connection.InvokeAsync("GetTasks", GetAllTasks());
            return Ok(task);
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteTask(TaskDTO taskId)
        {
            var task = _task.GetTask(taskId.Id);

            if (task == null)
            {
                return NotFound($"Task with Id: {taskId.Id} was not found.");
            }

            _task.DeleteTask(task);
            await _connection.InvokeAsync("GetTasks", GetAllTasks());
            return Ok();
        }
    }
}
