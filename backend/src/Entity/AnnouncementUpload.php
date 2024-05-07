<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Post;
use App\Repository\AnnouncementUploadRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: AnnouncementUploadRepository::class)]
#[ApiResource(
    operations: [
        new Get(),
        new Post(),
    ],
    normalizationContext: ['groups' => ['announcement:read']],
    denormalizationContext: ['groups' => ['announcement:uploads:write']],
)]
class AnnouncementUpload
{
    #[Groups(['announcement:read'])]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['announcement:read', 'announcement:uploads:write'])]
    #[ORM\OneToOne(cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: false)]
    #[Assert\Valid]
    private ?MediaObject $mediaObject = null;

    #[ORM\ManyToOne(inversedBy: 'uploads')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Announcement $announcement = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getMediaObject(): ?MediaObject
    {
        return $this->mediaObject;
    }

    public function setMediaObject(MediaObject $mediaObject): static
    {
        $this->mediaObject = $mediaObject;

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
