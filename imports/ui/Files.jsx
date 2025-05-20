import React, { useState, useEffect } from 'react';
import { useFind, useSubscribe } from 'meteor/react-meteor-data';
import { FilesCollection, FileTypes } from '../api/files';
import { Tabs, Card, Typography, Image, Button, Spin, Tag } from 'antd';
import { FileImageOutlined, FilePdfOutlined, LinkOutlined } from '@ant-design/icons';
import { Meteor } from 'meteor/meteor';
import { isAdmin, isViewer } from '../api/rolesDefinations';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const FileCard = ({ file, canAccess }) => {
  const renderFileContent = () => {
    if (!canAccess) {
      return (
        <div>
          <Text type="secondary">Preview not available for your role</Text>
        </div>
      );
    }

    switch (file.type) {
      case FileTypes.IMAGE:
        return (
          <div>
            <Image
              src={file.url}
              alt={file.name}
              style={{ maxHeight: '200px', objectFit: 'cover' }}
            />
            <div style={{ marginTop: '8px' }}>
              <Tag color="blue">{file.metadata.format.toUpperCase()}</Tag>
              <Text type="secondary">{(file.metadata.size / (1024 * 1024)).toFixed(2)} MB</Text>
            </div>
          </div>
        );
      case FileTypes.PDF:
        return (
          <div>
            <FilePdfOutlined style={{ fontSize: '48px', color: '#ff4d4f' }} />
            <div style={{ marginTop: '8px' }}>
              <Tag color="red">PDF</Tag>
              <Text type="secondary">{(file.metadata.size / (1024 * 1024)).toFixed(2)} MB</Text>
            </div>
          </div>
        );
      case FileTypes.URL:
        return (
          <div>
            <LinkOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
            <div style={{ marginTop: '8px' }}>
              <Tag color="green">URL</Tag>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card
      title={file.name}
      style={{ marginBottom: '16px' }}
      extra={
        canAccess && (
          <Button type="link" href={file.url} target="_blank">
            Open
          </Button>
        )
      }
    >
      {renderFileContent()}
      <div style={{ marginTop: '16px' }}>
        <Text type="secondary">{file.metadata.description}</Text>
        <br />
        <Text type="secondary" style={{ fontSize: '12px' }}>
          Created: {file.createdAt.toLocaleDateString()}
        </Text>
      </div>
    </Card>
  );
};

export const Files = () => {
  const [canAccess, setCanAccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const isLoadingFiles = useSubscribe('files');
  const files = useFind(() => FilesCollection.find());

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const userId = Meteor.userId();
        const [adminStatus, viewerStatus] = await Promise.all([
          isAdmin(userId),
          isViewer(userId)
        ]);
        setCanAccess(adminStatus || viewerStatus);
      } catch (error) {
        console.error('Error checking access:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAccess();
  }, []);

  if (isLoading) {
    return <Spin size="large" />;
  }

  const filesByType = {
    [FileTypes.IMAGE]: files.filter(file => file.type === FileTypes.IMAGE),
    [FileTypes.PDF]: files.filter(file => file.type === FileTypes.PDF),
    [FileTypes.URL]: files.filter(file => file.type === FileTypes.URL)
  };

  return (
    <Card style={{ marginBottom: '20px' }}>
      <Title level={3}>Files</Title>
      <Tabs defaultActiveKey={FileTypes.IMAGE}>
        <TabPane
          tab={
            <span>
              <FileImageOutlined />
              Images ({filesByType[FileTypes.IMAGE].length})
            </span>
          }
          key={FileTypes.IMAGE}
        >
          {filesByType[FileTypes.IMAGE].map(file => (
            <FileCard key={file._id} file={file} canAccess={canAccess} />
          ))}
        </TabPane>
        <TabPane
          tab={
            <span>
              <FilePdfOutlined />
              PDFs ({filesByType[FileTypes.PDF].length})
            </span>
          }
          key={FileTypes.PDF}
        >
          {filesByType[FileTypes.PDF].map(file => (
            <FileCard key={file._id} file={file} canAccess={canAccess} />
          ))}
        </TabPane>
        <TabPane
          tab={
            <span>
              <LinkOutlined />
              URLs ({filesByType[FileTypes.URL].length})
            </span>
          }
          key={FileTypes.URL}
        >
          {filesByType[FileTypes.URL].map(file => (
            <FileCard key={file._id} file={file} canAccess={canAccess} />
          ))}
        </TabPane>
      </Tabs>
    </Card>
  );
}; 