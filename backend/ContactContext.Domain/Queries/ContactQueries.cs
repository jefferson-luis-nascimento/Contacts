using ContactContext.Domain.Entities;
using System;
using System.Linq.Expressions;

namespace ContactContext.Domain.Queries
{
    public static class ContactQueries
    {
        public static Expression<Func<NaturalPerson, bool>> GetNaturalContactInfo(string document)
        {
            return x => x.Cpf.Number == document;
        }
    }
}
