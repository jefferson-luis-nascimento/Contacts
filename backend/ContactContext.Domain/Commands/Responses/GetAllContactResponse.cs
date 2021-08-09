using ContactContext.Shared.Commands;
using Flunt.Notifications;
using System.Collections.Generic;

namespace ContactContext.Domain.Commands.Response
{
    public class GetAllContactResponse 
    {
        public List<GetByIdContactResponse> Contacts { get; set; }

        public GetAllContactResponse()
        {
            Contacts = new List<GetByIdContactResponse>();
        }

    }
}
