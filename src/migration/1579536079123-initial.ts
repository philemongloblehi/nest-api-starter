import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1579536079123 implements MigrationInterface {
    name = 'initial1579536079123'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `users` (`user_id` int NOT NULL AUTO_INCREMENT, `user_name` varchar(191) NULL, `password` varchar(191) NULL, `salt` varchar(191) NULL, `first_name` varchar(191) NULL, `last_name` varchar(191) NULL, `email` varchar(191) NULL, `raison_sociale` varchar(191) NULL, `role` enum ('UTILISATEUR', 'ADMIN', 'SUPER_ADMIN') NULL DEFAULT 'UTILISATEUR', `statut` varchar(191) NULL DEFAULT 1, `contact` varchar(191) NULL DEFAULT 1, `created_at` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_45738931eb582493de87aaec85` (`user_name`, `email`), PRIMARY KEY (`user_id`)) ENGINE=InnoDB", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP INDEX `IDX_45738931eb582493de87aaec85` ON `users`", undefined);
        await queryRunner.query("DROP TABLE `users`", undefined);
    }

}
