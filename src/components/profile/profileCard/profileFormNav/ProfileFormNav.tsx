import React from 'react';
import { Notifications } from './nav/notifications/Notifications/Notifications';
import { PersonalInfo } from './nav/PersonalInfo/PersonalInfo';

interface ProfileFormNavProps {
  menu: string;
}

export const ProfileFormNav: React.FC<ProfileFormNavProps> = ({ menu }) => {
  let currentMenu;

  switch (menu) {
    case 'info': {
      currentMenu = <PersonalInfo />;
      break;
    }

    case 'notifications': {
      currentMenu = <Notifications />;
      break;
    }

    default: {
      currentMenu = null;
    }
  }

  return currentMenu;
};
