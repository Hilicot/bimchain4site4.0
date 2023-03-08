import React from 'react';
import {
  LayoutOutlined, UserOutlined,
} from '@ant-design/icons';
import { ReactComponent as NftIcon } from '@app/assets/icons/nft-icon.svg';

export interface SidebarNavigationItem {
  title: string;
  key: string;
  url?: string;
  children?: SidebarNavigationItem[];
  icon?: React.ReactNode;
}

export const sidebarNavigation: SidebarNavigationItem[] = [
  {
    title: 'pageTitle.filesPage',
    key: 'files-page',
    url: '/',
    icon: <NftIcon />,
  },
  {
    title: 'common.users',
    key: 'users',
    url: '/users',
    icon: <UserOutlined />,
  },
  {
    title: 'pageTitle.pages',
    key: 'pages',
    icon: <LayoutOutlined />,
    children: [
      {
        title: 'pageTitle.serverError',
        key: 'serverError',
        url: '/server-error',
      },
      {
        title: 'pageTitle.clientError',
        key: '404Error',
        url: '/404',
      },
    ],
  }
];
