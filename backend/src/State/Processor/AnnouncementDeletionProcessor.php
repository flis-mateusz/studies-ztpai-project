<?php

namespace App\State\Processor;

use ApiPlatform\Doctrine\Common\State\PersistProcessor;
use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Entity\Announcement;
use App\Entity\AnnouncementDeletionDetail;
use App\Entity\AnnouncementLike;
use App\Entity\AnnouncementReport;
use App\Repository\AnnouncementRepository;
use Psr\Clock\ClockInterface;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\DependencyInjection\Attribute\Autowire;

class AnnouncementDeletionProcessor implements ProcessorInterface
{
    public function __construct(
        #[Autowire(service: PersistProcessor::class)]
        private readonly ProcessorInterface $persistProcessor,
        private readonly ClockInterface     $clock,
        private readonly Security           $security,
    )
    {
    }

    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): Announcement
    {
        if (!$data instanceof Announcement) {
            throw new \InvalidArgumentException('Expected Announcement');
        }
        if ($data->getDeletionDetail()) {
            throw new \DomainException('Deletion Detail already exists');
        }

        $currentUser = $this->security->getUser();
        $deletionDetail = new AnnouncementDeletionDetail();
        $deletionDetail->setDeletedBy($currentUser);
        $deletionDetail->setDeletedAt($this->clock->now());

        if ($data->getUser() === $currentUser) {
            $deletionDetail->setReason('BY_USER');
        } else {
            $deletionDetail->setReason('VIOLATION');
        }

        $data->setDeletionDetail($deletionDetail);

        return $this->persistProcessor->process($data, $operation, $uriVariables, $context);
    }
}
