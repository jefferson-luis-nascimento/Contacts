using ContactContext.Domain.Commands.Requests;
using ContactContext.Domain.Handlers.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace ContactContext.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ContactController : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> Get([FromServices] IGetAllContactHandler handler)
        {
            return Ok(await handler.Handle(new GetAllContactRequest()));
        }


        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> Get([FromServices] IGetByIdContactHandler handler, Guid id)
        {
            var command = new GetByIdContactRequest { Id = id };
            return Ok(await handler.Handle(command));
        }
    }
}
