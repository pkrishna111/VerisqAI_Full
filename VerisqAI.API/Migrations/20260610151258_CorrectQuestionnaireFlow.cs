using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VerisqAI.API.Migrations
{
    /// <inheritdoc />
    public partial class CorrectQuestionnaireFlow : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "CancelledAt",
                table: "Questionnaires",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeclineReason",
                table: "Questionnaires",
                type: "nvarchar(1000)",
                maxLength: 1000,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeclinedAt",
                table: "Questionnaires",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ExpiresAt",
                table: "Questionnaires",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "StartedAt",
                table: "Questionnaires",
                type: "datetime2",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CancelledAt",
                table: "Questionnaires");

            migrationBuilder.DropColumn(
                name: "DeclineReason",
                table: "Questionnaires");

            migrationBuilder.DropColumn(
                name: "DeclinedAt",
                table: "Questionnaires");

            migrationBuilder.DropColumn(
                name: "ExpiresAt",
                table: "Questionnaires");

            migrationBuilder.DropColumn(
                name: "StartedAt",
                table: "Questionnaires");
        }
    }
}
