import { createElement } from 'react';
import {
  TwitchOutlined,
  LogoutOutlined,
  HomeOutlined,
  PlusSquareOutlined,
  BoxPlotFilled,
  ClockCircleOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import type { Session } from 'next-auth';
import type { MenuProps } from 'antd';

import { template } from '@/utils/strings';
import { ROUTES } from '@/constants/routes';
import translations from '@/translations';

import LogIn from './LogIn';
import LogOut from './LogOut';
import Item from './Item';

const { sidebar: t } = translations;

export const getItems = (session: Session | null): MenuProps['items'] => {
  if (!session?.user) {
    return [{
      key: 'login',
      icon: createElement(TwitchOutlined),
      label: createElement(LogIn),
    }];
  }

  return [
    {
      key: 'home',
      icon: createElement(HomeOutlined),
      label: createElement(Item, { title: t.home, href: ROUTES.HOME }),
    },
    {
      key: 'create',
      icon: createElement(PlusSquareOutlined),
      label: t.create.title,
      children: [
        {
          key: 'create_opposite',
          icon: createElement(BoxPlotFilled),
          label: createElement(Item, {
            title: t.create.opposite,
            href: template(ROUTES.OPPOSITE, { id: '' }),
          }),
        },
        {
          key: 'create_clock',
          icon: createElement(ClockCircleOutlined),
          label: createElement(Item, {
            title: t.create.clock,
            href: template(ROUTES.CLOCK, { id: '' }),
          }),
        },
        {
          key: 'create_circle',
          icon: createElement(PieChartOutlined),
          label: createElement(Item, {
            title: t.create.circle,
            href: template(ROUTES.CIRCLE, { id: '' }),
          }),
        },
      ],
    },
    {
      key: 'logout',
      icon: createElement(LogoutOutlined),
      label: createElement(LogOut),
    }
  ];
};
