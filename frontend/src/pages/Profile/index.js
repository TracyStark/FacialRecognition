import React from 'react';
import { Card, Typography, Table, Tag } from 'antd';
import { UserOutlined, HistoryOutlined } from '@ant-design/icons';
import './index.css';

const { Title } = Typography;

const Profile = () => {
  // 获取当前用户信息
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  
  // 获取操作日志
  const logs = JSON.parse(localStorage.getItem('logs') || '[]')
    .filter(log => log.userId === currentUser.id);

  const columns = [
    {
      title: '时间',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (text) => new Date(text).toLocaleString()
    },
    {
      title: '操作类型',
      dataIndex: 'type',
      key: 'type',
      render: (type) => (
        <Tag color={type === 'core' ? 'red' : 'blue'}>
          {type === 'core' ? '核心操作' : '普通操作'}
        </Tag>
      )
    },
    {
      title: '人脸识别',
      dataIndex: 'faceVerified',
      key: 'faceVerified',
      render: (verified) => {
        if (verified === 'none') {
          return <Tag color="default">无</Tag>;
        }
        return verified ? (
          <Tag color="green">成功</Tag>
        ) : (
          <Tag color="red">失败</Tag>
        );
      }
    },
    {
      title: '操作结果',
      dataIndex: 'result',
      key: 'result',
      render: (result) => (
        <Tag color={result ? 'green' : 'red'}>
          {result ? '成功' : '失败'}
        </Tag>
      )
    }
  ];

  return (
    <div className="profile-container">
      <Card className="user-info-card">
        <Title level={2}>
          <UserOutlined /> 个人信息
        </Title>
        <div className="user-info">
          <p><strong>用户ID：</strong>{currentUser.id}</p>
          <p>
            <strong>用户类型：</strong>
            <Tag color={currentUser.role === 'core' ? 'red' : 'blue'}>
              {currentUser.role === 'core' ? '核心用户' : '普通用户'}
            </Tag>
          </p>
        </div>
      </Card>

      <Card className="logs-card">
        <Title level={2}>
          <HistoryOutlined /> 操作日志
        </Title>
        <Table 
          columns={columns} 
          dataSource={logs}
          rowKey="timestamp"
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );
};

export default Profile;
