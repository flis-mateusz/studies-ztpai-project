<?php
namespace App\OpenApi;

use ApiPlatform\OpenApi\Factory\OpenApiFactoryInterface;
use ApiPlatform\OpenApi\Model\MediaType;
use ApiPlatform\OpenApi\Model\Operation;
use ApiPlatform\OpenApi\Model\PathItem;
use ApiPlatform\OpenApi\Model\RequestBody;
use ApiPlatform\OpenApi\OpenApi;
use ApiPlatform\OpenApi\Model;
use Symfony\Component\HttpFoundation\Response;

class OpenApiFactory implements OpenApiFactoryInterface
{

    public function __construct(private OpenApiFactoryInterface $decorated)
    {
    }

    public function __invoke(array $context = []): OpenApi
    {
        $openApi = $this->decorated->__invoke($context);
//        $pathItem = $openApi->getPaths()->addPath('/api/grumpy_pizzas/{id}');
//        $operation = $pathItem->getGet();
//
//        $operation = new Operation();
//        $pathItem = new PathItem();
//        $openApi->getPaths()->addPath('/api/check_in', $pathItem->withGet(
//            $operation->withOperationId('checkin')
//            ->withTags(['Login Check'])
//            ->withResponses([
//                Response::HTTP_OK => [
//                    'description' => 'User token created',
//                    'content' => [
//                        'application/json' => [
//                            'schema' => new Model(ref: '#/components/schemas/User')
//                        ],
//                    ],
//                ],
//            ])
//            ->withSummary('Creates a user token.')
//            ->withDescription('Creates a user token.')
//        ));

//        $openApi = $openApi->withServers([new Model\Server('/api')]);

        return $openApi;
    }
}