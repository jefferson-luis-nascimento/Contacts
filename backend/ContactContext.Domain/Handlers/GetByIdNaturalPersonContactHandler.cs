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
    public class GetByIdNaturalPersonContactHandler : Notifiable, IGetByIdNaturalPersonContactHandler
    {
        private INaturalPersonRepository _repository;

        public GetByIdNaturalPersonContactHandler(INaturalPersonRepository repository)
        {
            _repository = repository;
        }

        public async Task<ICommandResult> Handle(GetByIdNaturalPersonContactRequest command)
        {
            var naturalPerson = await _repository.GetById(command.Id);

            if(naturalPerson == null)
            {
                return new CommandResult<GetByIdNaturalPersonContactResponse>(false, "Contact not found", null);
            }

            var result = new GetByIdNaturalPersonContactResponse
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
            };

            return new CommandResult<GetByIdNaturalPersonContactResponse>(true, "", result);
        }
    }
}
