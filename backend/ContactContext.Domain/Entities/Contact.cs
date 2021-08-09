using ContactContext.Shared.Entities;
using System;

namespace ContactContext.Domain.Entities
{
    public abstract class Contact : Entity
    {
        public Guid AddressId { get; private set; }
        public virtual Address Address { get; set; }

        public Contact(Address address)
        {
            Address = address;
        }
    }
}
