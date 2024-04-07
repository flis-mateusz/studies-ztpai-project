<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

class ReportsController extends AbstractController
{
    #[Route('/announcement/report/{announcementId}', name: 'app_announcement_report')]
    public function announcementReport(int $announcementId): JsonResponse
    {
        return $this->json([
            'id'=>$announcementId,
        ]);
    }
}
