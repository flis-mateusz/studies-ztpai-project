<?php

namespace App\Postponed;

use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Messenger\Attribute\AsMessageHandler;
use Symfony\Component\Serializer\Normalizer\DataUriNormalizer;

#[AsMessageHandler]
class TestHandler
{
    public function __construct()
    {
    }

    public function __invoke(TestMessage $message): void
    {
        $test = '1';
        $denormalizer = new DataUriNormalizer();
        $file = $denormalizer->denormalize($message->getContent(), File::class);
        dump($file);
        //dump($message);
    }
}