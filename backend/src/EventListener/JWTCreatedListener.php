<?php

namespace App\EventListener;

use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Security\Core\User\UserInterface;

class JWTCreatedListener
{
    /**
     * @param JWTCreatedEvent $event
     *
     * @return void
     */
    public function onJWTCreated(JWTCreatedEvent $event)
    {
//        $expiration = new \DateTime('+30 day');
//        $expiration->setTime(2, 0, 0);
//
//        $payload        = $event->getData();
//        $payload['exp'] = $expiration->getTimestamp();
//
//        $event->setData($payload);
    }
}