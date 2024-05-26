<?php

namespace App\CustomFilter;

use ApiPlatform\Doctrine\Orm\Filter\AbstractFilter;
use ApiPlatform\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use ApiPlatform\Metadata\Operation;
use Doctrine\ORM\QueryBuilder;

class CustomSearchFilter extends AbstractFilter
{
    protected function filterProperty(string                      $property,
                                                                  $value,
                                      QueryBuilder                $queryBuilder,
                                      QueryNameGeneratorInterface $queryNameGenerator,
                                      string                      $resourceClass,
                                      Operation                   $operation = null,
                                      array                       $context = []
    ): void
    {
        if (
            !$this->isPropertyEnabled($property, $resourceClass)
        ) {
            return;
        }

        $parameterName = $queryNameGenerator->generateParameterName($property);

        if ($property === 'search') {
            $queryBuilder
                ->leftJoin('o.announcementDetail', 'ad')
                ->andWhere('ad.name LIKE :search OR ad.locality LIKE :search OR ad.description LIKE :search OR ad.kind LIKE :search')
                ->setParameter('search', '%' . $value . '%');
        }
    }

    public function getDescription(string $resourceClass): array
    {
        if (!$this->properties) {
            return [];
        }

        $description = [];
        foreach ($this->properties as $property => $unused) {
            $description[$property] = [
                'property' => $property,
                'type' => 'string',
                'required' => false,
                'is_collection' => false
            ];
        }

        return $description;
    }
}
