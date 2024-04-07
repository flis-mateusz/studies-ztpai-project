<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;
use Symfony\Component\Routing\Attribute\Route;

class ProfileController extends AbstractController
{
    #[Route('/profile/announcements', name: 'app_profile_announcements', methods: ['GET'])]
    public function myAnnouncements(): JsonResponse
    {
        return $this->json([]);
    }

    #[Route('/profile/announcements/favourite', name: 'app_profile_favourite_announcements', methods: ['GET'])]
    public function favouriteAnnouncements(): JsonResponse
    {
        return $this->json([]);
    }

    #[Route('/profile/edit', name: 'app_profile_edit', methods: ['POST'])]
    public function profileEdit(#[MapRequestPayload] null $userDto): JsonResponse
    // TODO type
    {
        return $this->json([
            'user' => $userDto,
        ]);
    }

    #[Route('/profile/avatar/delete', name: 'app_profile_avatar_delete', methods: ['GET'])]
    public function profileAvatarDelete(): JsonResponse
    {
        return $this->json([]);
    }
}
