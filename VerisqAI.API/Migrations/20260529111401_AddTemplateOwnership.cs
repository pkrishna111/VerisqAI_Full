using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VerisqAI.API.Migrations
{
    /// <inheritdoc />
    public partial class AddTemplateOwnership : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "AssessmentTemplates",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_AssessmentTemplates_UserId",
                table: "AssessmentTemplates",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_AssessmentTemplates_AspNetUsers_UserId",
                table: "AssessmentTemplates",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AssessmentTemplates_AspNetUsers_UserId",
                table: "AssessmentTemplates");

            migrationBuilder.DropIndex(
                name: "IX_AssessmentTemplates_UserId",
                table: "AssessmentTemplates");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "AssessmentTemplates");
        }
    }
}
