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

            var result = new List<GetAllContactResponse>();

            foreach (var contact in contacts)
            {
                if(contact is LegalPerson)
                {
                    var legalPerson = contact as LegalPerson;

                    result.Add(new GetAllContactResponse
                    {
                        Id = legalPerson.Id,
                        CompanyName = legalPerson.CompanyName.FullName,
                        Cnpj = legalPerson.Cnpj.Number,
                        City = legalPerson.Address.City,
                        State = legalPerson.Address.State,
                        TypePerson = TypePerson.LegalPerson.ToString(),
                    });
                }
                else
                {
                    var naturalPerson = contact as NaturalPerson;

                    result.Add(new GetAllContactResponse
                    {
                        Id = naturalPerson.Id,
                        Name = naturalPerson.Name.FullName,
                        Cpf = naturalPerson.Cpf.Number,
                        City = naturalPerson.Address.City,
                        State = naturalPerson.Address.State,
                        TypePerson = TypePerson.NaturalPerson.ToString(),
                    });
                }
            }

            return new CommandResult<List<GetAllContactResponse>>(true, null, result);
        }
    }
}
