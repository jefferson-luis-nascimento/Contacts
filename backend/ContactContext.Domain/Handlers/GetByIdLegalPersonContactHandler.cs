using ContactContext.Domain.Commands;
using ContactContext.Domain.Commands.Requests;
using ContactContext.Domain.Commands.Response;
using ContactContext.Domain.Entities;
using ContactContext.Domain.Handlers.Interfaces;
using ContactContext.Domain.Repositories.Interfaces;
using ContactContext.Shared.Commands;
using Flunt.Notifications;
using System.Threading.Tasks;

namespace ContactContext.Domain.Handlers
{
    public class GetByIdLegalPersonContactHandler : Notifiable, IGetByIdLegalPersonContactHandler
    {
        private ILegalPersonRepository _repository;

        public GetByIdLegalPersonContactHandler(ILegalPersonRepository repository)
        {
            _repository = repository;
        }

        public async Task<ICommandResult> Handle(GetByIdLegalPersonContactRequest command)
        {
            var legalPerson = await _repository.GetById(command.Id);

            if(legalPerson == null)
            {
                return new CommandResult<LegalPerson>(false, "Contact not found", null);
            }

            var result = new GetByIdLegalPersonContactResponse
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
            };

            return new CommandResult<GetByIdLegalPersonContactResponse>(true, "", result);
        }
    }
}
