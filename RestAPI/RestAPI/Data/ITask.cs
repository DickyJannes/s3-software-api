using RestAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestAPI.Data
{
    public interface ITask
    {
        void AddTask(TaskDTO taskDTO);
        void DeleteTask(TaskDTO taskDTO);
        TaskDTO UpdateTask(TaskDTO taskDTO);
        TaskDTO GetTask(Guid id);
        List<TaskDTO> GetAllTasks();
    }
}
