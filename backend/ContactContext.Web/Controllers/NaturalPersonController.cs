using ContactContext.Domain.Commands;
using ContactContext.Domain.Commands.Requests;
using ContactContext.Domain.Entities;
using ContactContext.Domain.Handlers.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace ContactContext.Web.Controllers
{
    [ApiController]
    [Route("contact")]
    public class NaturalPersonController : ControllerBase
    {
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
