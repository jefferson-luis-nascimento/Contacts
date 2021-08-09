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
    public class LegalPersonController : ControllerBase
    {
        [HttpPost]
        [Route("/legal-person")]
        public async Task<IActionResult> CreateNaturalPerson([FromServices] ICreateLegalPersonContactHandler handler,
            [FromBody] CreateLegalPersonContactRequest command)
        {
            var handleResult = (await handler.Handle(command)) as CommandResult<LegalPerson>;

            return handleResult.Success ? Ok(handleResult) : BadRequest(handleResult);
        }

        [HttpPut]
        [Route("/legal-person")]
        public async Task<IActionResult> UpdateNaturalPerson([FromServices] IUpdateLegalPersonContactHandler handler,
            [FromBody] UpdateLegalPersonContactRequest command)
        {
            var handleResult = (await handler.Handle(command)) as CommandResult<LegalPerson>;

            return handleResult.Success ? Ok(handleResult) : BadRequest(handleResult);
        }
    }
}
