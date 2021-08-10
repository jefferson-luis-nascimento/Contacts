using ContactContext.Domain.Handlers;
using ContactContext.Domain.Handlers.Interfaces;
using ContactContext.Domain.Repositories;
using ContactContext.Domain.Repositories.Interfaces;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Rewrite;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using System;

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

            services.AddSwaggerGen(c => {
                c.SwaggerDoc("v1",
                    new OpenApiInfo
                    {
                        Title = "MyContacts API v1",
                        Version = "v1",
                        Description = "API to manager Contacts",
                        Contact = new OpenApiContact
                        {
                            Name = "Jefferson Luís Nascimento",
                            Url = new Uri("https://github.com/jefferson-luis-nascimento"),
                        }
                    }); ;
            });

            services.AddScoped(typeof(IContactRepository<>), typeof(ContactRepository<>));
            services.AddScoped<ILegalPersonRepository, LegalPersonRepository>();
            services.AddScoped<INaturalPersonRepository, NaturalPersonRepository>();

            services.AddScoped<IGetAllContactHandler, GetAllContactHandler>();
            services.AddScoped<IGetByIdContactHandler, GetByIdContactHandler>();
            services.AddScoped<IGetByIdLegalPersonContactHandler, GetByIdLegalPersonContactHandler>();
            services.AddScoped<IGetByIdNaturalPersonContactHandler, GetByIdNaturalPersonContactHandler>();
            services.AddScoped<ICreateLegalPersonContactHandler, CreateLegalPersonContactHandler>();
            services.AddScoped<ICreateNaturalPersonContactHandler, CreateNaturalPersonContactHandler>();
            services.AddScoped<IUpdateLegalPersonContactHandler, UpdateLegalPersonContactHandler>();
            services.AddScoped<IUpdateNaturalPersonContactHandler, UpdateNaturalPersonContactHandler>();

            services.AddCors();
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

            app.UseSwagger();

            app.UseSwaggerUI(c => {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "MyContacts API v1");
            });

            var option = new RewriteOptions();
            option.AddRedirect("^$", "swagger");

            app.UseRewriter(option);

            app.UseCors(builder =>
            {
                builder.WithOrigins("http://localhost:3000");
                builder.AllowAnyHeader();
                builder.WithExposedHeaders("Token-Expired");
                builder.AllowAnyMethod();
                builder.AllowCredentials();
                builder.Build();
            });

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
