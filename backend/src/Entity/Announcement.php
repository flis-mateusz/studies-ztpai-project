<?php

namespace App\Entity;

use App\Repository\AnnouncementRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: AnnouncementRepository::class)]
class Announcement
{
    #[Groups(['announcement:list'])]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?bool $isAccepted = null;

    #[Groups(['announcement:list'])]
    #[ORM\Column]
    private ?\DateTimeImmutable $createdAt = null;

    #[Groups(['announcement:list'])]
    #[ORM\ManyToOne(inversedBy: 'announcements')]
    #[ORM\JoinColumn(nullable: false)]
    private ?AnimalType $animalType = null;

    #[Groups(['announcement:list'])]
    #[ORM\ManyToOne(inversedBy: 'announcements')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user = null;

    #[Groups(['announcement:list'])]
    #[ORM\OneToOne(cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: false)]
    private ?AnnouncementDetail $announcementDetail = null;

    /**
     * @var Collection<int, AnnouncementLike>
     */
    #[ORM\OneToMany(targetEntity: AnnouncementLike::class, mappedBy: 'announcement')]
    private Collection $announcementLikes;

    /**
     * @var Collection<int, AnnouncementReport>
     */
    #[ORM\OneToMany(targetEntity: AnnouncementReport::class, mappedBy: 'announcement')]
    private Collection $announcementReports;

    #[ORM\OneToOne(cascade: ['persist', 'remove'])]
    private ?AnnouncementDeletionDetail $deletionDetail = null;

    public function __construct()
    {
        $this->announcementLikes = new ArrayCollection();
        $this->announcementReports = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
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
}
