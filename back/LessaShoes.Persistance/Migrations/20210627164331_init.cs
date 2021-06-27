using Microsoft.EntityFrameworkCore.Migrations;

namespace LessaShoes.Persistance.Migrations
{
    public partial class init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Tenis",
                columns: table => new
                {
                    tenisID = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    imagemURL = table.Column<string>(type: "TEXT", nullable: true),
                    nomeTenis = table.Column<string>(type: "TEXT", nullable: true),
                    tamanho = table.Column<int>(type: "INTEGER", nullable: false),
                    qtdTenis = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tenis", x => x.tenisID);
                });

            migrationBuilder.CreateTable(
                name: "usuarios",
                columns: table => new
                {
                    usuarioID = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    imagemURL = table.Column<string>(type: "TEXT", nullable: true),
                    nomeUsuario = table.Column<string>(type: "TEXT", nullable: true),
                    idade = table.Column<int>(type: "INTEGER", nullable: false),
                    cargo = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_usuarios", x => x.usuarioID);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Tenis");

            migrationBuilder.DropTable(
                name: "usuarios");
        }
    }
}
