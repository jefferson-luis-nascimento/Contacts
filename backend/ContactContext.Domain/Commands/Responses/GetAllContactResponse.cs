using ContactContext.Shared.Commands;
using Flunt.Notifications;
using System;
using System.Collections.Generic;

namespace ContactContext.Domain.Commands.Response
{
    public class GetAllContactResponse 
    {
        public Guid Id { get; set; }
        public string CompanyName { get; set; }
        public string Cnpj { get; set; }
        public string Name { get; set; }
        public string Cpf { get; set; }       
        public string TypePerson { get; set; }
        public string City { get; set; }
        public string State { get; set; }
    }
}
