using RestAPI.Context;
using RestAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace RestAPI.Data
{
    public class SQLTask : ITask
    {
        private readonly PlanningContext _planningContext;
        public SQLTask(PlanningContext planningContext)
        {
            this._planningContext = planningContext;
        }
        public void AddTask(TaskDTO taskDTO)
        {
            taskDTO.Id = Guid.NewGuid();
            _planningContext.Tasks.Add(taskDTO);
            _planningContext.SaveChanges();
        }

        public void DeleteTask(TaskDTO taskDTO)
        {
            _planningContext.Tasks.Remove(taskDTO);
            _planningContext.SaveChanges();
        }

        public List<TaskDTO> GetAllTasks()
        {
            List<TaskDTO> tasks = _planningContext.Tasks.ToList();
            return tasks;
        }

        public TaskDTO GetTask(Guid id)
        {
            TaskDTO task = _planningContext.Tasks.SingleOrDefault(x => x.Id == id);
            return task;
        }

        public TaskDTO UpdateTask(TaskDTO taskDTO)
        {
            TaskDTO existingTask = _planningContext.Tasks.Find(taskDTO.Id);
            if (existingTask != null)
            {
                existingTask.Name = taskDTO.Name;
                existingTask.Description = taskDTO.Description;
                existingTask.DurationMinutes = taskDTO.DurationMinutes;
                existingTask.AmountOfPeople = taskDTO.AmountOfPeople;

                _planningContext.Tasks.Update(existingTask);
                _planningContext.SaveChanges();
                return existingTask;
            }
            return null;
            
        }
    }
}
