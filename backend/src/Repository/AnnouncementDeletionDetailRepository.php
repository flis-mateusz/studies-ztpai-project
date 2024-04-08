<?php

namespace App\Repository;

use App\Entity\AnnouncementDeletionDetail;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<AnnouncementDeletionDetail>
 *
 * @method AnnouncementDeletionDetail|null find($id, $lockMode = null, $lockVersion = null)
 * @method AnnouncementDeletionDetail|null findOneBy(array $criteria, array $orderBy = null)
 * @method AnnouncementDeletionDetail[]    findAll()
 * @method AnnouncementDeletionDetail[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class AnnouncementDeletionDetailRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, AnnouncementDeletionDetail::class);
    }

//    /**
//     * @return AnnouncementDeletionDetail[] Returns an array of AnnouncementDeletionDetail objects
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

//    public function findOneBySomeField($value): ?AnnouncementDeletionDetail
//    {
//        return $this->createQueryBuilder('a')
//            ->andWhere('a.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
