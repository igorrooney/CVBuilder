using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CVBuilder.Migrations
{
    /// <inheritdoc />
    public partial class Updating : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Education_CVs_CVId",
                table: "Education");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Education",
                table: "Education");

            migrationBuilder.DropColumn(
                name: "Company",
                table: "Education");

            migrationBuilder.RenameTable(
                name: "Education",
                newName: "Educations");

            migrationBuilder.RenameColumn(
                name: "Position",
                table: "Educations",
                newName: "Institution");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "Educations",
                newName: "Degree");

            migrationBuilder.RenameIndex(
                name: "IX_Education_CVId",
                table: "Educations",
                newName: "IX_Educations_CVId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Educations",
                table: "Educations",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Educations_CVs_CVId",
                table: "Educations",
                column: "CVId",
                principalTable: "CVs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Educations_CVs_CVId",
                table: "Educations");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Educations",
                table: "Educations");

            migrationBuilder.RenameTable(
                name: "Educations",
                newName: "Education");

            migrationBuilder.RenameColumn(
                name: "Institution",
                table: "Education",
                newName: "Position");

            migrationBuilder.RenameColumn(
                name: "Degree",
                table: "Education",
                newName: "Description");

            migrationBuilder.RenameIndex(
                name: "IX_Educations_CVId",
                table: "Education",
                newName: "IX_Education_CVId");

            migrationBuilder.AddColumn<string>(
                name: "Company",
                table: "Education",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Education",
                table: "Education",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Education_CVs_CVId",
                table: "Education",
                column: "CVId",
                principalTable: "CVs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
