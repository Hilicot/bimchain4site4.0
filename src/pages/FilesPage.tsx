import React from 'react';
import { Row } from 'antd';
import { useState, useEffect } from 'react';
import * as S from '@app/pages/UIComponentsPage.styles';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { FileTable } from '@app/components/files-page/FileTable';
import * as SF from './FilesPage.styles';
import { FileProxy, FileStatus } from "@app/components/files-page/file-handling-utils";
import Blockchain from '@app/blockchain/Blockchain';
import BlockchainManager from '@app/blockchain/BlockchainManager';
import NFTStorageBlockchain from '@app/blockchain/IPFS/NFTStorageBlockchain';
import { IFCviewerModal } from '@app/components/ifc/IFCviewerModal';
import UploadFile from '@app/components/files-page/UploadFile';
import { Spinner } from '@app/components/common/Spinner/Spinner';
import * as ST from '@app/components/common/Table/Table.styles';

const FilesPage: React.FC = () => {
  const [files, setFiles] = useState<FileProxy[]>([]);
  const [chain, setChain] = useState<Blockchain>(new NFTStorageBlockchain);
  const [loadingFiles, setLoadingFiles] = useState<boolean>(false);
  const [reload, setReload] = useState<boolean>(false);
  const [viewedIFCfile, setViewedIFCfile] = useState<FileProxy | null>(null);
  const BM = new BlockchainManager("NFT.Storage");


  useEffect(() => {
    const getData = async () => {
      setLoadingFiles(true);
      // add blockchain object
      await BM.init()
      setChain(BM.getBlockchain());

      // add data to table
      // TODO remove fake data
      // const fake_data = await getFakeTreeTableData()
      // let res = fake_data;
      const remoteFiles = await chain.fetchRemoteFiles()
      setFiles(oldFiles => {
        const localFiles = oldFiles.filter((file) => file.status !== FileStatus.ON_CHAIN);
        return [...remoteFiles, ...localFiles];
      })
      setLoadingFiles(false);
    }
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  // TODO #4 add reload button (Or check if user has to login in MetaMask and reload when that is done)

  const desktopLayout = (
    <Row>
      <SF.LeftSideCol xl={16} xxl={17} id="desktop-content">
        <Spinner spinning={loadingFiles} >
          {false ? // TODO decide wheter to keep 1 or 2 tables
            <FileTable type={"ignore"} data={files} setData={setFiles} chain={chain} setViewedIFCfile={setViewedIFCfile} setReload={setReload}/>
            :
            <><ST.Card title="Certified files" padding="1.25rem 1.25rem 0">
              <FileTable type={"on_chain"} data={files} setData={setFiles} chain={chain} setViewedIFCfile={setViewedIFCfile} setReload={setReload}/>
            </ST.Card>
              <ST.Card title="Local files" padding="1.25rem 1.25rem 0">
                <FileTable type={"local"} data={files} setData={setFiles} chain={chain} setViewedIFCfile={setViewedIFCfile} setReload={setReload}/>
              </ST.Card>
            </>}
        </Spinner>
        <IFCviewerModal viewedIFCfile={viewedIFCfile} setViewedIFCfile={setViewedIFCfile} />
      </SF.LeftSideCol>

      <SF.RightSideCol xl={8} xxl={7}>
        <S.BoundedCard title={'Upload Files'}  >
          <UploadFile setFiles={setFiles} />
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
