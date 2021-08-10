using ContactContext.Domain.Enums;
using ContactContext.Shared.Commands;
using Flunt.Notifications;
using System;


namespace ContactContext.Domain.Commands.Response
{
    public class GetByIdContactResponse
    {
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Country { get; set; }
        public string ZipCode { get; set; }
    }
}
