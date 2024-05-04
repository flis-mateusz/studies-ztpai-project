<?php

namespace App\Entity;

use App\Repository\MediaObjectRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Vich\UploaderBundle\Mapping\Annotation as Vich;

#[Vich\Uploadable]
#[ORM\Entity(repositoryClass: MediaObjectRepository::class)]
//#[ApiResource(
//    operations: [
//        new Get(),
//        new Post(
//            inputFormats: ['multipart' => ['multipart/form-data']],
//            controller: CreateMediaObjectAction::class,
//            openapi: new Model\Operation(
//                requestBody: new Model\RequestBody(
//                    content: new \ArrayObject([
//                        'multipart/form-data' => [
//                            'schema' => [
//                                'type' => 'object',
//                                'properties' => [
//                                    'file' => [
//                                        'type' => 'string',
//                                        'format' => 'binary'
//                                    ]
//                                ]
//                            ]
//                        ]
//                    ])
//                )
//            ),
//            deserialize: false
//        )
//    ],
//    normalizationContext: ['groups' => ['media_object:read']],
//    denormalizationContext: ['groups' => ['media_object:write']],
//)]
class MediaObject
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['media_object:write'])]
    #[Vich\UploadableField(mapping: 'media_object', fileNameProperty: 'filePath')]
    #[Assert\NotNull]
    #[Assert\Image]
    #[Assert\Valid]
    public ?File $file = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $filePath = null;

    #[Groups(['media_object:read', 'announcement:read', 'user:read'])]
    public ?string $contentUrl = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $updatedAt = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFilePath(): ?string
    {
        return $this->filePath;
    }

    public function setFilePath(?string $filePath): static
    {
        $this->filePath = $filePath;

        return $this;
    }

    public function getFile(): ?File
    {
        return $this->file;
    }

    public function setFile(?File $file): self
    {
        $this->file = $file;

        if ($this->file instanceof UploadedFile) {
            $this->updatedAt = new \DateTimeImmutable('now');
        }

        return $this;
    }
}
