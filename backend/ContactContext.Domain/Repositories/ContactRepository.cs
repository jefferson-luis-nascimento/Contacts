using ContactContext.Domain.Entities;
using ContactContext.Domain.Enums;
using ContactContext.Domain.Repositories.Interfaces;
using ContactContext.Domain.ValueObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContactContext.Domain.Repositories
{
    public class ContactRepository<TEntity> : IContactRepository<TEntity> where TEntity : Contact
    {
        protected List<Contact> _contacts;

        public IReadOnlyCollection<Contact> Contacts => _contacts;

        public ContactRepository()
        {
            InitDatabase();
        }
        public async Task<TEntity> Create(TEntity contact)
        {
            _contacts.Add(contact);

            return await Task.FromResult(contact);

        }

        public async Task<IEnumerable<TEntity>> GetAll()
        {
            return (await Task.FromResult(_contacts)) as IEnumerable<TEntity>;
        }

        public async Task<TEntity> GetById(Guid id)
        {
            return (await Task.FromResult(_contacts.FirstOrDefault(contact => contact.Id == id))) as TEntity;
        }

        public async Task<TEntity> Update(TEntity contact)
        {
            var oldContact = _contacts.FirstOrDefault(c => c.Id == contact.Id);
            oldContact = contact;
            return (await Task.FromResult(oldContact)) as TEntity; 
        }

        private void InitDatabase()
        {
            _contacts = new List<Contact>
            {
                new LegalPerson(new Name("Eduarda e Emanuelly Transportes ME"),
                    new Name("Delivery Flash"),
                    new Cnpj("40.353.080/0001-83"),
                    new Address("Rua Doutor Cláudio Dias da Silva", "208", "Campinas", "SP", "Brazi", "13083-460")),
                new NaturalPerson(new Name("Victor Cauê Arthur Ferreira"),
                    new Cpf("679.863.369-27"),
                    new Birthday(new DateTime(1953, 6, 19)),
                    Gender.Male,
                    new Address("Rua Luís de Toledo Piza", "351", "São Paulo", "SP", "Brazil", "08275-070")),
                new LegalPerson(new Name("Eduarda e Emanuelly Transportes ME"),
                    new Name("Delivery Flash"),
                    new Cnpj("40.353.080/0001-83"),
                    new Address("Rua Doutor Cláudio Dias da Silva", "208", "Campinas", "SP", "Brazi", "13083-460")),
                new NaturalPerson(new Name("Victor Cauê Arthur Ferreira"),
                    new Cpf("679.863.369-27"),
                    new Birthday(new DateTime(1953, 6, 19)),
                    Gender.Male,
                    new Address("Rua Luís de Toledo Piza", "351", "São Paulo", "SP", "Brazil", "08275-070")),
            };
        }
    }
}
