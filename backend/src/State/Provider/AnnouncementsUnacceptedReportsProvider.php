<?php

namespace App\State\Provider;

use ApiPlatform\Doctrine\Orm\Paginator;
use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\Pagination\Pagination;
use ApiPlatform\State\ProviderInterface;
use App\Repository\AnnouncementRepository;

readonly class AnnouncementsUnacceptedReportsProvider implements ProviderInterface
{

    public function __construct(private AnnouncementRepository $repository, private Pagination $pagination)
    {
    }

    public function provide(Operation $operation, array $uriVariables = [], array $context = []): array|null|object
    {
        [$page, , $limit] = $this->pagination->getPagination($operation, $context);
        return new Paginator($this->repository->findAnnouncementsWithUnacceptedReports($page, $limit));
    }
}
