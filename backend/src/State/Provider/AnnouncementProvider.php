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

class AnnouncementProvider implements ProviderInterface
{
    public function __construct(
        #[Autowire(service: 'api_platform.doctrine.orm.state.item_provider')]
        private readonly ProviderInterface            $defaultProvider,
        private readonly AnnouncementReportRepository $announcementReportRepository,
        private readonly AnnouncementLikeRepository   $announcementLikeRepository,
        private readonly Security                     $security,
    ) {
    }

    public function provide(Operation $operation, array $uriVariables = [], array $context = []): ?Announcement
    {
        /** @var Announcement $announcement */
        $announcement = $this->defaultProvider->provide($operation, $uriVariables, $context);
        $currentUser = $this->security->getUser();

        if ($announcement && !$announcement->isAccepted() && $announcement->getUser() !== $currentUser) {
            throw new NotFoundHttpException();
        }

        if ($announcement && $currentUser) {
            $user = $this->security->getUser();
            $report = $this->announcementReportRepository->findOneBy(['user' => $user, 'announcement' => $announcement]);
            $announcement->setUserReport($report);

            $like = $this->announcementLikeRepository->findOneBy(['user' => $user, 'announcement' => $announcement]);
            $announcement->setUserLike($like);
        }

        return $announcement;
    }
}
