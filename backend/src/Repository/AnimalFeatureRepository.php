<?php

namespace App\Repository;

use App\Entity\AnimalFeature;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<AnimalFeature>
 *
 * @method AnimalFeature|null find($id, $lockMode = null, $lockVersion = null)
 * @method AnimalFeature|null findOneBy(array $criteria, array $orderBy = null)
 * @method AnimalFeature[]    findAll()
 * @method AnimalFeature[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class AnimalFeatureRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, AnimalFeature::class);
    }

    //    /**
    //     * @return AnimalFeature[] Returns an array of AnimalFeature objects
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

    //    public function findOneBySomeField($value): ?AnimalFeature
    //    {
    //        return $this->createQueryBuilder('a')
    //            ->andWhere('a.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}
