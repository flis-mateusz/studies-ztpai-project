<?php

namespace App\Entity;

use App\Repository\AnnouncementReportRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: AnnouncementReportRepository::class)]
class AnnouncementReport
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $givenAt = null;

    #[ORM\Column(nullable: true)]
    private ?bool $isAccepted = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $details = null;

    #[ORM\ManyToOne(inversedBy: 'announcementReports')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user = null;

    #[ORM\ManyToOne(inversedBy: 'announcementReports')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Announcement $announcement = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getGivenAt(): ?\DateTimeImmutable
    {
        return $this->givenAt;
    }

    public function setGivenAt(\DateTimeImmutable $givenAt): static
    {
        $this->givenAt = $givenAt;

        return $this;
    }

    public function isAccepted(): ?bool
    {
        return $this->isAccepted;
    }

    public function setAccepted(?bool $isAccepted): static
    {
        $this->isAccepted = $isAccepted;

        return $this;
    }

    public function getDetails(): ?string
    {
        return $this->details;
    }

    public function setDetails(?string $details): static
    {
        $this->details = $details;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

        return $this;
    }

    public function getAnnouncement(): ?Announcement
    {
        return $this->announcement;
    }

    public function setAnnouncement(?Announcement $announcement): static
    {
        $this->announcement = $announcement;

        return $this;
    }
}
