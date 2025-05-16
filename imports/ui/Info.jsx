import React from 'react';
import { useFind, useSubscribe } from 'meteor/react-meteor-data';
import { LinksCollection } from '../api/links';
import { Card, List, Typography, Spin } from 'antd';

const { Title } = Typography;

export const Info = () => {
  const isLoading = useSubscribe('links');
  const links = useFind(() => LinksCollection.find());

  if(isLoading()) {
    return <Spin size="large" />;
  }

  return (
    <Card>
      <Title level={3}>Learn Meteor!</Title>
      <List
        dataSource={links}
        renderItem={link => (
          <List.Item>
            <a href={link.url} target="_blank" rel="noopener noreferrer">
              {link.title}
            </a>
          </List.Item>
        )}
      />
    </Card>
  );
};
