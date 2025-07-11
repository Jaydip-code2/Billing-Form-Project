using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BillingForm_API.Migrations
{
    /// <inheritdoc />
    public partial class AddPrimaryKeyToBillingRequest : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_BillingRequests",
                table: "BillingRequests");

            migrationBuilder.AlterColumn<string>(
                name: "FullName",
                table: "BillingRequests",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "BillingRequests",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddPrimaryKey(
                name: "PK_BillingRequests",
                table: "BillingRequests",
                column: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_BillingRequests",
                table: "BillingRequests");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "BillingRequests");

            migrationBuilder.AlterColumn<string>(
                name: "FullName",
                table: "BillingRequests",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddPrimaryKey(
                name: "PK_BillingRequests",
                table: "BillingRequests",
                column: "FullName");
        }
    }
}
