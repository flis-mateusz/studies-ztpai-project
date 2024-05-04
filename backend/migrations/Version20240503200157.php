<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240503200157 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE announcement DROP FOREIGN KEY FK_4DB9D91C3DA5256D');
        $this->addSql('DROP INDEX UNIQ_4DB9D91C3DA5256D ON announcement');
        $this->addSql('ALTER TABLE announcement DROP image_id');
        $this->addSql('ALTER TABLE announcement ADD CONSTRAINT FK_4DB9D91C4A93E3A9 FOREIGN KEY (animal_type_id) REFERENCES animal_type (id)');
        $this->addSql('ALTER TABLE announcement ADD CONSTRAINT FK_4DB9D91CA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE announcement ADD CONSTRAINT FK_4DB9D91CFC1FED97 FOREIGN KEY (announcement_detail_id) REFERENCES announcement_detail (id)');
        $this->addSql('ALTER TABLE announcement ADD CONSTRAINT FK_4DB9D91CB7EEA6C1 FOREIGN KEY (deletion_detail_id) REFERENCES announcement_deletion_detail (id)');
        $this->addSql('ALTER TABLE announcement_animal_feature ADD CONSTRAINT FK_C982DE8960E4B879 FOREIGN KEY (feature_id) REFERENCES animal_feature (id)');
        $this->addSql('ALTER TABLE announcement_animal_feature ADD CONSTRAINT FK_C982DE89913AEA17 FOREIGN KEY (announcement_id) REFERENCES announcement_detail (id)');
        $this->addSql('ALTER TABLE announcement_deletion_detail ADD CONSTRAINT FK_AA5CA358C76F1F52 FOREIGN KEY (deleted_by_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE announcement_like ADD CONSTRAINT FK_805248EFA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE announcement_like ADD CONSTRAINT FK_805248EF913AEA17 FOREIGN KEY (announcement_id) REFERENCES announcement (id)');
        $this->addSql('ALTER TABLE announcement_report ADD CONSTRAINT FK_DCFAC1DFA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE announcement_report ADD CONSTRAINT FK_DCFAC1DF913AEA17 FOREIGN KEY (announcement_id) REFERENCES announcement (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE announcement_like DROP FOREIGN KEY FK_805248EFA76ED395');
        $this->addSql('ALTER TABLE announcement_like DROP FOREIGN KEY FK_805248EF913AEA17');
        $this->addSql('ALTER TABLE announcement DROP FOREIGN KEY FK_4DB9D91C4A93E3A9');
        $this->addSql('ALTER TABLE announcement DROP FOREIGN KEY FK_4DB9D91CA76ED395');
        $this->addSql('ALTER TABLE announcement DROP FOREIGN KEY FK_4DB9D91CFC1FED97');
        $this->addSql('ALTER TABLE announcement DROP FOREIGN KEY FK_4DB9D91CB7EEA6C1');
        $this->addSql('ALTER TABLE announcement ADD image_id INT NOT NULL');
        $this->addSql('ALTER TABLE announcement ADD CONSTRAINT FK_4DB9D91C3DA5256D FOREIGN KEY (image_id) REFERENCES media_object (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_4DB9D91C3DA5256D ON announcement (image_id)');
        $this->addSql('ALTER TABLE announcement_report DROP FOREIGN KEY FK_DCFAC1DFA76ED395');
        $this->addSql('ALTER TABLE announcement_report DROP FOREIGN KEY FK_DCFAC1DF913AEA17');
        $this->addSql('ALTER TABLE announcement_deletion_detail DROP FOREIGN KEY FK_AA5CA358C76F1F52');
        $this->addSql('ALTER TABLE announcement_animal_feature DROP FOREIGN KEY FK_C982DE8960E4B879');
        $this->addSql('ALTER TABLE announcement_animal_feature DROP FOREIGN KEY FK_C982DE89913AEA17');
    }
}
