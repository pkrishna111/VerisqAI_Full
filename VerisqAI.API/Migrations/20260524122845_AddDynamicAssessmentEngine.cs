using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VerisqAI.API.Migrations
{
    /// <inheritdoc />
    public partial class AddDynamicAssessmentEngine : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AssessmentTemplates",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    Version = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AssessmentTemplates", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AssessmentSections",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AssessmentTemplateId = table.Column<int>(type: "int", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    DisplayOrder = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AssessmentSections", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AssessmentSections_AssessmentTemplates_AssessmentTemplateId",
                        column: x => x.AssessmentTemplateId,
                        principalTable: "AssessmentTemplates",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AssessmentQuestions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AssessmentSectionId = table.Column<int>(type: "int", nullable: false),
                    QuestionKey = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    QuestionText = table.Column<string>(type: "nvarchar(2000)", maxLength: 2000, nullable: false),
                    QuestionType = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Category = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Weight = table.Column<int>(type: "int", nullable: false),
                    Severity = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    IsRequired = table.Column<bool>(type: "bit", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    DisplayOrder = table.Column<int>(type: "int", nullable: false),
                    DependsOnQuestionKey = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DependsOnValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AssessmentQuestions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AssessmentQuestions_AssessmentSections_AssessmentSectionId",
                        column: x => x.AssessmentSectionId,
                        principalTable: "AssessmentSections",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AssessmentQuestions_AssessmentSectionId",
                table: "AssessmentQuestions",
                column: "AssessmentSectionId");

            migrationBuilder.CreateIndex(
                name: "IX_AssessmentQuestions_QuestionKey",
                table: "AssessmentQuestions",
                column: "QuestionKey");

            migrationBuilder.CreateIndex(
                name: "IX_AssessmentSections_AssessmentTemplateId",
                table: "AssessmentSections",
                column: "AssessmentTemplateId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AssessmentQuestions");

            migrationBuilder.DropTable(
                name: "AssessmentSections");

            migrationBuilder.DropTable(
                name: "AssessmentTemplates");
        }
    }
}
