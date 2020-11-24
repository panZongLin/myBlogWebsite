//测试一下admin权限
import React from 'react';

import { Card, Alert } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { FormattedMessage } from 'umi';

export default () => (
  <PageHeaderWrapper content="">
    <Card>
      <Alert
        message={<FormattedMessage id="Admin.Alert.message" />}
        type="success"
        showIcon
        banner
        style={{
          margin: -12,
          marginBottom: 48,
        }}
      />
    </Card>
  </PageHeaderWrapper>
);
