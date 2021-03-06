using ContactContext.Domain.Commands.Requests;
using ContactContext.Shared.Handlers;

namespace ContactContext.Domain.Handlers.Interfaces
{
    public interface IGetByIdLegalPersonContactHandler : IHandler<GetByIdLegalPersonContactRequest>
    {

    }
}
