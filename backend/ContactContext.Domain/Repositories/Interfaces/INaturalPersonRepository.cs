using ContactContext.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ContactContext.Domain.Repositories.Interfaces
{
    public interface INaturalPersonRepository : IContactRepository<NaturalPerson>
    {
        Task<bool> DocumentExists(string number);
        Task<bool> DocumentExistsExceptCurrent(string number, Guid id);
    }
}
