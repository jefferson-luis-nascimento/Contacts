using ContactContext.Domain.Enums;
using ContactContext.Domain.ValueObjects;
using System;

namespace ContactContext.Domain.Entities
{
    public class NaturalPerson : Contact
    {
        public Name Name { get; set; }
        public Cpf Cpf { get; set; }
        public Birthday Birthday { get; set; }
        public Gender Gender { get; set; }

        public NaturalPerson(Name name, Cpf cpf, Birthday birthday, Gender gender, Address address)
            : base(address)
        {
            Name = name;
            Cpf = cpf;
            Birthday = birthday;
            Gender = gender;

            AddNotifications(Name, Cpf, Birthday);
        } 
    }
}
