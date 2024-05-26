<?php

namespace App\State\Provider;

use ApiPlatform\Doctrine\Orm\Paginator;
use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\Pagination\Pagination;
use ApiPlatform\State\ProviderInterface;
use App\Entity\User;
use App\Repository\AnnouncementRepository;
use Symfony\Bundle\SecurityBundle\Security;

readonly class AnnouncementsProvider implements ProviderInterface
{

    public function __construct(
        private AnnouncementRepository $repository,
        private Pagination             $pagination,
        private Security               $security,
    )
    {
    }

    public
    function provide(Operation $operation, array $uriVariables = [], array $context = []): array|null|object
    {
        /* Retrieve the pagination parameters from the context thanks to the Pagination object */
        [$page, , $limit] = $this->pagination->getPagination($operation, $context);

        // Retrieve filters from the context
        $filters = $context['filters'] ?? [];

        $userLikes = null;
        $userId = null;
        if (isset($filters['favourite'])) {
            $userLikes = filter_var($filters['favourite'], FILTER_VALIDATE_BOOLEAN);
            $user = $this->security->getUser();
            $userId = $user instanceof User ? $user->getId() : null;
        }

        $free = null;
        if (isset($filters['free'])) {
            $free = filter_var($filters['free'], FILTER_VALIDATE_BOOLEAN);
        }

        /* Decorates the Doctrine Paginator object to the API Platform Paginator one */
        return new Paginator($this->repository->findValidAnnouncements(
            $page,
            $limit,
            $filters,
            $userLikes,
            $userId,
            $free
        ));
    }
}
