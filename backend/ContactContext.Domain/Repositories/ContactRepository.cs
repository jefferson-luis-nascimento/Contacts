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
        protected List<TEntity> _contacts;

        public IReadOnlyCollection<TEntity> Contacts => _contacts;

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
            return (await Task.FromResult(_contacts.FirstOrDefault(contact => contact != null && contact.Id == id))) as TEntity;
        }

        public async Task<TEntity> Update(TEntity contact)
        {
            var oldContact = _contacts.FirstOrDefault(c => c != null && c.Id == contact.Id);
            oldContact = contact;
            return (await Task.FromResult(oldContact)) as TEntity; 
        }

        private void InitDatabase()
        {
            _contacts = new List<TEntity>
            {
                (new LegalPerson(new Name("Eduarda e Emanuelly Transportes ME 201"),
                    new Name("Delivery Flash 1"),
                    new Cnpj("40.353.080/0001-83"),
                    new Address("Rua Doutor Cláudio Dias da Silva ok", "208", "Campinas City", "SC", "Brazi", "13083-466"))) as TEntity,
                (new NaturalPerson(new Name("Victor Cauê Junior Arthur Ferreira"),
                    new Cpf("679.863.369-27"),
                    new Birthday(new DateTime(1953, 6, 19)),
                    Gender.Male,
                    new Address("Rua Luís de Toledo Piza", "351", "São Paulo", "SP", "Brazil", "08275-070"))) as TEntity,
                (new LegalPerson(new Name("Eduarda e Emanuelly Transportes ME--"),
                    new Name("Delivery Flash"),
                    new Cnpj("40.353.080/0001-78"),
                    new Address("Rua Doutor Cláudio Dias da Silva asd", "208", "Campinas", "SP", "Brazi", "13083-460"))) as TEntity,
                (new NaturalPerson(new Name("Paula Cauê Arthur Ferreira"),
                    new Cpf("679.863.369-66"),
                    new Birthday(new DateTime(1953, 6, 19)),
                    Gender.Female,
                    new Address("Rua Luís de Toledo Piza da silva", "351", "São Paulo", "SP", "Brazil", "08275-070"))) as TEntity,
            };
        }
    }
}
