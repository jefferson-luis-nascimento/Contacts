using ContactContext.Domain.Enums;
using ContactContext.Shared.Commands;
using Flunt.Notifications;
using System;


namespace ContactContext.Domain.Commands.Response
{
    public class CreateNaturalPersonContactResponse : Notifiable, ICommand
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Cpf { get; set; }
        public DateTime Birthday { get; set; }
        public Gender Gender { get; set; }

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
