<?php

namespace App\Entity;

use App\Repository\AnnouncementLikeRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: AnnouncementLikeRepository::class)]
class AnnouncementLike
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $givenAt = null;

    #[ORM\ManyToOne(inversedBy: 'announcementLikes')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user = null;

    #[ORM\ManyToOne(inversedBy: 'announcementLikes')]
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
