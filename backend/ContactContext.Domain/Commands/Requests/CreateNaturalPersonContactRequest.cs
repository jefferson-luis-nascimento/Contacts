using ContactContext.Domain.Enums;
using ContactContext.Shared.Commands;
using Flunt.Notifications;
using System;


namespace ContactContext.Domain.Commands.Requests
{
    public class CreateNaturalPersonContactRequest : Notifiable, ICommand
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Cpf { get; set; }
        public string Birthday { get; set; }
        public string Gender { get; set; }

        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Country { get; set; }
        public string ZipCode { get; set; }

        public void Validate()
        {
            
        }
    }
}
