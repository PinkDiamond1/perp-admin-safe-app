import { Title, Select } from '@gnosis.pm/safe-react-components';
import React, { useState, useEffect } from 'react';
import { useSafeAppsSDK } from '@gnosis.pm/safe-apps-react-sdk';
import styled from 'styled-components';

import { ContractInterface } from '../hooks/useServices/interfaceRepository';
import useServices from '../hooks/useServices';
import { Builder } from './Builder';
import useMetadata, { Stage } from '../hooks/useMetadata';
import { SelectItem } from '@gnosis.pm/safe-react-components/dist/inputs/Select';
import useContractList, { Layer } from '../hooks/useContractList';
import useAbi from '../hooks/useAbi';

const Wrapper = styled.div`
  display: flex;
  justify-content: left;
  flex-direction: column;
  padding: 24px;
  width: 520px;
`;

const StyledTitle = styled(Title)`
  margin-top: 0px;
  margin-bottom: 5px;
`;

const StyledSelect = styled(Select)`
  width: 520px;
  margin-bottom: 5px;
`;

const Dashboard = () => {
  const { safe } = useSafeAppsSDK();
  const services = useServices(safe.network);
  const [contract, setContract] = useState<ContractInterface | null>(null);
  const [stage, setStage] = useState<Stage>(Stage.Production);
  const [layer, setLayer] = useState<Layer>(Layer.Layer2);
  const [contractName, setContractName] = useState<string>('');
  const [contractAddress, setContractAddress] = useState<string>('');
  const abi = useAbi(contractName);
  const metadata = useMetadata(stage);
  const contractList = useContractList(metadata, layer);
  const stageItems = [Stage.Production, Stage.Staging].map((stage) => ({ id: stage, label: stage }));
  const layerItems = [Layer.Layer1, Layer.Layer2].map((layer) => ({ id: layer, label: layer }));
  const contractItems: SelectItem[] = contractList.map((contractInfo) => ({
    id: contractInfo.address,
    label: `${contractInfo.key} - ${contractInfo.address}`,
  }));

  const onStageSelect = (strStage: string) => {
    if (strStage !== Stage.Production && strStage !== Stage.Staging) {
      throw new Error('stage not found');
    }
    setStage(strStage);
  };

  const onLayerSelect = (strLayer: string) => {
    if (strLayer !== Layer.Layer1 && strLayer !== Layer.Layer2) {
      throw new Error('layer not found');
    }
    setLayer(strLayer);
    setContractName('');
    setContractAddress('');
  };

  const onContractSelect = (contractAddress: string) => {
    const contractInfo = contractList.find((contractInfo) => contractInfo.address === contractAddress);

    if (contractInfo) {
      setContractName(contractInfo.name);
      setContractAddress(contractInfo.address);
    }
  };

  useEffect(() => {
    async function loadContract() {
      if (!abi || !services.web3 || !services.interfaceRepo) {
        return;
      }

      try {
        const contract = await services.interfaceRepo.loadAbi(JSON.stringify(abi));
        setContract(contract);
      } catch (e) {
        setContract(null);
        console.error(e);
      }
    }

    loadContract();
  }, [abi, stage, services.interfaceRepo, services.web3]);

  return (
    <Wrapper>
      <StyledTitle size="sm">Perpetual Protocol Admin UI</StyledTitle>

      <StyledSelect items={stageItems} activeItemId={stage} onItemClick={onStageSelect}></StyledSelect>
      <StyledSelect items={layerItems} activeItemId={layer} onItemClick={onLayerSelect}></StyledSelect>
      <StyledSelect items={contractItems} activeItemId={contractAddress} onItemClick={onContractSelect}></StyledSelect>

      {/* Builder */}
      {contractAddress && contract && <Builder contract={contract} to={contractAddress} />}
    </Wrapper>
  );
};

export default Dashboard;
