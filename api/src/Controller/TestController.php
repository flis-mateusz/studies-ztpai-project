<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Request;

class TestController extends AbstractController
{
    #[Route('/checkIn', name: 'project_index', methods: ['get'])]
    public function index(ManagerRegistry $doctrine): JsonResponse
    {
        sleep(2);
        $data = [];

        $data[] = [
            'name' => 'Mateusz',
        ];

        return $this->json($data[0]);
    }

    #[Route('/signIn', name: 'testapi', methods: ['get', 'post'])]
    public function sign(ManagerRegistry $doctrine): JsonResponse
    {
        $data = [];

        $data[] = [
            'namee' => 'MateuszZZZZ',
        ];

        return $this->json($data[0]);
    }

    #[Route('/signOut', name: 'testapi2', methods: ['get'])]
    public function signo(ManagerRegistry $doctrine): JsonResponse
    {
        $data = [];

        $data[] = [
            'namee' => 'MateuszZZZZ',
        ];

        return $this->json($data[0]);
    }
}