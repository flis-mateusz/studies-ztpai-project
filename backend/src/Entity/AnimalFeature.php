<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use App\Repository\AnimalFeatureRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: AnimalFeatureRepository::class)]
#[ORM\UniqueConstraint(fields: ['name'])]
#[ApiResource(
    operations: [
        new Post(),
        new Delete(),
    ],
    routePrefix: '/admin',
    denormalizationContext: ['groups' => ['admin:animal_feature:write']],
    security: "is_granted('ROLE_ADMIN')",
)]
#[ApiResource(
    operations: [
        new GetCollection(
            paginationClientItemsPerPage: false,
        ),
        new Get(),
    ],
    normalizationContext: ['groups' => ['animal_feature:read']],
)]
class AnimalFeature
{
    #[Groups(['animal_feature:read'])]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['animal_feature:read', 'admin:animal_feature:write', 'announcement:read'])]
    #[ORM\Column(length: 255)]
    private ?string $name = null;

    /**
     * @var Collection<int, AnnouncementAnimalFeature>
     */
    #[ORM\OneToMany(targetEntity: AnnouncementAnimalFeature::class, mappedBy: 'feature', cascade: ['remove'])]
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

    public function getAnnouncementAnimalFeatures(): Collection
    {
        return $this->announcementAnimalFeatures;
    }
}
