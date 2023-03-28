import {
    MigrationInterface,
    QueryRunner,
    TableColumn,
    TableForeignKey,
} from "typeorm";

export class AlterBarbershopAddForeign1680038208100
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "barbershops",
            new TableColumn({
                name: "user_id",
                type: "uuid",
            })
        );

        await queryRunner.createForeignKey(
            "barbershops",
            new TableForeignKey({
                name: "FKUserBarbershop",
                referencedTableName: "users",
                referencedColumnNames: ["id"],
                columnNames: ["user_id"],
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("barbershops", "FkUserBarbershop");
        await queryRunner.dropColumn("barbershops", "user_id");
    }
}
