import React from 'react';
import { Layout, Typography } from 'antd';
import { Hello } from './Hello.jsx';
import { Info } from './Info.jsx';
import { Users } from './Users.jsx';

const { Header, Content } = Layout;
const { Title } = Typography;

export const App = () => (
  <Layout>
    <Header style={{ background: '#fff', padding: '0 20px' }}>
      <Title level={2} style={{ margin: '16px 0' }}>Welcome to Meteor!</Title>
    </Header>
    <Content style={{ padding: '20px' }}>
      <Users />
      <Hello/>
      <Info/>
    </Content>
  </Layout>
);
