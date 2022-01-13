using Microsoft.AspNetCore.SignalR;
using RestAPI.Controllers;
using RestAPI.Data;
using RestAPI.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RestAPI.Hubs
{
    public class TaskHub : Hub
    {
        public override async Task OnConnectedAsync()
        {
            //var connectionId = Context.ConnectionId;
            //await Groups.AddToGroupAsync(connectionId, "test-chat");
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            //var connectionId = Context.ConnectionId;

            //await Groups.RemoveFromGroupAsync(connectionId, "test-chat");
            await base.OnDisconnectedAsync(exception);
        }

        public async Task GetTasks(List<TaskDTO> tasks)
        {
            await Clients.All.SendAsync("GetTasks", tasks);
        }
    }
}
