<?php

namespace App\Repository;

use App\Entity\AnnouncementAnimalFeature;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<AnnouncementAnimalFeature>
 *
 * @method AnnouncementAnimalFeature|null find($id, $lockMode = null, $lockVersion = null)
 * @method AnnouncementAnimalFeature|null findOneBy(array $criteria, array $orderBy = null)
 * @method AnnouncementAnimalFeature[]    findAll()
 * @method AnnouncementAnimalFeature[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class AnnouncementAnimalFeatureRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, AnnouncementAnimalFeature::class);
    }

    //    /**
    //     * @return AnnouncementAnimalFeature[] Returns an array of AnnouncementAnimalFeature objects
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

    //    public function findOneBySomeField($value): ?AnnouncementAnimalFeature
    //    {
    //        return $this->createQueryBuilder('a')
    //            ->andWhere('a.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}
