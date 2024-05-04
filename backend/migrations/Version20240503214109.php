<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240503214109 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE announcement_media_object DROP FOREIGN KEY FK_EEA58FD164DE5A5');
        $this->addSql('ALTER TABLE announcement_media_object DROP FOREIGN KEY FK_EEA58FD1913AEA17');
        $this->addSql('DROP TABLE announcement_media_object');
        $this->addSql('ALTER TABLE announcement ADD file_path VARCHAR(255) DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE announcement_media_object (announcement_id INT NOT NULL, media_object_id INT NOT NULL, INDEX IDX_EEA58FD1913AEA17 (announcement_id), INDEX IDX_EEA58FD164DE5A5 (media_object_id), PRIMARY KEY(announcement_id, media_object_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE announcement_media_object ADD CONSTRAINT FK_EEA58FD164DE5A5 FOREIGN KEY (media_object_id) REFERENCES media_object (id) ON UPDATE NO ACTION ON DELETE CASCADE');
        $this->addSql('ALTER TABLE announcement_media_object ADD CONSTRAINT FK_EEA58FD1913AEA17 FOREIGN KEY (announcement_id) REFERENCES announcement (id) ON UPDATE NO ACTION ON DELETE CASCADE');
        $this->addSql('ALTER TABLE announcement DROP file_path');
    }
}
