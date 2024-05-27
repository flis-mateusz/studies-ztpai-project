<?php

namespace App\MessageHandler;

use App\Message\RemoveFileMessage;
use Psr\Log\LoggerInterface;
use Symfony\Component\Filesystem\Exception\IOExceptionInterface;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Messenger\Attribute\AsMessageHandler;

#[AsMessageHandler]
class RemoveFileMessageHandler
{
    public function __construct(private LoggerInterface $logger)
    {
    }

    public function __invoke(RemoveFileMessage $message): void
    {
        $filesystem = new Filesystem();

        $fullPath = $message->getUploadDir() . \DIRECTORY_SEPARATOR . $message->getFilename();

        try {
            if ($filesystem->exists($fullPath)) {
                $filesystem->remove($fullPath);
            }
        } catch (IOExceptionInterface $exception) {
            $this->logger->alert("An error occurred while deleting file: " . $message->getFilename());
        }
    }
}