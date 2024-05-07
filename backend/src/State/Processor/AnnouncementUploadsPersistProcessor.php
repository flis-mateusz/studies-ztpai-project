<?php

namespace App\State\Processor;

use ApiPlatform\Doctrine\Common\State\PersistProcessor;
use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use ApiPlatform\Validator\ValidatorInterface;
use App\Entity\Announcement;
use App\Entity\AnnouncementUpload;
use App\Entity\MediaObject;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

readonly class AnnouncementUploadsPersistProcessor implements ProcessorInterface
{
    public function __construct(
        #[Autowire(service: PersistProcessor::class)]
        private ProcessorInterface $persistProcessor,
        private ValidatorInterface $validator,
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

        $request = $context['request'] ?? null;
        if (!$request) {
            throw new NotFoundHttpException();
        }

        $uploadedFiles = $request->files->get('files');
        if (!count($uploadedFiles)) {
            throw new BadRequestHttpException('No files uploaded');
        }

        if (count($uploadedFiles) + $data->getUploads()->count() > 5) {
            throw new BadRequestHttpException('Too many uploaded files');
        }

        foreach ($uploadedFiles as $uploadedFile) {
            $announcementUpload = new AnnouncementUpload();
            $mediaObject = new MediaObject();
            $mediaObject->setFile($uploadedFile);

            $this->validator->validate($mediaObject);

            $announcementUpload->setMediaObject($mediaObject);
            $data->addUpload($announcementUpload);
        }

        $data->setAccepted(false);

        return $this->persistProcessor->process($data, $operation, $uriVariables, $context);
    }
}
