import { createElement } from 'react';
import {
  TwitchOutlined,
  LogoutOutlined,
  HomeOutlined,
  PlusSquareOutlined,
  PlusCircleOutlined,
  QuestionCircleOutlined,
  ProjectOutlined,
} from '@ant-design/icons';
import type { Session } from 'next-auth';
import type { MenuProps } from 'antd';

import { template } from '@/utils/strings';
import { ROUTES } from '@/constants/routes';
import { MAP_WIDGET_TYPE_TO_ICON_COMPONENT } from '@/constants/widgets';
import translations from '@/translations';

import LogIn from './LogIn';
import LogOut from './LogOut';
import Item from './Item';

const { sidebar: t } = translations;

export const getItems = (session: Session | null): MenuProps['items'] => {
  const faqItem = {
    key: 'faq',
    icon: createElement(QuestionCircleOutlined),
    label: createElement(Item, { title: t.faq, href: ROUTES.FAQ }),
  };

  if (!session?.user) {
    return [
      faqItem,
      {
        key: 'login',
        icon: createElement(TwitchOutlined),
        label: createElement(LogIn),
      }
    ];
  }

  return [
    {
      key: 'home',
      icon: createElement(HomeOutlined),
      label: createElement(Item, { title: t.home, href: ROUTES.HOME }),
    },

    {
      key: 'goals',
      icon: createElement(PlusSquareOutlined),
      label: t.goals.title,
      children: [
        {
          key: 'create_opposite',
          icon: createElement(MAP_WIDGET_TYPE_TO_ICON_COMPONENT.opposite),
          label: createElement(Item, {
            title: t.goals.opposite,
            href: template(ROUTES.OPPOSITE, { id: '' }),
          }),
        },
        {
          key: 'create_clock',
          icon: createElement(MAP_WIDGET_TYPE_TO_ICON_COMPONENT.clock),
          label: createElement(Item, {
            title: t.goals.clock,
            href: template(ROUTES.CLOCK, { id: '' }),
          }),
        },
        {
          key: 'create_circle',
          icon: createElement(MAP_WIDGET_TYPE_TO_ICON_COMPONENT.circle),
          label: createElement(Item, {
            title: t.goals.circle,
            href: template(ROUTES.CIRCLE, { id: '' }),
          }),
        },
        {
          key: 'create_oscilloscope',
          icon: createElement(MAP_WIDGET_TYPE_TO_ICON_COMPONENT.oscilloscope),
          label: createElement(Item, {
            title: t.goals.oscilloscope,
            href: template(ROUTES.OSCILLOSCOPE, { id: '' }),
          }),
        },
      ],
    },
    {
      key: 'alerts',
      icon: createElement(PlusCircleOutlined),
      label: t.alerts.title,
      children: [
        {
          key: 'create_lss',
          icon: createElement(MAP_WIDGET_TYPE_TO_ICON_COMPONENT.lss),
          label: createElement(Item, {
            title: t.alerts.lss,
            href: template(ROUTES.LSS, { id: '' }),
          }),
        },
      ],
    },
    {
      key: 'crs',
      icon: createElement(ProjectOutlined),
      label: t.crs.title,
      children: [
        {
          key: 'create_cr',
          icon: createElement(MAP_WIDGET_TYPE_TO_ICON_COMPONENT.cr),
          label: createElement(Item, {
            title: t.crs.cr,
            href: template(ROUTES.CR, { id: '' }),
          }),
        },
        {
          key: 'create_cr_alert',
          icon: createElement(MAP_WIDGET_TYPE_TO_ICON_COMPONENT.crAlert),
          label: createElement(Item, {
            title: t.crs.crAlert,
            href: template(ROUTES.CR_ALERT, { id: '' }),
          }),
        },
      ],
    },

    faqItem,
    {
      key: 'logout',
      icon: createElement(LogoutOutlined),
      label: createElement(LogOut),
    }
  ];
};
