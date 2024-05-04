<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use App\Repository\AnimalTypeRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: AnimalTypeRepository::class)]
#[ORM\UniqueConstraint(fields: ['name'])]
#[ApiResource(
    operations: [
        new Post(),
        new Delete(),
    ],
    routePrefix: '/admin',
    normalizationContext: ['groups' => []],
    denormalizationContext: ['groups' => ['admin:animal_type:write']],
    security: "is_granted('ROLE_ADMIN')",
)]
#[ApiResource(
    operations: [
        new GetCollection(
            paginationClientItemsPerPage: false,
        ),
        new Get(),
    ],
    normalizationContext: ['groups' => ['animal_type:read']],
)]
class AnimalType
{
    #[Groups(['animal_type:read'])]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['animal_type:read', 'admin:animal_type:write', 'announcement:read'])]
    #[ORM\Column(length: 255)]
    private ?string $name = null;

    /**
     * @var Collection<int, Announcement>
     */
    #[ORM\OneToMany(targetEntity: Announcement::class, mappedBy: 'animalType')]
    private Collection $announcements;

    public function __construct()
    {
        $this->announcements = new ArrayCollection();
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

    /**
     * @return Collection<int, Announcement>
     */
    public function getAnnouncements(): Collection
    {
        return $this->announcements;
    }

    public function addAnnouncement(Announcement $announcement): static
    {
        if (!$this->announcements->contains($announcement)) {
            $this->announcements->add($announcement);
            $announcement->setAnimalType($this);
        }

        return $this;
    }

    public function removeAnnouncement(Announcement $announcement): static
    {
        if ($this->announcements->removeElement($announcement)) {
            // set the owning side to null (unless already changed)
            if ($announcement->getAnimalType() === $this) {
                $announcement->setAnimalType(null);
            }
        }

        return $this;
    }
}
