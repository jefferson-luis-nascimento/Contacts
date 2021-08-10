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
    public class NaturalPersonController : ControllerBase
    {
        [HttpGet]
        public  IActionResult Get()
        {
            return Ok(new { message = "rota natural-person"});
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> Get([FromServices] IGetByIdNaturalPersonContactHandler handler, Guid id)
        {
            var command = new GetByIdNaturalPersonContactRequest { Id = id };
            return Ok(await handler.Handle(command));
        }

        [HttpPost]
        public async Task<IActionResult> CreateNaturalPerson([FromServices] ICreateNaturalPersonContactHandler handler,
            [FromBody] CreateNaturalPersonContactRequest command)
        {
            var handleResult = (await handler.Handle(command)) as CommandResult<CreateNaturalPersonContactResponse>;

            return Ok(handleResult);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateNaturalPerson([FromServices] IUpdateNaturalPersonContactHandler handler,
            [FromBody] UpdateNaturalPersonContactRequest command)
        {
            var handleResult = (await handler.Handle(command)) as CommandResult<UpdateNaturalPersonContactResponse>;

            return Ok(handleResult);
        }
    }
}
