<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240506224711 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE announcement_upload (id INT AUTO_INCREMENT NOT NULL, media_object_id INT NOT NULL, announcement_id INT NOT NULL, UNIQUE INDEX UNIQ_F68504464DE5A5 (media_object_id), INDEX IDX_F685044913AEA17 (announcement_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('ALTER TABLE announcement_upload ADD CONSTRAINT FK_F68504464DE5A5 FOREIGN KEY (media_object_id) REFERENCES media_object (id)');
        $this->addSql('ALTER TABLE announcement_upload ADD CONSTRAINT FK_F685044913AEA17 FOREIGN KEY (announcement_id) REFERENCES announcement (id)');
        $this->addSql('ALTER TABLE announcement_media_object DROP FOREIGN KEY FK_EEA58FD164DE5A5');
        $this->addSql('ALTER TABLE announcement_media_object DROP FOREIGN KEY FK_EEA58FD1913AEA17');
        $this->addSql('DROP TABLE announcement_media_object');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE announcement_media_object (announcement_id INT NOT NULL, media_object_id INT NOT NULL, INDEX IDX_EEA58FD1913AEA17 (announcement_id), INDEX IDX_EEA58FD164DE5A5 (media_object_id), PRIMARY KEY(announcement_id, media_object_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_0900_ai_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE announcement_media_object ADD CONSTRAINT FK_EEA58FD164DE5A5 FOREIGN KEY (media_object_id) REFERENCES media_object (id) ON UPDATE NO ACTION ON DELETE CASCADE');
        $this->addSql('ALTER TABLE announcement_media_object ADD CONSTRAINT FK_EEA58FD1913AEA17 FOREIGN KEY (announcement_id) REFERENCES announcement (id) ON UPDATE NO ACTION ON DELETE CASCADE');
        $this->addSql('ALTER TABLE announcement_upload DROP FOREIGN KEY FK_F68504464DE5A5');
        $this->addSql('ALTER TABLE announcement_upload DROP FOREIGN KEY FK_F685044913AEA17');
        $this->addSql('DROP TABLE announcement_upload');
    }
}
