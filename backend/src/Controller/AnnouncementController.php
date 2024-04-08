<?php

namespace App\Controller;

use App\Entity\Announcement;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\SerializerInterface;

class AnnouncementController extends AbstractController
{
    #[Route('/announcements', name: 'app_announcements')]
    public function announcements(EntityManagerInterface $entityManager, SerializerInterface $serializer): JsonResponse
    {
        $announcements = $entityManager->getRepository(Announcement::class)->findAll();

        return $this->json($announcements, 200, [], [AbstractNormalizer::GROUPS => ['announcement:list']]);
    }

    #[Route('/announcement/{$announcementId}', name: 'app_announcement')]
    public function announcement(int $announcementId): JsonResponse
    {
        return $this->json([
            'announcementId' => $announcementId
        ]);
    }

    #[Route('/announcement/add', name: 'app_announcement_add', methods: ['POST'])]
    public function announcementAdd(#[MapRequestPayload] null $announcementDto): JsonResponse
    {
        return $this->json([]);
    }

    #[Route('/announcement/{$announcementId}/edit', name: 'app_announcement_edit', methods: ['PUT'])]
    public function announcementEdit(int $announcementId, #[MapRequestPayload] null $announcementDto): JsonResponse
    {
        return $this->json([
            'announcementId' => $announcementId,
        ]);
    }

    #[Route('/announcement/{$announcementId}/delete', name: 'app_announcement_delete', methods: ['DELETE'])]
    public function announcementDelete(int $announcementId): JsonResponse
    {
        return $this->json([
            'announcementId' => $announcementId
        ]);
    }

    #[Route('/announcement/{$announcementId}/like', name: 'app_announcement_like', methods: ['POST'])]
    public function announcementLike(int $announcementId): JsonResponse
    {
        return $this->json([
            'announcementId' => $announcementId
        ]);
    }
}
