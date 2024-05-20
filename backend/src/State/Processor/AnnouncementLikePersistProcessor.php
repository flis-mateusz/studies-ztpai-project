<?php

namespace App\State\Processor;

use App\Entity\AnnouncementLike;

class AnnouncementLikePersistProcessor extends AbstractAnnouncementUserActionProcessor
{

    protected function getDataType(): string
    {
        return AnnouncementLike::class;
    }
}
