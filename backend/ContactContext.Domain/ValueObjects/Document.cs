using ContactContext.Shared.ValueObjects;

namespace ContactContext.Domain.ValueObjects
{
    public class Document : ValueObject
    {
        public string Number { get; set; }

        public Document(string number)
        {
            Number = number;
        }
    }
}
