<?php

namespace App\Entity;

use App\Repository\AnnouncementAnimalFeatureRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: AnnouncementAnimalFeatureRepository::class)]
class AnnouncementAnimalFeature
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['announcement:read', 'announcement:write', 'admin:animal_feature:read'])]
    #[ORM\Column(nullable: true)]
    private ?bool $isPositive = null;

    #[Groups(['announcement:read', 'announcement:write'])]
    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?AnimalFeature $feature = null;

    #[ORM\ManyToOne(inversedBy: 'announcementAnimalFeatures')]
    #[ORM\JoinColumn(nullable: false)]
    private ?AnnouncementDetail $announcementDetail = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getIsPositive(): ?bool
    {
        return $this->isPositive;
    }

    public function setIsPositive(?bool $isPositive): static
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

    public function getAnnouncementDetail(): ?AnnouncementDetail
    {
        return $this->announcementDetail;
    }

    public function setAnnouncementDetail(?AnnouncementDetail $announcementDetail): static
    {
        $this->announcementDetail = $announcementDetail;

        return $this;
    }
}
