<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240526214143 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE announcement DROP FOREIGN KEY FK_4DB9D91C4A93E3A9');
        $this->addSql('ALTER TABLE announcement ADD CONSTRAINT FK_4DB9D91C4A93E3A9 FOREIGN KEY (animal_type_id) REFERENCES animal_type (id) ON DELETE SET NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE announcement DROP FOREIGN KEY FK_4DB9D91C4A93E3A9');
        $this->addSql('ALTER TABLE announcement ADD CONSTRAINT FK_4DB9D91C4A93E3A9 FOREIGN KEY (animal_type_id) REFERENCES animal_type (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
    }
}
