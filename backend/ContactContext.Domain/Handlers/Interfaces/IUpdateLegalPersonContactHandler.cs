﻿using ContactContext.Domain.Commands.Requests;
using ContactContext.Shared.Handlers;

namespace ContactContext.Domain.Handlers.Interfaces
{
    public interface IUpdateLegalPersonContactHandler : IHandler<UpdateLegalPersonContactRequest>
    {

    }
}
