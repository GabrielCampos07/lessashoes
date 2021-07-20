using System.IO;
using LessaShoes.Application;
using LessaShoes.Application.Contratos;
using LessaShoes.Domain.Identity;
using LessaShoes.Persistance;
using LessaShoes.Persistance.Contratados;
using LessaShoes.Persistance.Contratos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;

namespace LessaShoes.API
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
            services.AddDbContext<LessaShoesContext>(
                x => x.UseSqlite(Configuration.GetConnectionString("DefaultConnection"))
            );

            services.AddControllers();

            IdentityBuilder builder = services.AddIdentityCore<Usuario>(options =>
            {
                options.Password.RequireDigit = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireLowercase = false;
                options.Password.RequireUppercase = false;
                options.Password.RequiredLength = 6;
            });

            builder = new IdentityBuilder(builder.UserType, typeof(Cargo), builder.Services);
            builder.AddEntityFrameworkStores<LessaShoesContext>();
            builder.AddRoleValidator<RoleValidator<Cargo>>();
            builder.AddRoleManager<RoleManager<Cargo>>();
            builder.AddSignInManager<SignInManager<Usuario>>();

            services.AddMvc(opcoes =>
            {
                var politica = new AuthorizationPolicyBuilder()
                    .RequireAuthenticatedUser()
                    .Build();
                opcoes.Filters.Add(new AuthorizeFilter(politica));
            });

            services.AddScoped<IGeralPersist, GeralPersist>();
            services.AddScoped<ITenisPersist, TenisPersist>();
            services.AddScoped<ITenisService, TenisService>();


            services.AddCors();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "LessaShoes.API", Version = "v1" });
            });
        }
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "LessaShoes.API v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseCors(x => x
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowAnyOrigin());

            app.UseStaticFiles(new StaticFileOptions()
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "Recursos")),
                RequestPath = new PathString("/Recursos")
            });

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
