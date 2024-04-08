<?php

namespace App\Entity;

use App\Repository\AnnouncementAnimalFeatureRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: AnnouncementAnimalFeatureRepository::class)]
class AnnouncementAnimalFeature
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(nullable: true)]
    private ?bool $isPositive = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?AnimalFeature $feature = null;

    #[ORM\ManyToOne(inversedBy: 'announcementAnimalFeatures')]
    #[ORM\JoinColumn(nullable: false)]
    private ?AnnouncementDetail $announcement = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function isPositive(): ?bool
    {
        return $this->isPositive;
    }

    public function setPositive(?bool $isPositive): static
    {
        $this->isPositive = $isPositive;

        return $this;
    }

    public function getFeature(): ?AnimalFeature
    {
        return $this->feature;
    }

    public function setFeature(?AnimalFeature $feature): static
    {
        $this->feature = $feature;

        return $this;
    }

    public function getAnnouncement(): ?AnnouncementDetail
    {
        return $this->announcement;
    }

    public function setAnnouncement(?AnnouncementDetail $announcement): static
    {
        $this->announcement = $announcement;

        return $this;
    }
}
