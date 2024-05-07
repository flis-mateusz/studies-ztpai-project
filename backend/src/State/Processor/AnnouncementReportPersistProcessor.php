<?php

namespace App\State\Processor;

use App\Entity\AnnouncementReport;

class AnnouncementReportPersistProcessor extends AbstractAnnouncementUserActionProcessor
{
    protected function getDataType(): string
    {
        return AnnouncementReport::class;
    }
}
