import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1579536126006 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner
            .manager
            .createQueryBuilder()
            .insert()
            .into("users")
            .values({user_id: 1, password: '$2b$10$1bkEIm21uN/Esdus4gEbfugtd3b3ommRkhSJedTMKduv8SwWBFW42', userName: 'globlehi', salt: '$2b$10$1bkEIm21uN/Esdus4gEbfu', firstName: 'GLOBLEHI', lastName: 'PHILEMON', email: 'philemongloblehi@gmail.com', raisonSociale: 'Globlehi-SARL', role: 'SUPER_ADMIN', statut: 1, contact: '+225 79-08-10-50', created_at: Date.now()})
            .execute()
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
