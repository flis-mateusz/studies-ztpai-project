<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\UniqueConstraint(name: 'UNIQ_IDENTIFIER_EMAIL', fields: ['email'])]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['announcement:list'])]
    #[ORM\Column(length: 180)]
    private ?string $email = null;

    /**
     * @var list<string> The user roles
     */
    #[ORM\Column]
    private array $roles = [];

    /**
     * @var string The hashed password
     */
    #[ORM\Column]
    private ?string $password = null;

    #[Groups(['announcement:list'])]
    #[ORM\Column(length: 15)]
    private ?string $phone = null;

    #[Groups(['announcement:list'])]
    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[Groups(['announcement:list'])]
    #[ORM\Column(length: 255)]
    private ?string $surname = null;

    #[Groups(['announcement:list'])]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $avatarUrl = null;

    /**
     * @var Collection<int, Announcement>
     */
    #[ORM\OneToMany(targetEntity: Announcement::class, mappedBy: 'user')]
    private Collection $announcements;

    /**
     * @var Collection<int, AnnouncementLike>
     */
    #[ORM\OneToMany(targetEntity: AnnouncementLike::class, mappedBy: 'user')]
    private Collection $announcementLikes;

    /**
     * @var Collection<int, AnnouncementReport>
     */
    #[ORM\OneToMany(targetEntity: AnnouncementReport::class, mappedBy: 'user')]
    private Collection $announcementReports;

    public function __construct()
    {
        $this->announcements = new ArrayCollection();
        $this->announcementLikes = new ArrayCollection();
        $this->announcementReports = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     *
     * @return list<string>
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    /**
     * @param list<string> $roles
     */
    public function setRoles(array $roles): static
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials(): void
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getPhone(): ?string
    {
        return $this->phone;
    }

    public function setPhone(string $phone): static
    {
        $this->phone = $phone;

        return $this;
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

    public function getSurname(): ?string
    {
        return $this->surname;
    }

    public function setSurname(string $surname): static
    {
        $this->surname = $surname;

        return $this;
    }

    public function getAvatarUrl(): ?string
    {
        return $this->avatarUrl;
    }

    public function setAvatarUrl(?string $avatarUrl): static
    {
        $this->avatarUrl = $avatarUrl;

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
            $announcement->setUser($this);
        }

        return $this;
    }

    public function removeAnnouncement(Announcement $announcement): static
    {
        if ($this->announcements->removeElement($announcement)) {
            // set the owning side to null (unless already changed)
            if ($announcement->getUser() === $this) {
                $announcement->setUser(null);
            }
        }

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
            $announcementLike->setUser($this);
        }

        return $this;
    }

    public function removeAnnouncementLike(AnnouncementLike $announcementLike): static
    {
        if ($this->announcementLikes->removeElement($announcementLike)) {
            // set the owning side to null (unless already changed)
            if ($announcementLike->getUser() === $this) {
                $announcementLike->setUser(null);
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
            $announcementReport->setUser($this);
        }

        return $this;
    }

    public function removeAnnouncementReport(AnnouncementReport $announcementReport): static
    {
        if ($this->announcementReports->removeElement($announcementReport)) {
            // set the owning side to null (unless already changed)
            if ($announcementReport->getUser() === $this) {
                $announcementReport->setUser(null);
            }
        }

        return $this;
    }
}
