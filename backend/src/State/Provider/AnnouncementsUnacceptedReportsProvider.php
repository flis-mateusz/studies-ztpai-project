<?php

namespace App\State\Provider;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use App\Repository\AnnouncementRepository;

class AnnouncementsUnacceptedReportsProvider implements ProviderInterface
{

    public function __construct(private readonly AnnouncementRepository $repository)
    {
    }

    public function provide(Operation $operation, array $uriVariables = [], array $context = []): array|null|object
    {
        return $this->repository->findAnnouncementsWithUnacceptedReports();
    }
}
