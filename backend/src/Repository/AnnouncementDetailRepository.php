<?php

namespace App\Repository;

use App\Entity\AnnouncementDetail;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<AnnouncementDetail>
 *
 * @method AnnouncementDetail|null find($id, $lockMode = null, $lockVersion = null)
 * @method AnnouncementDetail|null findOneBy(array $criteria, array $orderBy = null)
 * @method AnnouncementDetail[]    findAll()
 * @method AnnouncementDetail[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class AnnouncementDetailRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, AnnouncementDetail::class);
    }

    //    /**
    //     * @return AnnouncementDetail[] Returns an array of AnnouncementDetail objects
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

    //    public function findOneBySomeField($value): ?AnnouncementDetail
    //    {
    //        return $this->createQueryBuilder('a')
    //            ->andWhere('a.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}
