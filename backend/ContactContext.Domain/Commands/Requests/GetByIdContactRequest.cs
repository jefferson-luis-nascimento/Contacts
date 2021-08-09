using ContactContext.Shared.Commands;
using Flunt.Notifications;
using System;


namespace ContactContext.Domain.Commands.Requests
{
    public class GetByIdContactRequest : Notifiable, ICommand
    {
        public Guid Id { get; set; }
        public void Validate()
        {
            
        }
    }
}
