import React from 'react';
import { Card, Typography } from 'antd';
import './index.css';

const { Title } = Typography;

const Logs = () => {
  return (
    <Card>
      <Title level={2}>操作日志</Title>
      <p>这里是操作日志页面的内容</p>
    </Card>
  );
};

export default Logs;
