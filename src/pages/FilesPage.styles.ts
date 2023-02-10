import styled from 'styled-components';
import { Col } from 'antd';
import { LAYOUT, media } from '@app/styles/themes/constants';
import { FONT_SIZE, FONT_WEIGHT } from '@app/styles/themes/constants';

export const RightSideCol = styled(Col)`
  padding: ${LAYOUT.desktop.paddingVertical} ${LAYOUT.desktop.paddingHorizontal};
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  height: calc(100vh - ${LAYOUT.desktop.headerHeight});
  background-color: var(--sider-background-color);
  overflow-y: auto;
`;

export const LeftSideCol = styled(Col)`
  @media only screen and ${media.xl} {
    padding: ${LAYOUT.desktop.paddingVertical} ${LAYOUT.desktop.paddingHorizontal};
    height: calc(100vh - ${LAYOUT.desktop.headerHeight});
    overflow: auto;
  }
`;

export const Space = styled.div`
  margin: 1rem 0;
`;

export const ScrollWrapper = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  min-height: 250px;

  .ant-card-body {
    overflow-y: auto;
    overflow-x: hidden;
    height: 100%;
  }
`;

export const BlockWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  gap: 15px;

  background: black;

  min-height: 300px;
  overflow-y: auto;
`;

export const Item = styled.div`
  background: red;
  height: 150px;
  flex-shrink: 0;
`;

export const DraggerIconWrapper = styled.div`
  font-size: 4rem;
  color: var(--primary-color);
`;

export const DraggerTitle = styled.div`
  font-size: ${FONT_SIZE.xl};
  font-weight: ${FONT_WEIGHT.bold};
`;

export const DraggerDescription = styled.div`
  font-size: ${FONT_SIZE.md};
  padding: 0 1rem;
`;