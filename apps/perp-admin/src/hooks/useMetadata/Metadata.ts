export interface ContractMetadata {
    name: string
    address: string
}

export interface Contracts {
    [key: string]: ContractMetadata
}

export interface ExternalContracts {
    [key: string]: string
}

export interface Layer {
    contracts: Contracts
    accounts: any[]
    network: string
    externalContracts: ExternalContracts
}

export interface Layers {
    layer1: Layer
    layer2: Layer
}

export interface Metadata {
    layers: Layers
}