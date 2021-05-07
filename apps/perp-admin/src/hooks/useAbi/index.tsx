import { useEffect, useState } from 'react';

export default function useAbi(contractName: string): any {
  const [abi, setAbi] = useState(null);
  useEffect(() => {
    async function fetchAbi() {
      try {
        const json = await fetch(`/artifacts/${contractName}.json`).then((res) => res.json());
        if (json.abi) {
          setAbi(json.abi);
        }
      } catch {
        setAbi(null);
      }
    }

    fetchAbi();
  }, [contractName]);

  return abi;
}
