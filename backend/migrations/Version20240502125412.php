<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240502125412 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE UNIQUE INDEX UNIQ_90081A5C5E237E06 ON animal_feature (name)');
        $this->addSql('ALTER TABLE announcement CHANGE is_accepted is_accepted TINYINT(1) NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP INDEX UNIQ_90081A5C5E237E06 ON animal_feature');
        $this->addSql('ALTER TABLE announcement CHANGE is_accepted is_accepted TINYINT(1) DEFAULT 0 NOT NULL');
    }
}
