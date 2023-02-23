import React from 'react';
import { Row } from 'antd';
import { useState, useEffect } from 'react';
import * as S from '@app/pages/UIComponentsPage.styles';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { FileTable } from '@app/components/files-page/FileTable';
import * as SF from './FilesPage.styles';
import { FileProxy } from "@app/components/files-page/file-handling-utils";
import Blockchain from '@app/blockchain/Blockchain';
import BlockchainManager from '@app/blockchain/BlockchainManager';
import NFTStorageBlockchain from '@app/blockchain/IPFS/NFTStorageBlockchain';
import { IFCviewerModal } from '@app/components/ifc/IFCviewerModal';
import UploadFile from '@app/components/files-page/UploadFile';

const FilesPage: React.FC = () => {
  const [files, setFiles] = useState<FileProxy[]>([]);
  const [chain, setChain] = useState<Blockchain>(new NFTStorageBlockchain);
  const [viewedIFCfile, setViewedIFCfile] = useState<FileProxy | null>(null);
  const BM = new BlockchainManager("NFT.Storage");


  useEffect(() => {
    const getData = async () => {
      // add blockchain object
      await BM.init()
      setChain(BM.getBlockchain());

      // add data to table
      // TODO remove fake data
      // const fake_data = await getFakeTreeTableData()
      // let res = fake_data;
      setFiles(await chain.fetchRemoteFiles())
    }
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  

  const desktopLayout = (
    <Row>
      <SF.LeftSideCol xl={16} xxl={17} id="desktop-content">
        <FileTable type={"on_chain"} data={files} setData={setFiles} chain={chain} setViewedIFCfile={setViewedIFCfile} />
        <FileTable type={"local"} data={files} setData={setFiles} chain={chain} setViewedIFCfile={setViewedIFCfile} />
        <IFCviewerModal viewedIFCfile={viewedIFCfile} setViewedIFCfile={setViewedIFCfile} />
      </SF.LeftSideCol>

      <SF.RightSideCol xl={8} xxl={7}>
        <S.BoundedCard title={'Upload Files'}  >
          <UploadFile files={files} setFiles={setFiles} />
        </S.BoundedCard>
      </SF.RightSideCol>
    </Row>
  );

  return (
    <>
      <PageTitle>NFT Dashboard</PageTitle>
      {desktopLayout}
    </>
  );
};

export default FilesPage;
