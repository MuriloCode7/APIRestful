import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

/*
Essa migracao e feita de modo diferente das demais pois esta e uma tabela
de relacionamento entre outras duas tabelas
 */
export class AddCustomerIdToOrders1695315148558 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'orders',
      new TableColumn({
        name: 'customer_id',
        type: 'uuid',
        /*
          A coluna customer_id pode receber valor null, para caso o cliente
          seja removido o registro do pedido não ser perdido
           */
        isNullable: true,
      }),
    );

    // Essa funcao cria a chave estrangeira na orders que referencia ao customer
    await queryRunner.createForeignKey(
      'orders',
      new TableForeignKey({
        name: 'OrdersCustomer',
        columnNames: ['customer_id'],
        referencedTableName: 'customers',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('orders', 'OrdersCustomer');
    await queryRunner.dropColumn('orders', 'customer_id');
  }
}
