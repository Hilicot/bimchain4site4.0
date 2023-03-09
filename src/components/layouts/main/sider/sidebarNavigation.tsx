import React from 'react';
import {
  LayoutOutlined, ProfileOutlined, SisternodeOutlined, UserOutlined,
} from '@ant-design/icons';

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
    icon: <ProfileOutlined />,
  },
  {
    title: 'common.users',
    key: 'users',
    url: '/users',
    icon: <UserOutlined />,
  },
  {
    title: 'pageTitle.gantt',
    key: 'gantt',
    url: '/gantt',
    icon: <SisternodeOutlined />,
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
