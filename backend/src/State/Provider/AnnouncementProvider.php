<?php

namespace App\State\Provider;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use App\Entity\Announcement;
use App\Repository\AnnouncementLikeRepository;
use App\Repository\AnnouncementReportRepository;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

readonly class AnnouncementProvider implements ProviderInterface
{
    public function __construct(
        #[Autowire(service: 'api_platform.doctrine.orm.state.item_provider')]
        private ProviderInterface            $defaultProvider,
        private AnnouncementReportRepository $announcementReportRepository,
        private AnnouncementLikeRepository   $announcementLikeRepository,
        private Security                     $security,
    ) {
    }

    public function provide(Operation $operation, array $uriVariables = [], array $context = []): ?Announcement
    {
        /** @var Announcement $announcement */
        $announcement = $this->defaultProvider->provide($operation, $uriVariables, $context);
        $currentUser = $this->security->getUser();

        if ($announcement && !$announcement->isAccepted() && $announcement->getUser() !== $currentUser && !$this->security->isGranted('ROLE_ADMIN')) {
            throw new NotFoundHttpException();
        }

        if ($announcement && $currentUser) {
            $report = $this->announcementReportRepository->findOneBy(['user' => $currentUser, 'announcement' => $announcement]);
            $announcement->setUserReport($report);

            $like = $this->announcementLikeRepository->findOneBy(['user' => $currentUser, 'announcement' => $announcement]);
            $announcement->setUserLike($like);
        }

        return $announcement;
    }
}
