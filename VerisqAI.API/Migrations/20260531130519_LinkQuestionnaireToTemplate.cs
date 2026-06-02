using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VerisqAI.API.Migrations
{
    /// <inheritdoc />
    public partial class LinkQuestionnaireToTemplate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AssessmentTemplateId",
                table: "Questionnaires",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Questionnaires_AssessmentTemplateId",
                table: "Questionnaires",
                column: "AssessmentTemplateId");

            migrationBuilder.AddForeignKey(
                name: "FK_Questionnaires_AssessmentTemplates_AssessmentTemplateId",
                table: "Questionnaires",
                column: "AssessmentTemplateId",
                principalTable: "AssessmentTemplates",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Questionnaires_AssessmentTemplates_AssessmentTemplateId",
                table: "Questionnaires");

            migrationBuilder.DropIndex(
                name: "IX_Questionnaires_AssessmentTemplateId",
                table: "Questionnaires");

            migrationBuilder.DropColumn(
                name: "AssessmentTemplateId",
                table: "Questionnaires");
        }
    }
}
