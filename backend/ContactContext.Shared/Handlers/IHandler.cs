using ContactContext.Shared.Commands;
using System.Threading.Tasks;

namespace ContactContext.Shared.Handlers
{
    public interface IHandler<T> where T : ICommand
    {
        Task<ICommandResult> Handle(T command);
    }
}
