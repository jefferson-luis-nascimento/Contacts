using ContactContext.Domain.ValueObjects;

namespace ContactContext.Domain.Entities
{
    public class LegalPerson : Contact
    {
        public Name CompanyName { get; set; }
        public Name TradeName { get; set; }
        public Cnpj Cnpj { get; set; }

        public LegalPerson(Name companyName, Name tradeName, Cnpj cnpj, Address address)
            : base(address)
        {
            CompanyName = companyName;
            TradeName = tradeName;
            Cnpj = cnpj;

            AddNotifications(CompanyName, TradeName, Cnpj);
        }
    }
}
