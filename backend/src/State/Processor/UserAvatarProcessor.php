<?php

namespace App\State\Processor;

use ApiPlatform\Doctrine\Common\State\PersistProcessor;
use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use ApiPlatform\Validator\ValidatorInterface;
use App\Entity\MediaObject;
use App\Entity\User;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;

readonly class UserAvatarProcessor implements ProcessorInterface
{
    public function __construct(
        #[Autowire(service: PersistProcessor::class)]
        private ProcessorInterface $persistProcessor,
        private Security           $security,
        private ValidatorInterface $validator,
    )
    {
    }

    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): User
    {
        if (!$data instanceof MediaObject) {
            throw new \InvalidArgumentException('Expected MediaObject');
        }
        $this->validator->validate($data);

        $user = $this->security->getUser();
        if (!$user instanceof User) {
            throw new UnauthorizedHttpException("Invalid user type.");
        }

        $prevAvatar = $user->getAvatar();

        if ($prevAvatar) {
            $prevAvatar->setFile($data->getFile());
            $user->setAvatar($prevAvatar);
        } else {
            $user->setAvatar($data);
        }

        $data = $user;

        return $this->persistProcessor->process($data, $operation, $uriVariables, $context);
    }
}
