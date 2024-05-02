<?php

namespace App\State\Processor;

use ApiPlatform\Doctrine\Common\State\PersistProcessor;
use ApiPlatform\Metadata\Operation;
use ApiPlatform\Metadata\Post;
use ApiPlatform\State\ProcessorInterface;
use App\Entity\Announcement;
use App\Entity\AnnouncementLike;
use App\Entity\AnnouncementReport;
use App\Repository\AnnouncementRepository;
use Psr\Clock\ClockInterface;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class AnnouncementPersistProcessor implements ProcessorInterface
{
    public function __construct(
        #[Autowire(service: PersistProcessor::class)]
        private ProcessorInterface     $persistProcessor,
        private AnnouncementRepository $announcementRepository,
        private ClockInterface         $clock,
        private Security               $security,
    )
    {
    }

    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): Announcement
    {
        if (!$data instanceof Announcement) {
            throw new \InvalidArgumentException('Expected Announcement');
        }
        if ($data->getDeletionDetail()) {
            throw new NotFoundHttpException();
        }

        $user = $this->security->getUser();

        if ($operation instanceof Post) {
            $data->setUser($user);
        }

        $data->setAccepted(false);
        $data->setCreatedAt($this->clock->now());

        return $this->persistProcessor->process($data, $operation, $uriVariables, $context);
    }
}
