using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VerisqAI.API.Migrations
{
    /// <inheritdoc />
    public partial class ExtendQuestionnaireResponsesForDynamicEngine : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AssessmentQuestionId",
                table: "QuestionnaireResponses",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Category",
                table: "QuestionnaireResponses",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "QuestionKey",
                table: "QuestionnaireResponses",
                type: "nvarchar(150)",
                maxLength: 150,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "QuestionType",
                table: "QuestionnaireResponses",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Severity",
                table: "QuestionnaireResponses",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AssessmentQuestionId",
                table: "QuestionnaireResponses");

            migrationBuilder.DropColumn(
                name: "Category",
                table: "QuestionnaireResponses");

            migrationBuilder.DropColumn(
                name: "QuestionKey",
                table: "QuestionnaireResponses");

            migrationBuilder.DropColumn(
                name: "QuestionType",
                table: "QuestionnaireResponses");

            migrationBuilder.DropColumn(
                name: "Severity",
                table: "QuestionnaireResponses");
        }
    }
}
