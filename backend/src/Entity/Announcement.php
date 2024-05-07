<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\OpenApi\Model;
use App\Repository\AnnouncementRepository;
use App\State\Processor\AnnouncementDeletionProcessor;
use App\State\Processor\AnnouncementPersistProcessor;
use App\State\Processor\AnnouncementUploadsPersistProcessor;
use App\State\Provider\AnnouncementProvider;
use App\State\Provider\AnnouncementsProvider;
use App\State\Provider\AnnouncementsUnacceptedProvider;
use App\State\Provider\AnnouncementsUnacceptedReportsProvider;
use App\State\Provider\UserAnnouncementsProvider;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Config\Definition\Exception\ForbiddenOverwriteException;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: AnnouncementRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(
            uriTemplate: '/announcements/reports/unaccepted{._format}',
            paginationClientItemsPerPage: true,
            normalizationContext: ['groups' => ['announcement:read', 'admin:report:list', 'user_context:report:read', 'user:read']],
            provider: AnnouncementsUnacceptedReportsProvider::class
        ),
        new GetCollection(
            uriTemplate: '/announcements/unaccepted{._format}',
            paginationClientItemsPerPage: true,
            normalizationContext: ['groups' => ['announcement:read', 'user:read']],
            provider: AnnouncementsUnacceptedProvider::class
        ),
        new Get(
            normalizationContext: ['groups' => [
                'announcement:read',
                'deletion:read',
                'announcement:read:user_context',
                'user_context:report:read',
                'user_context:like:read',
                'admin:deletion:read',
                'admin:report:list',
                'user:read'
            ]],
            provider: AnnouncementProvider::class
        ),
        new Delete(
            processor: AnnouncementDeletionProcessor::class
        ),
    ],
    routePrefix: '/admin',
    normalizationContext: ['groups' => ['announcement:read']],
    security: "is_granted('ROLE_ADMIN')",
)]
#[ApiResource(
    operations: [
        new GetCollection(
            paginationClientItemsPerPage: true,
            provider: AnnouncementsProvider::class
        ),
        new Post(
            security: "is_granted('ROLE_USER')",
            processor: AnnouncementPersistProcessor::class,
        ),
        new Get(
            normalizationContext: ['groups' => [
                'announcement:read',
                'deletion:read',
                'announcement:read:user_context',
                'user_context:report:read',
                'user_context:like:read',
                'user:read'
            ]],
            provider: AnnouncementProvider::class
        ),
        new Delete(
            security: "object.getUser() === user",
            processor: AnnouncementDeletionProcessor::class
        ),
        new Patch(
            security: "object.getUser() === user",
            processor: AnnouncementPersistProcessor::class,
        ),
        new Post(
            uriTemplate: '/announcements/{id}/uploads{._format}',
            inputFormats: ['multipart' => ['multipart/form-data']],
            openapi: new Model\Operation(
                requestBody: new Model\RequestBody(
                    content: new \ArrayObject([
                        'multipart/form-data' => [
                            'schema' => [
                                'type' => 'object',
                                'properties' => [
                                    'files[]' => [
                                        'type' => 'array',
                                        'format' => 'binary'
                                    ]
                                ]
                            ]
                        ]
                    ])
                )
            ),
            normalizationContext: ['groups' => ['announcement:uploads:read']],
            security: "object.getUser() === user",
            deserialize: false,
            processor: AnnouncementUploadsPersistProcessor::class,
        )
    ],
    normalizationContext: ['groups' => ['announcement:read', 'user:read', 'media_object:read']],
    denormalizationContext: ['groups' => ['announcement:write']],
)]
#[ApiResource(
    operations: [
        new GetCollection(
            uriTemplate: '/my/announcements{._format}',
            paginationClientItemsPerPage: true,
            normalizationContext: ['groups' => ['announcement:read']],
            security: "is_granted('ROLE_USER')",
            provider: UserAnnouncementsProvider::class
        ),
    ],
)]
class Announcement
{
    #[Groups(['announcement:read'])]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['announcement:read'])]
    #[ORM\Column]
    private ?bool $isAccepted = null;

    #[Groups(['announcement:read'])]
    #[ORM\Column]
    private ?\DateTimeImmutable $createdAt = null;

    #[Groups(['announcement:read', 'announcement:write'])]
    #[Assert\Valid]
    #[ORM\ManyToOne(inversedBy: 'announcements')]
    #[ORM\JoinColumn(nullable: false)]
    private ?AnimalType $animalType = null;

    #[Groups(['user:read'])]
    #[ORM\ManyToOne(inversedBy: 'announcements')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user = null;

    #[Groups(['announcement:read', 'announcement:write'])]
    #[ORM\OneToOne(cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: false)]
    private ?AnnouncementDetail $announcementDetail = null;

    #[Groups(['announcement:read:user_context'])]
    private ?AnnouncementReport $userReport = null;

    #[Groups(['announcement:read:user_context'])]
    private ?AnnouncementLike $userLike = null;

