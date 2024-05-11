<?php

namespace App\State\Provider;

use ApiPlatform\Doctrine\Orm\Paginator;
use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\Pagination\Pagination;
use ApiPlatform\State\ProviderInterface;
use App\Repository\AnnouncementRepository;

readonly class AnnouncementsUnacceptedProvider implements ProviderInterface
{

    public function __construct(private AnnouncementRepository $repository, private readonly Pagination $pagination)
    {
    }

    public function provide(Operation $operation, array $uriVariables = [], array $context = []): array|null|object
    {
        [$page, , $limit] = $this->pagination->getPagination($operation, $context);
        return new Paginator($this->repository->findUnacceptedAnnouncements($page, $limit));
    }
}
