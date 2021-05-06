import { Metadata } from '../useMetadata/Metadata';

export interface ContractInfo {
  key: string;
  name: string;
  address: string;
}

export enum Layer {
  Layer1 = 'layer1',
  Layer2 = 'layer2',
}

export default function useContractList(metadata: Metadata | null, layer: Layer): ContractInfo[] {
  if (metadata) {
    return Object.entries(metadata.layers[layer].contracts).map(([key, contractMetadata]) => ({
      key,
      name: contractMetadata.name,
      address: contractMetadata.address,
    }));
  } else {
    return [];
  }
}
