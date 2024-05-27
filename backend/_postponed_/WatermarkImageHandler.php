<?php

namespace App\Postponed;

use Symfony\Component\Messenger\Attribute\AsMessageHandler;

#[AsMessageHandler]
class WatermarkImageHandler
{
    public function __construct()
    {
    }

    public function __invoke(WatermarkImageMessage $message): void
    {
        dump($message);
        //dump($message);
    }
}