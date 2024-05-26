<?php

namespace App\Repository;

use App\Entity\Announcement;
use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Collections\Criteria;
use Doctrine\ORM\Tools\Pagination\Paginator as DoctrinePaginator;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Announcement>
 *
 * @method Announcement|null find($id, $lockMode = null, $lockVersion = null)
 * @method Announcement|null findOneBy(array $criteria, array $orderBy = null)
 * @method Announcement[]    findAll()
 * @method Announcement[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class AnnouncementRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Announcement::class);
    }

    //    /**
    //     * @return Announcement[] Returns an array of Announcement objects
    //     */
    //    public function findByExampleField($value): array
    //    {
    //        return $this->createQueryBuilder('a')
    //            ->andWhere('a.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->orderBy('a.id', 'ASC')
    //            ->setMaxResults(10)
    //            ->getQuery()
    //            ->getResult()
    //        ;
    //    }

    //    public function findOneBySomeField($value): ?Announcement
    //    {
    //        return $this->createQueryBuilder('a')
    //            ->andWhere('a.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }

    public function findUserAnnouncements(User $user, int $page = 1, int $itemsPerPage = 30): DoctrinePaginator
    {
        return new DoctrinePaginator(
            $this->createQueryBuilder('a')
                ->where('a.deletionDetail IS NULL')
                ->andWhere('a.user = :user')
                ->setParameter('user', $user)
                ->addCriteria(
                    Criteria::create()
                        ->setFirstResult(($page - 1) * $itemsPerPage)
                        ->setMaxResults($itemsPerPage)
                )
        );
    }

    public function findValidAnnouncements(int   $page = 1,
                                           int   $itemsPerPage = 30,
                                           array $filters = [],
                                           ?bool $userLikes = false,
                                           ?int  $userId = null,
                                           ?bool $free = null,
                                           array $positiveFeatures = [],
                                           array $negativeFeatures = []
    ): DoctrinePaginator
    {
        $qb = $this->createQueryBuilder('a')
            ->where('a.isAccepted = :isAccepted AND a.deletionDetail IS NULL')
            ->setParameter('isAccepted', true);

        $joinAnnouncementDetail = !empty($filters['search']) || $free !== null || isset($filters['features']);
        if ($joinAnnouncementDetail) {
            $qb->leftJoin('a.announcementDetail', 'ad');
        }

        // SEARCH
        if (!empty($filters['search'])) {
            $qb->andWhere('ad.name LIKE :search OR ad.locality LIKE :search OR ad.description LIKE :search OR ad.kind LIKE :search')
                ->setParameter('search', '%' . $filters['search'] . '%');
        }

        // FAVOURITE (or not)
        if ($userId !== null) {
            $qb->leftJoin('a.announcementLikes', 'al', 'WITH', 'al.user = :userId')
                ->setParameter('userId', $userId);

            if ($userLikes === true) {
                $qb->andWhere('al.id IS NOT NULL');
            } elseif ($userLikes === false) {
                $qb->andWhere('al.id IS NULL')
                    ->andWhere('a.user != :userId'); // Do not show announcements belonging to the current user
            }
        }

        // FREE
        if ($free !== null) {
            $qb->andWhere($free === false ? 'ad.price IS NOT NULL' : 'ad.price IS NULL');
        }

        // ANIMAL FEATURES
        if (!empty($filters['features'])) {
            $qb->leftJoin('ad.announcementAnimalFeatures', 'aaf');
            $conditions = [];
            foreach (explode(',', $filters['features']) as $filter) {
                list($featureId, $isPositive) = explode('-', $filter);
                $condition = $qb->expr()->andX(
                    $qb->expr()->eq('aaf.feature', ':feature' . $featureId),
                    $qb->expr()->eq('aaf.isPositive', ':isPositive' . $featureId)
                );
                $qb->setParameter('feature' . $featureId, $featureId)
                    ->setParameter('isPositive' . $featureId, $isPositive);
                $conditions[] = $condition;
            }
            if (!empty($conditions)) {
                $qb->andWhere($qb->expr()->orX(...$conditions));
            }
        }

        $qb->addCriteria(
            Criteria::create()
                ->setFirstResult(($page - 1) * $itemsPerPage)
                ->setMaxResults($itemsPerPage)
        );

        return new DoctrinePaginator($qb);
    }


    public function findAnnouncementsWithUnacceptedReports(int $page = 1, int $itemsPerPage = 30): DoctrinePaginator
    {
        return new DoctrinePaginator(
            $this->createQueryBuilder('a')
                ->leftJoin('a.announcementReports', 'ar')
                ->where('a.deletionDetail IS NULL AND ar.isAccepted IS NULL')
                ->groupBy('a.id')
                ->having('COUNT(ar.id) > 0')
                ->addCriteria(
                    Criteria::create()
                        ->setFirstResult(($page - 1) * $itemsPerPage)
                        ->setMaxResults($itemsPerPage)
                )
        );
    }

    public function findUnacceptedAnnouncements(int $page = 1, int $itemsPerPage = 30): DoctrinePaginator
    {
        // Announcements only with upload
        return new DoctrinePaginator(
            $this->createQueryBuilder('a')
                ->leftJoin('a.uploads', 'au')
                ->where('a.deletionDetail IS NULL')
                ->andWhere('a.isAccepted = :isAccepted')
                ->andWhere('au.id IS NOT NULL')
                ->setParameter('isAccepted', false)
                ->addCriteria(
                    Criteria::create()
                        ->setFirstResult(($page - 1) * $itemsPerPage)
                        ->setMaxResults($itemsPerPage)
                )
        );
    }

}
