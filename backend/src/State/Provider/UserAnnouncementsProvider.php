<?php

namespace App\State\Provider;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use App\Repository\AnnouncementRepository;
use Symfony\Bundle\SecurityBundle\Security;

readonly class UserAnnouncementsProvider implements ProviderInterface
{

    public function __construct(
        private AnnouncementRepository $repository,
        private Security               $security,)
    {
    }

    public function provide(Operation $operation, array $uriVariables = [], array $context = []): array|null|object
    {
        $currentUser = $this->security->getUser();

        return $this->repository->findBy(['deletionDetail' => null, 'user' => $currentUser]);
    }
}
