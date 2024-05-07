<?php

namespace App\Controller;

use App\Entity\MediaObject;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

#[AsController]
final class CreateMediaObjectsAction extends AbstractController
{
    public function __invoke(Request $request): ArrayCollection
    {
        $uploadedFiles = $request->files->get('files');
        if (!$uploadedFiles) {
            throw new BadRequestHttpException('"files" is required');
        }

        $mediaObjects = new ArrayCollection();
        foreach ($uploadedFiles as $uploadedFile) {
            $mediaObject = new MediaObject();
            $mediaObject->setFile($uploadedFile);
            $mediaObjects->add($mediaObject);
        }

        return $mediaObjects;
    }
}