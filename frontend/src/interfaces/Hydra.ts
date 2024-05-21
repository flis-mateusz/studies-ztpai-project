export interface IHydraCollection<T> {
    '@context': string;
    '@id': string;
    '@type': 'hydra:Collection';
    'hydra:totalItems': number;
    'hydra:member': T[];
    'hydra:view'?: IHydraView;
    'hydra:search'?: IHydraSearch;
}

interface IHydraView {
    '@id': string;
    '@type': 'hydra:PartialCollectionView';
}

interface IHydraSearch {
    '@type': 'hydra:IriTemplate';
    'hydra:template': string;
    'hydra:variableRepresentation': string;
    'hydra:mapping': IHydraMapping[];
}

interface IHydraMapping {
    '@type': 'IriTemplateMapping';
    variable: string;
    property: string;
    required: boolean;
}

export interface IHydraExtension {
    "@context": "string"
    "@id": "string"
    "@type": "string"
}

export type IHydraIRI = string