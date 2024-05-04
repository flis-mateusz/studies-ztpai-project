<?php

namespace App\Entity;

use App\Repository\AnnouncementDetailRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: AnnouncementDetailRepository::class)]
class AnnouncementDetail
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['announcement:read', 'announcement:write'])]
    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[Groups(['announcement:read', 'announcement:write'])]
    #[ORM\Column(length: 255)]
    private ?string $locality = null;

    #[Groups(['announcement:read', 'announcement:write'])]
    #[ORM\Column(nullable: true)]
    private ?int $price = null;

    #[Groups(['announcement:read', 'announcement:write'])]
    #[ORM\Column(type: Types::TEXT)]
    private ?string $description = null;

    #[Groups(['announcement:read', 'announcement:write'])]
    #[ORM\Column(nullable: true)]
    private ?int $age = null;

    #[Groups(['announcement:read', 'announcement:write'])]
    #[ORM\Column(length: 255)]
    private ?string $gender = null;

    #[Groups(['announcement:read', 'announcement:write'])]
    #[ORM\Column(length: 255)]
    private ?string $avatarUrl = null;

    #[Groups(['announcement:read', 'announcement:write'])]
    #[ORM\Column(length: 255, nullable: true, options: ['default' => null])]
    private ?string $kind = null;

    #[Groups(['announcement:read', 'announcement:write'])]
    #[ORM\Column(length: 255)]
    private ?string $ageType = null;

    /**
     * @var Collection<int, AnnouncementAnimalFeature>
     */
    #[Groups(['announcement:read', 'announcement:write'])]
    #[ORM\OneToMany(targetEntity: AnnouncementAnimalFeature::class, mappedBy: 'announcement', cascade: ['persist', 'remove'], orphanRemoval: true)]
    private Collection $announcementAnimalFeatures;

    public function __construct()
    {
        $this->announcementAnimalFeatures = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getLocality(): ?string
    {
        return $this->locality;
    }

    public function setLocality(string $locality): static
    {
        $this->locality = $locality;

        return $this;
    }

    public function getPrice(): ?int
    {
        return $this->price;
    }

    public function setPrice(?int $price): static
    {
        $this->price = $price;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getAge(): ?int
    {
        return $this->age;
    }

    public function setAge(?int $age): static
    {
        $this->age = $age;

        return $this;
    }

    public function getGender(): ?string
    {
        return $this->gender;
    }

    public function setGender(string $gender): static
    {
        $this->gender = $gender;

        return $this;
    }

    public function getAvatarUrl(): ?string
    {
        return $this->avatarUrl;
    }

    public function setAvatarUrl(string $avatarUrl): static
    {
        $this->avatarUrl = $avatarUrl;

        return $this;
    }

    public function getKind(): ?string
    {
        return $this->kind;
    }

    public function setKind(?string $kind): static
    {
        $this->kind = $kind;

        return $this;
    }

    public function getAgeType(): ?string
    {
        return $this->ageType;
    }

    public function setAgeType(string $ageType): static
    {
        $this->ageType = $ageType;

        return $this;
    }

    /**
     * @return Collection<int, AnnouncementAnimalFeature>
     */
    public function getAnnouncementAnimalFeatures(): Collection
    {
        return $this->announcementAnimalFeatures;
    }

    public function addAnnouncementAnimalFeature(AnnouncementAnimalFeature $announcementAnimalFeature): static
    {
        if (!$this->announcementAnimalFeatures->contains($announcementAnimalFeature)) {
            $this->announcementAnimalFeatures->add($announcementAnimalFeature);
            if ($announcementAnimalFeature->getAnnouncement() !== $this) {
                $announcementAnimalFeature->setAnnouncement($this);
            }
        }

        return $this;
    }

    public function removeAnnouncementAnimalFeature(AnnouncementAnimalFeature $announcementAnimalFeature): static
    {
        if ($this->announcementAnimalFeatures->removeElement($announcementAnimalFeature)) {
            // set the owning side to null (unless already changed)
            if ($announcementAnimalFeature->getAnnouncement() === $this) {
                $announcementAnimalFeature->setAnnouncement(null);
            }
        }

        return $this;
    }
}
