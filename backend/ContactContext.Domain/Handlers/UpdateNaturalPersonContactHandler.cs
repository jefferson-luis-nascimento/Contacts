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
    public class UpdateNaturalPersonContactHandler : Notifiable, IUpdateNaturalPersonContactHandler
    {
        private INaturalPersonRepository _repository;

        public UpdateNaturalPersonContactHandler(INaturalPersonRepository repository)
        {
            _repository = repository;
        }

        public async Task<ICommandResult> Handle(UpdateNaturalPersonContactRequest command)
        {
            // Fail Fast Validations
            command.Validate();
            if (command.Invalid)
            {
                AddNotifications(command);
                return new CommandResult<NaturalPerson>(false, "Contact invalid.", null);
            }

            // Verify if CPF is already in use
            if ( await _repository.DocumentExistsExceptCurrent(command.Cpf, command.Id))
                AddNotification("Document", "This CPF is already in use in aother Contact.");

            //Genarate VOs
            var name = new Name(command.Name);
            var cpf = new Cpf(command.Cpf);
            var birthday = new Birthday(command.Birthday);
            var gender = command.Gender;
            var address = new Address(command.AddressLine1, command.AddressLine2, command.City, command.State, command.Country, command.ZipCode);

            //Generate NaturalPerson entity
            var naturalPerson = new NaturalPerson(name, cpf, birthday, gender, address);

            //Validation
            AddNotifications(name, cpf, birthday, address, naturalPerson);

            if(Invalid)
            {
                return new CommandResult<NaturalPerson>(false, "Problem on contact shape.", null);
            }

            var newNaturalPerson = await _repository.Update(naturalPerson);

            return new CommandResult<NaturalPerson>(true, "Contact update successfully.", newNaturalPerson);
        }
    }
}
