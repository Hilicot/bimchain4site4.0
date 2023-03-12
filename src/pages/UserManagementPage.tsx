import React from 'react';
import { Row } from 'antd';
import * as S from '@app/pages/UIComponentsPage.styles';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import * as SF from './FilesPage.styles';

const UserManagementPage: React.FC = () => {
  return (
    <>
      <PageTitle>Users</PageTitle>
      <Row>
      <SF.LeftSideCol xl={16} xxl={17} id="desktop-content">
        
      </SF.LeftSideCol>

      <SF.RightSideCol xl={8} xxl={7}>
        <S.BoundedCard title={'Upload Files'}  >
        </S.BoundedCard>
      </SF.RightSideCol>
    </Row>
    </>
  );
};

export default UserManagementPage;
