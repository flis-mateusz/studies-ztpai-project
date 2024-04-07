<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

class AdminPanelController extends AbstractController
{
    #[Route('/admin/announcement/{announcementId}/approve', name: 'app_admin_panel_announcement_approve', methods: ['POST'])]
    public function approveAnnouncement(int $announcementId): JsonResponse
    {
        return $this->json([
            'announcementId' => $announcementId
        ]);
    }

    #[Route('/admin/list/{listName}/edit', name: 'app_admin_panel_list_update', methods: ['PUT'])]
    public function updateList(string $listName): JsonResponse
    {
        return $this->json([
            'listName' => $listName
        ]);
    }

    #[Route('/admin/report/{$reportId}/reject', name: 'app_admin_panel_reject_report', methods: ['POST'])]
    public function rejectReport(int $reportId): JsonResponse
    {
        return $this->json([
            'reportId' => $reportId
        ]);
    }
}
