<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;

class AuthController extends AbstractController
{
    #[Route('/check_in', name: 'app_sign_check_in', methods: ['GET'])]
    public function checkIn(EntityManagerInterface $entityManager): JsonResponse
    {
        return $this->json($this->getUser(), 200, [], [AbstractNormalizer::GROUPS => ['user:info']]);
    }

    #[Route('/public/sign_in', name: 'app_sign_in', methods: ['GET'])]
    public function signIn(EntityManagerInterface $entityManager, UserPasswordHasherInterface $passwordHasher): JsonResponse
    {
        $user = new User();
        $user->setName('Keyboard');
        $user->setSurname('Mouse');
        $user->setEmail('pwp@wp.pl');
        $user->setPhone('123123999');

        $hashedPassword = $passwordHasher->hashPassword(
            $user,
            'test123'
        );
        $user->setPassword($hashedPassword);

        $entityManager->persist($user);
        $entityManager->flush();

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
