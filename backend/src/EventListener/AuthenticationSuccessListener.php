<?php

namespace App\EventListener;

use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\SerializerInterface;

class AuthenticationSuccessListener
{
    public function __construct(private SerializerInterface $serializer)
    {
    }

    public function onAuthenticationSuccessResponse(AuthenticationSuccessEvent $event)
    {
        $data = $event->getData();
        $user = $event->getUser();

        if (!$user instanceof UserInterface) {
            return;
        }

        $userData = $this->serializer->serialize($user, 'json', ['groups' => ['user:read', 'user:roles']]);
        $userData = json_decode($userData, true);

        $data['user'] = $userData;

        $event->setData($data);
    }
}