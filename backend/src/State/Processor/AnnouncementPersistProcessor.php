<?php

namespace App\State\Processor;

use ApiPlatform\Doctrine\Common\State\PersistProcessor;
use ApiPlatform\Metadata\Operation;
use ApiPlatform\Metadata\Post;
use ApiPlatform\State\ProcessorInterface;
use ApiPlatform\Validator\ValidatorInterface;
use App\Entity\Announcement;
use App\Repository\AnnouncementUploadRepository;
use Psr\Clock\ClockInterface;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\Finder\Exception\AccessDeniedException;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

readonly class AnnouncementPersistProcessor implements ProcessorInterface
{
    public function __construct(
        #[Autowire(service: PersistProcessor::class)]
        private ProcessorInterface $persistProcessor,
        private ClockInterface     $clock,
        private Security           $security
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
        if ($data->getUploads()->count() > 5) {
            throw new BadRequestHttpException('Too many uploaded files');
        }

        $currentUser = $this->security->getUser();

        if ($operation instanceof Post) {
            $data->setUser($currentUser);
            $data->setCreatedAt($this->clock->now());
        }

        $data->getAnnouncementDetail()->setPrice($data->getAnnouncementDetail()->getPrice() ?: null);

        $data->setAccepted(false);

        return $this->persistProcessor->process($data, $operation, $uriVariables, $context);
    }
}
