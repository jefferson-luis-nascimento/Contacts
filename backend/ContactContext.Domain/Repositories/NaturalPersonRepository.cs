using ContactContext.Domain.Entities;
using ContactContext.Domain.Repositories.Interfaces;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace ContactContext.Domain.Repositories
{
    public class NaturalPersonRepository : ContactRepository<NaturalPerson>, INaturalPersonRepository
    {
        public async Task<bool> DocumentExists(string number)
        {
            return await Task.FromResult(_contacts.Any(contact => (contact as NaturalPerson).Cpf.Number == number));
        }

        public async Task<bool> DocumentExistsExceptCurrent(string number, Guid id)
        {
            return await Task.FromResult(_contacts.Any(contact => (contact as NaturalPerson).Cpf.Number == number && contact.Id != id));
        }
    }
}
