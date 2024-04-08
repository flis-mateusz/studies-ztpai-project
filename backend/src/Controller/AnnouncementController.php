<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;
use Symfony\Component\Routing\Attribute\Route;

class AnnouncementController extends AbstractController
{
    #[Route('/announcements', name: 'app_announcements')]
    public function announcements(): JsonResponse
    {
        return $this->json([]);
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