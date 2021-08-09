using ContactContext.Shared.Commands;

namespace ContactContext.Domain.Commands
{
    public class CommandResult<T> : ICommandResult
    {
        public CommandResult()
        {

        }

        public CommandResult(bool success, string message, T payload)
        {
            Success = success;
            Message = message;
            Payload = payload;
        }

        public bool Success { get; set; }
        public string Message { get; set; }

        public T Payload { get; set; }
    }
}
