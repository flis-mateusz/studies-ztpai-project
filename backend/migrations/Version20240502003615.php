<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240502003615 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE UNIQUE INDEX UNIQ_CBF3161D5E237E06 ON animal_type (name)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_805248EFA76ED395913AEA17 ON announcement_like (user_id, announcement_id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_DCFAC1DFA76ED395913AEA17 ON announcement_report (user_id, announcement_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP INDEX UNIQ_CBF3161D5E237E06 ON animal_type');
        $this->addSql('DROP INDEX UNIQ_805248EFA76ED395913AEA17 ON announcement_like');
        $this->addSql('DROP INDEX UNIQ_DCFAC1DFA76ED395913AEA17 ON announcement_report');
    }
}
