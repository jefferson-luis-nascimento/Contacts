using ContactContext.Domain.Commands;
using ContactContext.Domain.Commands.Requests;
using ContactContext.Domain.Entities;
using ContactContext.Domain.Handlers.Interfaces;
using ContactContext.Domain.Repositories.Interfaces;
using ContactContext.Shared.Commands;
using Flunt.Notifications;
using System.Threading.Tasks;

namespace ContactContext.Domain.Handlers
{
    public class GetByIdContactHandler : Notifiable, IGetByIdContactHandler
    {
        private IContactRepository<Contact> _repository;

        public GetByIdContactHandler(IContactRepository<Contact> repository)
        {
            _repository = repository;
        }

        public async Task<ICommandResult> Handle(GetByIdContactRequest command)
        {
            var legalPerson = (await _repository.GetById(command.Id)) as LegalPerson;

            if(legalPerson == null)
            {
                return new CommandResult<LegalPerson>(false, "Contact not found", null);
            }

            return new CommandResult<LegalPerson>(true, "", legalPerson);
        }
    }
}
