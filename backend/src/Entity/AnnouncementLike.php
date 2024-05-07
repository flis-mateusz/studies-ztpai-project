<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Link;
use ApiPlatform\Metadata\Post;
use App\Repository\AnnouncementLikeRepository;
use App\State\Processor\AnnouncementLikePersistProcessor;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: AnnouncementLikeRepository::class)]
#[ORM\UniqueConstraint(fields: ['user', 'announcement'])]
#[ApiResource(
    operations: [
        new GetCollection(),
        new Get(),
        new Delete(),
    ],
    routePrefix: '/admin',
    normalizationContext: ['groups' => ['like:read', 'like:list', 'announcement:read']],
    security: "is_granted('ROLE_ADMIN')",
)]
#[ApiResource(
    operations: [
        new Delete(
            security: "object.getUser() === user"
        ),
    ],
    normalizationContext: ['groups' => ['like:read']],
    denormalizationContext: ['groups' => ['like:write']],
)]
#[ApiResource(
    uriTemplate: '/announcements/{announcement_id}/likes{._format}',
    operations: [
        new GetCollection(
            uriTemplate: '/admin/announcements/{announcement_id}/likes{._format}',
            security: "is_granted('ROLE_ADMIN')",
        ),
        new Post(
            uriTemplate: '/announcements/{announcement_id}/likes{._format}',
            security: "is_granted('ROLE_USER')",
            processor: AnnouncementLikePersistProcessor::class,
        )
    ],
    uriVariables: [
        'announcement_id' => new Link(toProperty: 'announcement', fromClass: Announcement::class),
    ],
    normalizationContext: ['groups' => ['like:read']],
    denormalizationContext: ['groups' => ['like:create']],
    order: ['givenAt' => 'DESC'],
)]
class AnnouncementLike
{
    #[Groups(['like:read', 'user_context:like:read'])]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['like:read', 'user_context:like:read'])]
    #[ORM\Column]
    private ?\DateTimeImmutable $givenAt = null;

    #[ORM\ManyToOne(inversedBy: 'announcementLikes')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user = null;

    #[Groups(['like:list'])]
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
