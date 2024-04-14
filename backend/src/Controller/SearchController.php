<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

class SearchController extends AbstractController
{
    #[Route('/public/announcements/search', name: 'app_query_announcements', methods: ['GET'])]
    public function queryAnnouncements(Request $request): JsonResponse
    {
        $search = $request->query->get('features', '');
        $types = $request->query->get('types', '');
        $other = $request->query->get('other', '');

        return $this->json([
            'search' => $search,
            'types' => $types,
            'other' => $other,
        ]);
    }

    #[Route('/public/animal_types/search', name: 'app_query_animal_types', methods: ['GET'])]
    public function queryAnimalTypes(Request $request): JsonResponse
    {
        $search = $request->query->get('q', '');

        return $this->json([
            'query' => $search,
        ]);
    }
}
