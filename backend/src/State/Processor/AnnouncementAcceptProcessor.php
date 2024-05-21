<?php

namespace App\State\Processor;

use ApiPlatform\Doctrine\Common\State\PersistProcessor;
use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Entity\Announcement;
use Symfony\Component\DependencyInjection\Attribute\Autowire;

readonly class AnnouncementAcceptProcessor implements ProcessorInterface
{
    public function __construct(
        #[Autowire(service: PersistProcessor::class)]
        private ProcessorInterface $persistProcessor,
    )
    {
    }

    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): Announcement
    {
        if (!$data instanceof Announcement) {
            throw new \InvalidArgumentException('Expected Announcement');
        }

        $data->setAccepted(true);

        return $this->persistProcessor->process($data, $operation, $uriVariables, $context);
    }
}
