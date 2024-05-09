export interface HydraCollection<T> {
    '@context': string;
    '@id': string;
    '@type': 'hydra:Collection';
    'hydra:totalItems': number;
    'hydra:member': T[];
    'hydra:view'?: HydraView;
    'hydra:search'?: HydraSearch;
}

interface HydraView {
    '@id': string;
    '@type': 'hydra:PartialCollectionView';
}

interface HydraSearch {
    '@type': 'hydra:IriTemplate';
    'hydra:template': string;
    'hydra:variableRepresentation': string;
    'hydra:mapping': HydraMapping[];
}

interface HydraMapping {
    '@type': 'IriTemplateMapping';
    variable: string;
    property: string;
    required: boolean;
}
