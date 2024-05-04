<?php

namespace App\State\Processor;

use ApiPlatform\Doctrine\Common\State\PersistProcessor;
use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Entity\AnnouncementLike;
use App\Repository\AnnouncementRepository;
use Psr\Clock\ClockInterface;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\DependencyInjection\Attribute\Autowire;

class AnnouncementLikePersistProcessor implements ProcessorInterface
{
    public function __construct(
        #[Autowire(service: PersistProcessor::class)]
        private readonly ProcessorInterface     $persistProcessor,
        private readonly AnnouncementRepository $announcementRepository,
        private readonly ClockInterface         $clock,
        private readonly Security               $security,
    ) {
    }

    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): AnnouncementLike
    {
        if (!$data instanceof AnnouncementLike) {
            throw new \InvalidArgumentException('Expected AnnouncementLike');
        }

        $user = $this->security->getUser();

        if (isset($uriVariables['announcement_id'])) {
            $announcement = $this->announcementRepository->find($uriVariables['announcement_id']);
            if (!$announcement) {
                throw new \Exception("Announcement not found");
            }
            if ($announcement->getUser() === $user) {
                throw new \Exception("You can't perform this action");
            }
            $data->setAnnouncement($announcement);
        }

        $data->setUser($user);
        $data->setGivenAt($this->clock->now());

        return $this->persistProcessor->process($data, $operation, $uriVariables, $context);
    }
}
