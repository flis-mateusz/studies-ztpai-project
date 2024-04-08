<?php

namespace App\Repository;

use App\Entity\AnnouncementLike;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<AnnouncementLike>
 *
 * @method AnnouncementLike|null find($id, $lockMode = null, $lockVersion = null)
 * @method AnnouncementLike|null findOneBy(array $criteria, array $orderBy = null)
 * @method AnnouncementLike[]    findAll()
 * @method AnnouncementLike[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class AnnouncementLikeRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, AnnouncementLike::class);
    }

    //    /**
    //     * @return AnnouncementLike[] Returns an array of AnnouncementLike objects
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

    //    public function findOneBySomeField($value): ?AnnouncementLike
    //    {
    //        return $this->createQueryBuilder('a')
    //            ->andWhere('a.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}
