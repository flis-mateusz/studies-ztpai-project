<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;

class CheckInController extends AbstractController
{
    #[Route('/check_in', name: 'check_in')]
    public function index(): JsonResponse
    {
        return $this->json($this->getUser(), 200, [], [AbstractNormalizer::GROUPS => ['user:read', 'user:roles']]);
    }
}
