using System;


namespace ContactContext.Domain.Commands.Response
{
    public class GetByIdLegalPersonContactResponse : GetByIdContactResponse
    {
        public Guid Id { get; set; }
        public string CompanyName { get; set; }
        public string TradeName { get; set; }
        public string Cnpj { get; set; }
    }
}
