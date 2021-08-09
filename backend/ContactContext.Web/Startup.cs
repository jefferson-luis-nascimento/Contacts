using ContactContext.Domain.Handlers;
using ContactContext.Domain.Handlers.Interfaces;
using ContactContext.Domain.Repositories;
using ContactContext.Domain.Repositories.Interfaces;
using ContactContext.Shared.Handlers;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace ContactContext.Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();

            services.AddScoped(typeof(IContactRepository<>), typeof(ContactRepository<>));
            services.AddScoped<ILegalPersonRepository, LegalPersonRepository>();
            services.AddScoped<INaturalPersonRepository, NaturalPersonRepository>();

            services.AddScoped<IGetAllContactHandler, GetAllContactHandler>();
            services.AddScoped<IGetByIdContactHandler, GetByIdContactHandler>();
            services.AddScoped<ICreateLegalPersonContactHandler, CreateLegalPersonContactHandler>();
            services.AddScoped<ICreateNaturalPersonContactHandler, CreateNaturalPersonContactHandler>();
            services.AddScoped<IUpdateLegalPersonContactHandler, UpdateLegalPersonContactHandler>();
            services.AddScoped<IUpdateNaturalPersonContactHandler, UpdateNaturalPersonContactHandler>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
