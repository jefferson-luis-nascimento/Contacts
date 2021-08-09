using ContactContext.Domain.Commands;
using ContactContext.Domain.Commands.Requests;
using ContactContext.Domain.Commands.Response;
using ContactContext.Domain.Entities;
using ContactContext.Domain.Enums;
using ContactContext.Domain.Handlers.Interfaces;
using ContactContext.Domain.Repositories.Interfaces;
using ContactContext.Shared.Commands;
using Flunt.Notifications;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContactContext.Domain.Handlers
{
    public class GetAllContactHandler : Notifiable, IGetAllContactHandler
    {
        private IContactRepository<Contact> _repository;

        public GetAllContactHandler(IContactRepository<Contact> repository)
        {
            _repository = repository;
        }

        public async Task<ICommandResult> Handle(GetAllContactRequest command)
        {
            var contacts = await _repository.GetAll();

            var result = new GetAllContactResponse();

            foreach (var contact in contacts)
            {
                if(contact is LegalPerson)
                {
                    var legalPerson = contact as LegalPerson;

                    result.Contacts.Add(new GetByIdContactResponse
                    {
                        Id = legalPerson.Id,
                        CompanyName = legalPerson.CompanyName.FullName,
                        TradeName = legalPerson.TradeName.FullName,
                        Cnpj = legalPerson.Cnpj.Number,
                        AddressLine1 = legalPerson.Address.AddressLine1,
                        AddressLine2 = legalPerson.Address.AddressLine2,
                        City = legalPerson.Address.City,
                        State = legalPerson.Address.State,
                        Country = legalPerson.Address.Country,
                        ZipCode = legalPerson.Address.ZipCode,
                        TypePerson = TypePerson.LegalPerson,
                    });
                }
                else
                {
                    var naturalPerson = contact as NaturalPerson;

                    result.Contacts.Add(new GetByIdContactResponse
                    {
                        Id = naturalPerson.Id,
                        Name = naturalPerson.Name.FullName,
                        Cpf = naturalPerson.Cpf.Number,
                        Birthday = naturalPerson.Birthday.Date,
                        Gender = naturalPerson.Gender,
                        AddressLine1 = naturalPerson.Address.AddressLine1,
                        AddressLine2 = naturalPerson.Address.AddressLine2,
                        City = naturalPerson.Address.City,
                        State = naturalPerson.Address.State,
                        Country = naturalPerson.Address.Country,
                        ZipCode = naturalPerson.Address.ZipCode,
                        TypePerson = TypePerson.NaturalPerson,
                    });
                }
            }

            return new CommandResult<GetAllContactResponse>(true, null, result);
        }
    }
}
