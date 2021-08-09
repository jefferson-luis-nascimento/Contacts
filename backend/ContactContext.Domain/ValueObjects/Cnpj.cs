using Flunt.Validations;

namespace ContactContext.Domain.ValueObjects
{
    public class Cnpj : Document
    {
        public Cnpj(string number)
            : base(number)
        {
            AddNotifications(new Contract()
                .Requires()
                .Matchs(Number, @"(^(\d{2}.\d{3}.\d{3}/\d{4}-\d{2})|(\d{14})$)", "Cnpj.Number", "The Cnpj Number is invalid")
            );
        }
    }
}
