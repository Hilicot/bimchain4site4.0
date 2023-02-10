import React from 'react';
import { Row } from 'antd';
import { useTranslation } from 'react-i18next';
import {  useState, useEffect } from 'react';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import * as S from '@app/pages/uiComponentsPages//UIComponentsPage.styles';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { FileTable } from '@app/components/files-page/FileTable';
import { UploadDragger } from '@app/components/common/Upload/Upload';
import { DraggerIconWrapper, DraggerTitle, DraggerDescription } from './FilesPage.styles';
import DropZone from '@app/components/files-page/DropZone';
import * as SF from './FilesPage.styles';
import { getFakeTreeTableData, TreeTableRow } from '@app/components/files-page/FileTable';
import { FileTreeTableRow } from "@app/components/files-page/file-handling-utils";

const FilesPage: React.FC = () => {
  const { t } = useTranslation();

  const [files, setFiles] = useState<TreeTableRow[]>([]);

  // TODO remove fake data
  useEffect(() => {
    getFakeTreeTableData().then((res) => {
      setFiles(res);
    });
  }, []);

  const uploadProps = {
    name: 'file',
    multiple: true,
    customRequest: (options: any) => {
      let file = options.file;
      const row = new FileTreeTableRow(file);
      setFiles([...files, row])
    },
    showUploadList:false
  };

  const desktopLayout = (
    <Row>
      <SF.LeftSideCol xl={16} xxl={17} id="desktop-content">
        <Row gutter={[60, 60]}>
          <FileTable data={files} setData={setFiles}/>
        </Row>

      </SF.LeftSideCol>

      <SF.RightSideCol xl={8} xxl={7}>
        <S.Card title={'Upload Files'}  >
          <UploadDragger {...uploadProps}>
            <DraggerIconWrapper>
              <InboxOutlined />
            </DraggerIconWrapper>
            <DraggerTitle>{t('uploads.dragUpload')}</DraggerTitle>
            <DraggerDescription>{"Multiple files are allowed"}</DraggerDescription>
          </UploadDragger>
          
          {/*<DropZone data={files} setData={setFiles}/>*/}
        </S.Card>
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
