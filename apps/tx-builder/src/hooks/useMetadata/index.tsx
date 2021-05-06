import { useEffect, useState } from 'react';
import { Metadata } from './Metadata';

export enum Stage {
  Production = 'production',
  Staging = 'staging',
}

export default function useMetadata(stage: Stage): Metadata | null {
  const [metadata, setMetadata] = useState<Metadata | null>(null);

  useEffect(() => {
    async function fetchMetadata() {
      const url = `https://metadata.perp.exchange/${stage}.json`;
      const mt = await fetch(url).then((res) => res.json() as Promise<Metadata>);
      setMetadata(mt);
    }

    fetchMetadata();
  }, [stage]);

  return metadata;
}
