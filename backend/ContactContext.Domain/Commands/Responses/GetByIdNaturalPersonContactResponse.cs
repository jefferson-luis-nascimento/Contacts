using ContactContext.Domain.Enums;
using System;


namespace ContactContext.Domain.Commands.Response
{
    public class GetByIdNaturalPersonContactResponse : GetByIdContactResponse
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Cpf { get; set; }
        public DateTime Birthday { get; set; }
        public Gender Gender { get; set; }
    }
}
