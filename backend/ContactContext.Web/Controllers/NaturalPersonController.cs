using ContactContext.Domain.Commands;
using ContactContext.Domain.Commands.Requests;
using ContactContext.Domain.Entities;
using ContactContext.Domain.Handlers.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace ContactContext.Web.Controllers
{
    [ApiController]
    [Route("contact")]
    public class NaturalPersonController : ControllerBase
    {
        [HttpGet]
        [Route("/natural-person/{id}")]
        public async Task<IActionResult> Get([FromServices] IGetByIdNaturalPersonContactHandler handler, Guid id)
        {
            var command = new GetByIdNaturalPersonContactRequest { Id = id };
            return Ok(await handler.Handle(command));
        }

        [HttpPost]
        [Route("/natural-person")]
        public async Task<IActionResult> CreateNaturalPerson([FromServices] ICreateNaturalPersonContactHandler handler,
            [FromBody] CreateNaturalPersonContactRequest command)
        {
            var handleResult = (await handler.Handle(command)) as CommandResult<NaturalPerson>;

            return handleResult.Success ? Ok(handleResult) : BadRequest(handleResult);
        }

        [HttpPut]
        [Route("/natural-person")]
        public async Task<IActionResult> UpdateNaturalPerson([FromServices] IUpdateNaturalPersonContactHandler handler,
            [FromBody] UpdateNaturalPersonContactRequest command)
        {
            var handleResult = (await handler.Handle(command)) as CommandResult<NaturalPerson>;

            return handleResult.Success ? Ok(handleResult) : BadRequest(handleResult);
        }
    }
}
