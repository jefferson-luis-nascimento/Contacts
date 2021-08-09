using ContactContext.Domain.Enums;
using ContactContext.Shared.Commands;
using Flunt.Notifications;
using System;

namespace ContactContext.Domain.Commands.Response
{
    public class CreateLegalPersonContactResponse : Notifiable, ICommand
    {
        public Guid Id { get; set; }
        public string CompanyName { get; set; }
        public string TradeName { get; set; }
        public string Cnpj { get; set; }

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
