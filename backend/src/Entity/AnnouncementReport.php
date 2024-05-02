<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Link;
use ApiPlatform\Metadata\Post;
use App\Repository\AnnouncementReportRepository;
use App\State\Processor\AnnouncementReportPersistProcessor;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: AnnouncementReportRepository::class)]
#[ORM\UniqueConstraint(fields: ['user', 'announcement'])]
#[ApiResource(
    operations: [
        new GetCollection(),
        new Get(
            normalizationContext: ['groups' => [
                'report:read',
                'admin:report:read',
                'admin:report:read:detail',
                'announcement:read',
                'user:read'
            ]],
        ),
        new Delete(),
    ],
    routePrefix: '/admin',
    normalizationContext: ['groups' => ['report:read']],
    security: "is_granted('ROLE_ADMIN')",
)]
#[ApiResource(
    operations: [
        new Delete(
            security: "object.getUser() === user"
        ),
    ],
)]
#[ApiResource(
    uriTemplate: '/announcements/{announcement_id}/reports{._format}',
    operations: [
        new GetCollection(
            uriTemplate: '/admin/announcement/{announcement_id}/reports{._format}',
            normalizationContext: ['groups' => [
                'report:read',
                'admin:report:read',
                'admin:report:read:detail'
            ]],
            security: "is_granted('ROLE_ADMIN')",
        ),
        new Post(
            uriTemplate: '/announcements/{announcement_id}/reports{._format}',
            security: "is_granted('ROLE_USER')",
            processor: AnnouncementReportPersistProcessor::class,
        )
    ],
    uriVariables: [
        'announcement_id' => new Link(toProperty: 'announcement', fromClass: Announcement::class),
    ],
    normalizationContext: ['groups' => ['report:read']],
    denormalizationContext: ['groups' => ['report:create']],
    order: ['givenAt' => 'DESC'],
)]
class AnnouncementReport
{
    #[Groups(['report:read', 'user_context:report:read', 'admin:report:read'])]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['report:read', 'user_context:report:read', 'admin:report:read'])]
    #[ORM\Column]
    private ?\DateTimeImmutable $givenAt = null;

    #[Groups(['admin:report:list'])]
    #[ORM\Column(nullable: true)]
    private ?bool $isAccepted = null;

    #[Groups(['admin:report:list'])]
    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $details = null;

    #[Groups(['admin:report:read:detail'])]
    #[ORM\ManyToOne(inversedBy: 'announcementReports')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user = null;


    #[Groups(['admin:report:read:detail'])]
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
