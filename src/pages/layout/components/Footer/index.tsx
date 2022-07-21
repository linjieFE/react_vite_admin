import React from 'react';
import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';

export default () => (
  <DefaultFooter
    copyright="2022 Flexiv"
    links={[
      {
        key: 'Flexiv',
        title: 'Flexiv',
        blankTarget: true,
        href: '',
      },
      {
        key: '云管理平台',
        title: '云管理平台',
        blankTarget: true,
        href: '',
      },
    ]}
  />
);
