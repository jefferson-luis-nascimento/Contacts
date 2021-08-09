using ContactContext.Shared.Entities;
using Flunt.Validations;

namespace ContactContext.Domain.Entities
{
    public class Address : Entity
    {
        public string AddressLine1 { get; private set; }
        public string AddressLine2 { get; private set; }
        public string City { get; private set; }
        public string State { get; private set; }
        public string Country { get; private set; }
        public string ZipCode { get; private set; }

        public Address(string addressLine1, string addressLine2, string city, string state, string country, string zipCode)
        {
            AddressLine1 = addressLine1;
            AddressLine2 = addressLine2;
            City = city;
            State = state;
            Country = country;
            ZipCode = zipCode;

            AddNotifications(new Contract()
                .Requires()
                .HasMinLen(AddressLine1, 3, "Address.AddressLine1", "The Address Line 1 must have minimum of 3 characters")
                .HasMinLen(City, 3, "Address.City", "The City must have minimum of 3 characters")
                .HasLen(State, 2, "Address.State", "The state must have 2 characters")
                .HasMinLen(Country, 2, "Address.Country", "The Country must have minimum of 2 characters")
                .HasMinLen(ZipCode, 8, "Address.ZipCode", "The Zip Code must minimum of 8 characters")
            );
        }
    }
}
