<?php

namespace App\EventListener;

use App\Message\RemoveFileMessage;
use Symfony\Component\Messenger\MessageBusInterface;
use Vich\UploaderBundle\Event\Event;

class FileRemoveListener
{
    public function __construct(private MessageBusInterface $messageBus)
    {
    }

    public function onPreRemove(Event $event): void
    {
        $event->cancel();

        $object = $event->getObject();
        $mapping = $event->getMapping();
        $filename = $mapping->getFileName($object);
        $uploadDir = $mapping->getUploadDestination();

        $message = new RemoveFileMessage($uploadDir, $filename);
        $this->messageBus->dispatch($message);
    }
}