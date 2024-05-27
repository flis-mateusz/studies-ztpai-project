<?php

namespace App\Postponed;

class WatermarkImageMessage
{
    private array $imageIds;

    public function __construct(array $imageIds)
    {
        $this->imageIds = $imageIds;
    }

    public function getImageIds(): array
    {
        return $this->imageIds;
    }
}
