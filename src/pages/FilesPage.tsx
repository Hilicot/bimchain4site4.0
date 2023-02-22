import React from 'react';
import { Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import * as S from '@app/pages/UIComponentsPage.styles';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { FileTable } from '@app/components/files-page/FileTable';
import { UploadDragger } from '@app/components/common/Upload/Upload';
import { DraggerIconWrapper, DraggerTitle, DraggerDescription } from './FilesPage.styles';
import * as SF from './FilesPage.styles';
import { FileProxy } from "@app/components/files-page/file-handling-utils";
import Blockchain from '@app/blockchain/Blockchain';
import BlockchainManager from '@app/blockchain/BlockchainManager';
import NFTStorageBlockchain from '@app/blockchain/IPFS/NFTStorageBlockchain';
import { IFCviewerModal } from '@app/components/ifc/IFCviewerModal';

const FilesPage: React.FC = () => {
  const { t } = useTranslation();
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

  const uploadProps = {
    name: 'file',
    multiple: true,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    customRequest: (options: any) => {
      const file = options.file;
      const row = FileProxy.fromFile(file);
      setFiles([...files, row])
    },
    showUploadList: false
  };

  const desktopLayout = (
    <Row>
      <SF.LeftSideCol xl={16} xxl={17} id="desktop-content">
        <FileTable data={files} setData={setFiles} chain={chain} setViewedIFCfile={setViewedIFCfile} />
        <IFCviewerModal viewedIFCfile={viewedIFCfile} setViewedIFCfile={setViewedIFCfile} />
      </SF.LeftSideCol>

      <SF.RightSideCol xl={8} xxl={7}>
        <S.BoundedCard title={'Upload Files'}  >
          <UploadDragger {...uploadProps}>
            <DraggerIconWrapper>
              <InboxOutlined />
            </DraggerIconWrapper>
            <DraggerTitle>{t('uploads.dragUpload')}</DraggerTitle>
            <DraggerDescription>{"Multiple files are allowed"}</DraggerDescription>
          </UploadDragger>

          {/*<DropZone data={files} setData={setFiles}/>*/}
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
