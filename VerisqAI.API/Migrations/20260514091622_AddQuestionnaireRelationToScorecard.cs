using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VerisqAI.API.Migrations
{
    /// <inheritdoc />
    public partial class AddQuestionnaireRelationToScorecard : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "QuestionnaireId",
                table: "Scorecards",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Scorecards_QuestionnaireId",
                table: "Scorecards",
                column: "QuestionnaireId");

            migrationBuilder.AddForeignKey(
                name: "FK_Scorecards_Questionnaires_QuestionnaireId",
                table: "Scorecards",
                column: "QuestionnaireId",
                principalTable: "Questionnaires",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Scorecards_Questionnaires_QuestionnaireId",
                table: "Scorecards");

            migrationBuilder.DropIndex(
                name: "IX_Scorecards_QuestionnaireId",
                table: "Scorecards");

            migrationBuilder.DropColumn(
                name: "QuestionnaireId",
                table: "Scorecards");
        }
    }
}
