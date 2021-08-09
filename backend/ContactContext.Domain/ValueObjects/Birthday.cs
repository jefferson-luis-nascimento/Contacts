using ContactContext.Shared.ValueObjects;
using Flunt.Validations;
using System;

namespace ContactContext.Domain.ValueObjects
{
    public class Birthday : ValueObject
    {
        public DateTime Date { get; private set; }

        public Birthday(DateTime date)
        {
            Date = date;

            AddNotifications(new Contract()
                .Requires()
                .IsGreaterThan(Date, DateTime.Today, "Birthday.Date", "The Date must be less than today")
            );
        }
    }
}
