import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUserTokens1693491782276 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'users_tokens',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()',
            },
            {
              name: 'token',
              type: 'uuid',
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()',
            },
            {
              name: 'user_id',
              type: 'uuid',
            },
            {
              name: 'created_at',
              type: 'timestamp with time zone',
              default: 'now()',
            },
            {
              name: 'updated_at',
              type: 'timestamp with time zone',
              default: 'now()',
            },
          ],

          /*
          Como a tabela UserTokens possui uma chave estrangeira 'user_id',
          precisamos criar o atributo 'foreignsKeys' para o objeto Table
          e especificar:
          - o nome da chave estrangeira
          - a tabela de onde ela vem
          - a coluna da tabela de onde ela vem
          - a coluna que ela representa na tabela que busca ela
          - o que acontecera quando o objeto dono da chave estrangeira for deletado
            'CASCADE' significa que o que acontecer com o cadastro do usuário acontecera
            com o token, efeito cascata
          - o que acontecera quando o objeto dono da chave estrangeira for alterado
          */
          foreignKeys: [
            {
              name: 'TokenUser',
              referencedTableName: 'users',
              referencedColumnNames: ['id'],
              columnNames: ['user_id'],
              onDelete: 'CASCADE',
              onUpdate: 'CASCADE',
            }
          ]
        })
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('users_tokens');
    }

}
