using ContactContext.Domain.Commands;
using ContactContext.Domain.Commands.Requests;
using ContactContext.Domain.Commands.Response;
using ContactContext.Domain.Entities;
using ContactContext.Domain.Enums;
using ContactContext.Domain.Handlers.Interfaces;
using ContactContext.Domain.Repositories.Interfaces;
using ContactContext.Domain.ValueObjects;
using ContactContext.Shared.Commands;
using Flunt.Notifications;
using System;
using System.Threading.Tasks;

namespace ContactContext.Domain.Handlers
{
    public class CreateNaturalPersonContactHandler : Notifiable, ICreateNaturalPersonContactHandler
    {
        private readonly INaturalPersonRepository _repository;

        public CreateNaturalPersonContactHandler(INaturalPersonRepository repository)
        {
            _repository = repository;
        }

        public async Task<ICommandResult> Handle(CreateNaturalPersonContactRequest command)
        {
            // Fail Fast Validations
            command.Validate();
            if (command.Invalid)
            {
                AddNotifications(command);
                return new CommandResult<CreateNaturalPersonContactResponse>(false, "Contact invalid.", null);
            }

            // Verify if CPF is already in use
            if ( await _repository.DocumentExists(command.Cpf))
                AddNotification("Document", "This CPF is already in use.");

            //Genarate VOs
            var name = new Name(command.Name);
            var cpf = new Cpf(command.Cpf);
            var birthday = new Birthday(DateTime.Parse(command.Birthday));
            var gender = (Gender)Enum.Parse(typeof(Gender), command.Gender);
            var address = new Address(command.AddressLine1, command.AddressLine2, command.City, command.State, command.Country, command.ZipCode);

            //Generate NaturalPerson entity
            var naturalPerson = new NaturalPerson(name, cpf, birthday, gender, address);

            //Validation
            AddNotifications(name, cpf, birthday, address, naturalPerson);

            if(Invalid)
            {
                return new CommandResult<CreateNaturalPersonContactResponse>(false, "Problem on contact shape.", null);
            }

            var newNaturalPerson = await _repository.Create(naturalPerson);

            var result = new CreateNaturalPersonContactResponse
            {
                Id = newNaturalPerson.Id,
                Name = newNaturalPerson.Name.FullName,
                Cpf = newNaturalPerson.Cpf.Number,
                Birthday = newNaturalPerson.Birthday.Date,
                Gender = newNaturalPerson.Gender,
                AddressLine1 = newNaturalPerson.Address.AddressLine1,
                AddressLine2 = newNaturalPerson.Address.AddressLine2,
                City = newNaturalPerson.Address.City,
                State = newNaturalPerson.Address.State,
                Country = newNaturalPerson.Address.Country,
                ZipCode = newNaturalPerson.Address.ZipCode,
            };

            return new CommandResult<CreateNaturalPersonContactResponse>(true, "Contact create successfully.", result);
        }
    }
}
