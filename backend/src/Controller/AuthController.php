<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

class AuthController extends AbstractController
{
    #[Route('/check_in', name: 'app_sign_check_in', methods: ['GET'])]
    public function checkIn(): JsonResponse
    {
        return $this->json([]);
    }

    #[Route('/sign_in', name: 'app_sign_in', methods: ['POST'])]
    public function signIn(): JsonResponse
    {
        return $this->json([]);
    }

    #[Route('/sign_out', name: 'app_sign_out', methods: ['GET'])]
    public function signOut(): JsonResponse
    {
        return $this->json([]);
    }

    #[Route('/sign_up', name: 'app_sign_up', methods: ['POST'])]
    public function signUp(): JsonResponse
    {
        return $this->json([]);
    }
}
