using ContactContext.Shared.ValueObjects;
using Flunt.Validations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ContactContext.Domain.ValueObjects
{
    public class Cpf : Document
    {
        public Cpf(string number) 
            : base(number)
        {
            AddNotifications(new Contract()
                .Requires()
                .Matchs(Number, @"^\d{3}\.\d{3}\.\d{3}-\d{2}$", "Cpf.Number", "The Cpf Number is invalid")
            );
        }
    }
}
