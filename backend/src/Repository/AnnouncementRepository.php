<?php

namespace App\Repository;

use App\Entity\Announcement;
use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Collections\Criteria;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\ORM\Tools\Pagination\Paginator as DoctrinePaginator;

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

    public function findUserAnnouncements(int $page = 1, int $itemsPerPage = 30, User $user): DoctrinePaginator
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

    public function findValidAnnouncements(int $page = 1, int $itemsPerPage = 30): DoctrinePaginator
    {
       return new DoctrinePaginator(
            $this->createQueryBuilder('a')
                ->where('a.isAccepted = :isAccepted AND a.deletionDetail IS NULL')
                ->setParameter('isAccepted', true)
                ->addCriteria(
                    Criteria::create()
                        ->setFirstResult(($page - 1) * $itemsPerPage)
                        ->setMaxResults($itemsPerPage)
                )
        );
    }

    public function findAnnouncementsWithUnacceptedReports(int $page = 1, int $itemsPerPage = 30): DoctrinePaginator
    {
        return new DoctrinePaginator(
            $this->createQueryBuilder('a')
                ->leftJoin('a.announcementReports', 'ar')
                ->where('a.deletionDetail IS NULL AND (ar.isAccepted = :isAccepted OR ar.isAccepted IS NULL)')
                ->orWhere()
                ->setParameter('isAccepted', false)
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
