<?php

namespace App\State\Provider;

use ApiPlatform\Doctrine\Orm\Paginator;
use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\Pagination\Pagination;
use ApiPlatform\State\ProviderInterface;
use App\Entity\User;
use App\Repository\AnnouncementRepository;
use Symfony\Bundle\SecurityBundle\Security;

readonly class UserAnnouncementsProvider implements ProviderInterface
{

    public function __construct(
        private AnnouncementRepository $repository,
        private Security               $security,
        private Pagination             $pagination)
    {
    }

    public function provide(Operation $operation, array $uriVariables = [], array $context = []): array|null|object
    {
        $currentUser = $this->security->getUser();
        if (!$currentUser instanceof User) {
            return null;
        }

        [$page, , $limit] = $this->pagination->getPagination($operation, $context);
        return new Paginator($this->repository->findUserAnnouncements($currentUser, $page, $limit));
    }
}
