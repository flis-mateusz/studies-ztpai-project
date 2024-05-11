<?php

namespace App\State\Provider;

use ApiPlatform\Doctrine\Orm\Paginator;
use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\Pagination\Pagination;
use ApiPlatform\State\ProviderInterface;
use App\Repository\AnnouncementRepository;

readonly class AnnouncementsProvider implements ProviderInterface
{

    public function __construct(private AnnouncementRepository $repository, private Pagination $pagination)
    {
    }

    public function provide(Operation $operation, array $uriVariables = [], array $context = []): array|null|object
    {
        /* Retrieve the pagination parameters from the context thanks to the Pagination object */
        [$page, , $limit] = $this->pagination->getPagination($operation, $context);
        /* Decorates the Doctrine Paginator object to the API Platform Paginator one */
        return new Paginator($this->repository->findValidAnnouncements($page, $limit));
    }
}
