using ContactContext.Domain.Commands;
using ContactContext.Domain.Commands.Requests;
using ContactContext.Domain.Commands.Response;
using ContactContext.Domain.Entities;
using ContactContext.Domain.Handlers.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace ContactContext.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LegalPersonController : ControllerBase
    {
        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> Get([FromServices] IGetByIdLegalPersonContactHandler handler, Guid id)
        {
            var command = new GetByIdLegalPersonContactRequest { Id = id };
            return Ok(await handler.Handle(command));
        }

        [HttpPost]
        public async Task<IActionResult> CreateNaturalPerson([FromServices] ICreateLegalPersonContactHandler handler,
            [FromBody] CreateLegalPersonContactRequest command)
        {
            var handleResult = await handler.Handle(command);

            return Ok(handleResult);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateNaturalPerson([FromServices] IUpdateLegalPersonContactHandler handler,
            [FromBody] UpdateLegalPersonContactRequest command)
        {
            var handleResult = (await handler.Handle(command)) as CommandResult<UpdateLegalPersonContactResponse>;

            return Ok(handleResult);
        }
    }
}
