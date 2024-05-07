<?php

namespace App\State\Processor;

use App\Entity\AnnouncementReport;

class AnnouncementLikePersistProcessor extends AbstractAnnouncementUserActionProcessor
{

    protected function getDataType(): string
    {
        return AnnouncementReport::class;
    }
}
