<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Link;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\OpenApi\Model;
use App\Controller\CreateMediaObjectAction;
use App\Repository\UserRepository;
use App\State\Processor\UserAvatarDeletionProcessor;
use App\State\Processor\UserAvatarProcessor;
use App\State\UserPasswordHasher;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\UniqueConstraint(name: 'UNIQ_IDENTIFIER_EMAIL', fields: ['email'])]
#[ApiResource(
    operations: [
        new GetCollection(
            paginationClientEnabled: true
        ),
        new Get(),
        new Delete(),
        new Patch()
    ],
    routePrefix: '/admin',
    normalizationContext: ['groups' => ['user:read', 'admin:user:read']],
    denormalizationContext: ['groups' => ['admin:user:write']],
    security: "is_granted('ROLE_ADMIN')",
)]
#[ApiResource(
    operations: [
        new Patch(
            security: "object === user",
            validationContext: ['groups' => ['user:update']],
            processor: UserPasswordHasher::class
        ),
        new Post(
            normalizationContext: ['groups' => ['user:read', 'user:roles', 'user:registration']],
            processor: UserPasswordHasher::class
        ),
        new Get(
            security: "object === user"
        ),
    ],
    normalizationContext: ['groups' => ['user:read']],
    denormalizationContext: ['groups' => ['user:write']],
)]
#[ApiResource(
    uriTemplate: '/api/users/{id}{._format}',
    operations: [
        new Post(
            uriTemplate: '/users/{id}/avatar{._format}',
            inputFormats: ['multipart' => ['multipart/form-data']],
            controller: CreateMediaObjectAction::class,
            openapi: new Model\Operation(
                summary: 'Creates or updates user\'s avatar',
                description: 'Creates or updates user\'s avatar',
                requestBody: new Model\RequestBody(
                    content: new \ArrayObject([
                        'multipart/form-data' => [
                            'schema' => [
                                'type' => 'object',
                                'properties' => [
                                    'file' => [
                                        'type' => 'string',
                                        'format' => 'binary'
                                    ]
                                ]
                            ]
                        ]
                    ])
                )
            ),
            normalizationContext: ['groups' => ['user:read']],
            processor: UserAvatarProcessor::class,
        ),
        new Delete(
            uriTemplate: '/users/{id}/avatar{._format}',
            openapi: new Model\Operation(
                summary: 'Removes user\'s avatar',
                description: 'Removes user\'s avatar',
            ),
            processor: UserAvatarDeletionProcessor::class,
        )
    ],
    uriVariables: [
        'id' => new Link(fromClass: User::class),
    ],
    normalizationContext: ['groups' => ['user:read']],
    security: "object === user",
)]
# TODO assertions
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[Groups(['user:read'])]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['user:read', 'user:write'])]
    #[Assert\Email()]
    #[ORM\Column(length: 180)]
    private ?string $email = null;

    /**
     * @var list<string> The user roles
     */
    #[Groups(['admin:user:read', 'admin:user:write', 'user:roles'])]
    #[ORM\Column]
    private array $roles = [];

    /**
     * @var string The hashed password
     */
    #[ORM\Column]
    private ?string $password = null;

//    #[Assert\NotBlank(groups: ['user:create'])]
    #[Groups(['user:write'])]
    private ?string $plainPassword = null;

    #[Groups(['user:registration'])]
    private ?string $registrationToken = null;

    #[Groups(['user:read', 'user:write'])]
    #[ORM\Column(length: 15)]
    private ?string $phone = null;

    #[Groups(['user:read', 'user:write'])]
    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[Groups(['user:read', 'user:write'])]
    #[ORM\Column(length: 255)]
    private ?string $surname = null;

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

    #[Groups(['user:read'])]
    #[ORM\OneToOne(cascade: ['persist', 'remove'])]
    private ?MediaObject $avatar = null;

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
        return (string)$this->email;
    }

    /**
     * @return list<string>
     * @see UserInterface
     *
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

    public function getPlainPassword(): ?string
    {
        return $this->plainPassword;
    }

    public function setPlainPassword(?string $plainPassword): self
    {
        $this->plainPassword = $plainPassword;

        return $this;
    }

    public function getRegistrationToken(): ?string
    {
        return $this->registrationToken;
    }

    public function setRegistrationToken(?string $registrationToken): self
    {
        $this->registrationToken = $registrationToken;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials(): void
    {
        $this->plainPassword = null;
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

    public function getAvatar(): ?MediaObject
    {
        return $this->avatar;
    }

    public function setAvatar(?MediaObject $avatar): static
    {
        $this->avatar = $avatar;

        return $this;
    }
}
