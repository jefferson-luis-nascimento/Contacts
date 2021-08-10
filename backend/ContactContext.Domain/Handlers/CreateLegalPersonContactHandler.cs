using ContactContext.Domain.Commands;
using ContactContext.Domain.Commands.Requests;
using ContactContext.Domain.Commands.Response;
using ContactContext.Domain.Entities;
using ContactContext.Domain.Handlers.Interfaces;
using ContactContext.Domain.Repositories.Interfaces;
using ContactContext.Domain.ValueObjects;
using ContactContext.Shared.Commands;
using Flunt.Notifications;
using System.Threading.Tasks;

namespace ContactContext.Domain.Handlers
{
    public class CreateLegalPersonContactHandler : Notifiable, ICreateLegalPersonContactHandler
    {
        private readonly ILegalPersonRepository _repository;

        public CreateLegalPersonContactHandler(ILegalPersonRepository repository)
        {
            _repository = repository;
        }

        public async Task<ICommandResult> Handle(CreateLegalPersonContactRequest command)
        {
            // Fail Fast Validations
            command.Validate();
            if (command.Invalid)
            {
                AddNotifications(command);
                return new CommandResult<UpdateLegalPersonContactResponse>(false, "Contact invalid.", null);
            }

            // Verify if CPF is already in use
            if (await _repository.DocumentExists(command.Cnpj))
                AddNotification("CNPJ", "This CNPJ is already in use.");

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
                return new CommandResult<UpdateLegalPersonContactResponse>(false, "Problem on contact shape.", null);
            }

            var newLegalPerson = await _repository.Create(legalPerson);

            var result = new UpdateLegalPersonContactResponse
            {
                Id = newLegalPerson.Id,
                CompanyName = newLegalPerson.CompanyName.FullName,
                TradeName = newLegalPerson.TradeName.FullName,
                Cnpj = newLegalPerson.Cnpj.Number,
                AddressLine1 = newLegalPerson.Address.AddressLine1,
                AddressLine2 = newLegalPerson.Address.AddressLine2,
                City = newLegalPerson.Address.City,
                State = newLegalPerson.Address.State,
                Country = newLegalPerson.Address.Country,
                ZipCode = newLegalPerson.Address.ZipCode,
            };

            return new CommandResult<UpdateLegalPersonContactResponse>(true, "Contact register successfully.", result);
        }
    }
}
