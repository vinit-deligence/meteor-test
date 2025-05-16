import React from 'react';
import { Layout, Typography } from 'antd';
import { Users } from './Users.jsx';
import { Files } from './Files.jsx';

const { Header, Content } = Layout;
const { Title } = Typography;

export const App = () => (
  <Layout>
    <Header style={{ background: '#fff', padding: '0 20px' }}>
      <Title level={2} style={{ margin: '16px 0' }}>Welcome to FileNest!</Title>
    </Header>
    <Content style={{ padding: '20px' }}>
      <Users />
      <Files />
    </Content>
  </Layout>
);
