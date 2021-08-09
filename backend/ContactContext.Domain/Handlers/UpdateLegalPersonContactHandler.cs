using ContactContext.Domain.Commands;
using ContactContext.Domain.Commands.Requests;
using ContactContext.Domain.Entities;
using ContactContext.Domain.Handlers.Interfaces;
using ContactContext.Domain.Repositories.Interfaces;
using ContactContext.Domain.ValueObjects;
using ContactContext.Shared.Commands;
using Flunt.Notifications;
using System.Threading.Tasks;

namespace ContactContext.Domain.Handlers
{
    public class UpdateLegalPersonContactHandler : Notifiable, IUpdateLegalPersonContactHandler
    {
        private ILegalPersonRepository _repository;

        public UpdateLegalPersonContactHandler(ILegalPersonRepository repository)
        {
            _repository = repository;
        }
        public async Task<ICommandResult> Handle(UpdateLegalPersonContactRequest command)
        {
            // Fail Fast Validations
            command.Validate();
            if (command.Invalid)
            {
                AddNotifications(command);
                return new CommandResult<NaturalPerson>(false, "Contact invalid.", null);
            }

            // Verify if CPF is already in use
            if ( await _repository.DocumentExistsExceptCurrent(command.Cnpj, command.Id))
                AddNotification("Document", "This CNPJ is already in use in aother Contact.");

            //Genarate VOs
            var companyName = new Name(command.CompanyName);
            var tradeName = new Name(command.TradeName);
            var cnpj = new Cnpj(command.Cnpj);
            var address = new Address(command.AddressLine1, command.AddressLine2, command.City, command.State, command.Country, command.ZipCode);

            //Generate NaturalPerson entity
            var legalPerson = new LegalPerson(companyName, tradeName, cnpj, address);

            //Validation
            AddNotifications(companyName, tradeName, cnpj, address, legalPerson);

            if (Invalid)
            {
                return new CommandResult<NaturalPerson>(false, "Problem on contact shape.", null);
            }

            var newLegalPerson = await _repository.Create(legalPerson);

            return new CommandResult<LegalPerson>(true, "Contact update successfully.", newLegalPerson);
        }
    }
}