    /**
     * @var Collection<int, AnnouncementLike>
     */
    #[ORM\OneToMany(targetEntity: AnnouncementLike::class, mappedBy: 'announcement')]
    private Collection $announcementLikes;

    /**
     * @var Collection<int, AnnouncementReport>
     */
    #[Groups(['admin:report:list'])]
    #[ORM\OneToMany(targetEntity: AnnouncementReport::class, mappedBy: 'announcement')]
    private Collection $announcementReports;

    #[Groups(['deletion:read'])]
    #[ORM\OneToOne(cascade: ['persist', 'remove'])]
    private ?AnnouncementDeletionDetail $deletionDetail = null;

    /**
     * @var Collection<int, AnnouncementUpload>
     */
    #[Groups(['announcement:read', 'announcement:write', 'announcement:uploads:read', 'announcement:uploads:write'])]
    #[ORM\OneToMany(targetEntity: AnnouncementUpload::class, mappedBy: 'announcement', cascade: ['persist'], orphanRemoval: true)]
    private Collection $uploads;

    public function __construct()
    {
        $this->announcementLikes = new ArrayCollection();
        $this->announcementReports = new ArrayCollection();
        $this->uploads = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getIsAccepted(): ?bool
    {
        return $this->isAccepted;
    }

    public function isAccepted(): ?bool
    {
        return $this->isAccepted;
    }

    public function setAccepted(bool $isAccepted): static
    {
        $this->isAccepted = $isAccepted;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): static
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getAnimalType(): ?AnimalType
    {
        return $this->animalType;
    }

    public function setAnimalType(?AnimalType $animalType): static
    {
        $this->animalType = $animalType;

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

    public function getAnnouncementDetail(): ?AnnouncementDetail
    {
        return $this->announcementDetail;
    }

    public function setAnnouncementDetail(AnnouncementDetail $announcementDetail): static
    {
        $this->announcementDetail = $announcementDetail;

        return $this;
    }

    public function getUserReport(): ?AnnouncementReport
    {
        return $this->userReport;
    }

    public function setUserReport(?AnnouncementReport $userReport): static
    {
        $this->userReport = $userReport;

        return $this;
    }

    public function getUserLike(): ?AnnouncementLike
    {
        return $this->userLike;
    }

    public function setUserLike(?AnnouncementLike $userLike): static
    {
        $this->userLike = $userLike;

        return $this;
    }

    /**
     * @return Collection<int, AnnouncementLike>
     */
    public function getAnnouncementLikes(): Collection
    {
        return $this->announcementLikes;
    }

    public function addAnnouncementLike(AnnouncementLike $announcementLike): static
    {
        if (!$this->announcementLikes->contains($announcementLike)) {
            $this->announcementLikes->add($announcementLike);
            $announcementLike->setAnnouncement($this);
        }

        return $this;
    }

    public function removeAnnouncementLike(AnnouncementLike $announcementLike): static
    {
        if ($this->announcementLikes->removeElement($announcementLike)) {
            // set the owning side to null (unless already changed)
            if ($announcementLike->getAnnouncement() === $this) {
                $announcementLike->setAnnouncement(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, AnnouncementReport>
     */
    public function getAnnouncementReports(): Collection
    {
        return $this->announcementReports;
    }

    public function addAnnouncementReport(AnnouncementReport $announcementReport): static
    {
        if (!$this->announcementReports->contains($announcementReport)) {
            $this->announcementReports->add($announcementReport);
            $announcementReport->setAnnouncement($this);
        }

        return $this;
    }

    public function removeAnnouncementReport(AnnouncementReport $announcementReport): static
    {
        if ($this->announcementReports->removeElement($announcementReport)) {
            // set the owning side to null (unless already changed)
            if ($announcementReport->getAnnouncement() === $this) {
                $announcementReport->setAnnouncement(null);
            }
        }

        return $this;
    }

    public function getDeletionDetail(): ?AnnouncementDeletionDetail
    {
        return $this->deletionDetail;
    }

    public function setDeletionDetail(?AnnouncementDeletionDetail $deletionDetail): static
    {
        $this->deletionDetail = $deletionDetail;

        return $this;
    }

    /**
     * @return Collection<int, AnnouncementUpload>
     */
    public function getUploads(): Collection
    {
        return $this->uploads;
    }

    public function setUploads(?Collection $uploads): static
    {
        $this->uploads = $uploads;

        return $this;
    }

    public function addUpload(AnnouncementUpload $upload): static
    {
        if ($upload->getAnnouncement() !== null && $upload->getAnnouncement() !== $this) {
            throw new ForbiddenOverwriteException("Forbidden overwrite exception");
        }

        if (!$this->uploads->contains($upload)) {
            $this->uploads->add($upload);
            $upload->setAnnouncement($this);
        }

        return $this;
    }

    public function removeUpload(AnnouncementUpload $upload): static
    {
        if ($this->uploads->removeElement($upload)) {
            // set the owning side to null (unless already changed)
            if ($upload->getAnnouncement() === $this) {
                $upload->setAnnouncement(null);
            }
        }

        return $this;
    }
}
