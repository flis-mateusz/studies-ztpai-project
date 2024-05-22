<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240522224212 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE animal_feature (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_90081A5C5E237E06 (name), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE animal_type (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_CBF3161D5E237E06 (name), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE announcement (id INT AUTO_INCREMENT NOT NULL, is_accepted TINYINT(1) NOT NULL, created_at DATETIME NOT NULL, animal_type_id INT NOT NULL, user_id INT NOT NULL, announcement_detail_id INT NOT NULL, deletion_detail_id INT DEFAULT NULL, INDEX IDX_4DB9D91C4A93E3A9 (animal_type_id), INDEX IDX_4DB9D91CA76ED395 (user_id), UNIQUE INDEX UNIQ_4DB9D91CFC1FED97 (announcement_detail_id), UNIQUE INDEX UNIQ_4DB9D91CB7EEA6C1 (deletion_detail_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE announcement_animal_feature (id INT AUTO_INCREMENT NOT NULL, is_positive TINYINT(1) DEFAULT NULL, feature_id INT NOT NULL, announcement_detail_id INT NOT NULL, INDEX IDX_C982DE8960E4B879 (feature_id), INDEX IDX_C982DE89FC1FED97 (announcement_detail_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE announcement_deletion_detail (id INT AUTO_INCREMENT NOT NULL, reason VARCHAR(255) NOT NULL, deleted_at DATETIME NOT NULL, deleted_by_id INT NOT NULL, INDEX IDX_AA5CA358C76F1F52 (deleted_by_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE announcement_detail (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, locality VARCHAR(255) NOT NULL, price INT DEFAULT NULL, description LONGTEXT NOT NULL, age INT DEFAULT NULL, gender VARCHAR(255) NOT NULL, kind VARCHAR(255) DEFAULT NULL, age_type VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE announcement_like (id INT AUTO_INCREMENT NOT NULL, given_at DATETIME NOT NULL, user_id INT NOT NULL, announcement_id INT NOT NULL, INDEX IDX_805248EFA76ED395 (user_id), INDEX IDX_805248EF913AEA17 (announcement_id), UNIQUE INDEX UNIQ_805248EFA76ED395913AEA17 (user_id, announcement_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE announcement_report (id INT AUTO_INCREMENT NOT NULL, given_at DATETIME NOT NULL, is_accepted TINYINT(1) DEFAULT NULL, details LONGTEXT DEFAULT NULL, user_id INT NOT NULL, announcement_id INT NOT NULL, INDEX IDX_DCFAC1DFA76ED395 (user_id), INDEX IDX_DCFAC1DF913AEA17 (announcement_id), UNIQUE INDEX UNIQ_DCFAC1DFA76ED395913AEA17 (user_id, announcement_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE announcement_upload (id INT AUTO_INCREMENT NOT NULL, media_object_id INT NOT NULL, announcement_id INT NOT NULL, UNIQUE INDEX UNIQ_F68504464DE5A5 (media_object_id), INDEX IDX_F685044913AEA17 (announcement_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE media_object (id INT AUTO_INCREMENT NOT NULL, file_path VARCHAR(255) DEFAULT NULL, updated_at DATETIME NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, email VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, phone VARCHAR(15) NOT NULL, name VARCHAR(255) NOT NULL, surname VARCHAR(255) NOT NULL, avatar_id INT DEFAULT NULL, UNIQUE INDEX UNIQ_8D93D64986383B10 (avatar_id), UNIQUE INDEX UNIQ_IDENTIFIER_EMAIL (email), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('ALTER TABLE announcement ADD CONSTRAINT FK_4DB9D91C4A93E3A9 FOREIGN KEY (animal_type_id) REFERENCES animal_type (id)');
        $this->addSql('ALTER TABLE announcement ADD CONSTRAINT FK_4DB9D91CA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE announcement ADD CONSTRAINT FK_4DB9D91CFC1FED97 FOREIGN KEY (announcement_detail_id) REFERENCES announcement_detail (id)');
        $this->addSql('ALTER TABLE announcement ADD CONSTRAINT FK_4DB9D91CB7EEA6C1 FOREIGN KEY (deletion_detail_id) REFERENCES announcement_deletion_detail (id)');
        $this->addSql('ALTER TABLE announcement_animal_feature ADD CONSTRAINT FK_C982DE8960E4B879 FOREIGN KEY (feature_id) REFERENCES animal_feature (id)');
        $this->addSql('ALTER TABLE announcement_animal_feature ADD CONSTRAINT FK_C982DE89FC1FED97 FOREIGN KEY (announcement_detail_id) REFERENCES announcement_detail (id)');
        $this->addSql('ALTER TABLE announcement_deletion_detail ADD CONSTRAINT FK_AA5CA358C76F1F52 FOREIGN KEY (deleted_by_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE announcement_like ADD CONSTRAINT FK_805248EFA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE announcement_like ADD CONSTRAINT FK_805248EF913AEA17 FOREIGN KEY (announcement_id) REFERENCES announcement (id)');
        $this->addSql('ALTER TABLE announcement_report ADD CONSTRAINT FK_DCFAC1DFA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE announcement_report ADD CONSTRAINT FK_DCFAC1DF913AEA17 FOREIGN KEY (announcement_id) REFERENCES announcement (id)');
        $this->addSql('ALTER TABLE announcement_upload ADD CONSTRAINT FK_F68504464DE5A5 FOREIGN KEY (media_object_id) REFERENCES media_object (id)');
        $this->addSql('ALTER TABLE announcement_upload ADD CONSTRAINT FK_F685044913AEA17 FOREIGN KEY (announcement_id) REFERENCES announcement (id)');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D64986383B10 FOREIGN KEY (avatar_id) REFERENCES media_object (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE announcement DROP FOREIGN KEY FK_4DB9D91C4A93E3A9');
        $this->addSql('ALTER TABLE announcement DROP FOREIGN KEY FK_4DB9D91CA76ED395');
        $this->addSql('ALTER TABLE announcement DROP FOREIGN KEY FK_4DB9D91CFC1FED97');
        $this->addSql('ALTER TABLE announcement DROP FOREIGN KEY FK_4DB9D91CB7EEA6C1');
        $this->addSql('ALTER TABLE announcement_animal_feature DROP FOREIGN KEY FK_C982DE8960E4B879');
        $this->addSql('ALTER TABLE announcement_animal_feature DROP FOREIGN KEY FK_C982DE89FC1FED97');
        $this->addSql('ALTER TABLE announcement_deletion_detail DROP FOREIGN KEY FK_AA5CA358C76F1F52');
        $this->addSql('ALTER TABLE announcement_like DROP FOREIGN KEY FK_805248EFA76ED395');
        $this->addSql('ALTER TABLE announcement_like DROP FOREIGN KEY FK_805248EF913AEA17');
        $this->addSql('ALTER TABLE announcement_report DROP FOREIGN KEY FK_DCFAC1DFA76ED395');
        $this->addSql('ALTER TABLE announcement_report DROP FOREIGN KEY FK_DCFAC1DF913AEA17');
        $this->addSql('ALTER TABLE announcement_upload DROP FOREIGN KEY FK_F68504464DE5A5');
        $this->addSql('ALTER TABLE announcement_upload DROP FOREIGN KEY FK_F685044913AEA17');
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D64986383B10');
        $this->addSql('DROP TABLE animal_feature');
        $this->addSql('DROP TABLE animal_type');
        $this->addSql('DROP TABLE announcement');
        $this->addSql('DROP TABLE announcement_animal_feature');
        $this->addSql('DROP TABLE announcement_deletion_detail');
        $this->addSql('DROP TABLE announcement_detail');
        $this->addSql('DROP TABLE announcement_like');
        $this->addSql('DROP TABLE announcement_report');
        $this->addSql('DROP TABLE announcement_upload');
        $this->addSql('DROP TABLE media_object');
        $this->addSql('DROP TABLE user');
    }
}
