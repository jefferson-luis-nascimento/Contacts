using ContactContext.Shared.Commands;
using Flunt.Notifications;


namespace ContactContext.Domain.Commands.Requests
{
    public class GetAllContactRequest : Notifiable, ICommand
    {
        public void Validate()
        {
            
        }
    }
}
