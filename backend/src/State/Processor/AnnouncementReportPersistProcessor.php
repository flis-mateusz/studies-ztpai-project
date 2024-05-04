<?php

namespace App\State\Processor;

use ApiPlatform\Doctrine\Common\State\PersistProcessor;
use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Entity\AnnouncementReport;
use App\Repository\AnnouncementRepository;
use Psr\Clock\ClockInterface;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\DependencyInjection\Attribute\Autowire;

readonly class AnnouncementReportPersistProcessor implements ProcessorInterface
{
    public function __construct(
        #[Autowire(service: PersistProcessor::class)]
        private ProcessorInterface     $persistProcessor,
        private AnnouncementRepository $announcementRepository,
        private ClockInterface         $clock,
        private Security               $security,
    ) {
    }

    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): AnnouncementReport
    {
        if (!$data instanceof AnnouncementReport) {
            throw new \InvalidArgumentException('Expected AnnouncementReport');
        }

        $reporter = $this->security->getUser();

        if (isset($uriVariables['announcement_id'])) {
            $announcement = $this->announcementRepository->find($uriVariables['announcement_id']);
            if (!$announcement) {
                throw new \Exception("Announcement not found");
            }
            if ($announcement->getUser() === $reporter) {
                throw new \Exception("You can't perform this action");
            }
            $data->setAnnouncement($announcement);
        }

        $data->setUser($reporter);
        $data->setGivenAt($this->clock->now());

        return $this->persistProcessor->process($data, $operation, $uriVariables, $context);
    }
}
