using ContactContext.Shared.ValueObjects;

using Flunt.Validations;

namespace ContactContext.Domain.ValueObjects
{
    public class Name : ValueObject
    {
        public string FullName { get; private set; }

        public Name(string fullName)
        {
            FullName = fullName;

            AddNotifications(new Contract()
                .Requires()
                .HasMinLen(FullName, 3, "Name.FullName", "The Full Name must have minimum of 3 characters")
            );
        }   
    }
}
