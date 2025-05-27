import React, { useState } from 'react';
import { Card, Button, message, Modal } from 'antd';
import { SafetyOutlined, CameraOutlined } from '@ant-design/icons';
import './index.css';

const Verify = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  
  // 获取当前用户信息
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

  const handleNormalOperation = () => {
    // 记录普通操作
    const logs = JSON.parse(localStorage.getItem('logs') || '[]');
    
    logs.push({
      userId: currentUser.id,
      type: 'normal',
      timestamp: new Date().toISOString(),
      faceVerified: 'none',
      result: true
    });
    
    localStorage.setItem('logs', JSON.stringify(logs));
    message.success('成功执行一次普通操作');
  };

  const handleCoreOperation = () => {
    // 检查用户类型
    if (currentUser.role !== 'core') {
      message.error('您不是核心用户，无法执行核心操作！');
      return;
    }
    setIsModalVisible(true);
  };

  const handleFaceVerification = () => {
    setIsVerifying(true);
    
    // TODO: 这里需要实现实际的人脸验证逻辑
    // 暂时直接模拟验证成功
    setTimeout(() => {
      const logs = JSON.parse(localStorage.getItem('logs') || '[]');
      
      logs.push({
        userId: currentUser.id,
        type: 'core',
        timestamp: new Date().toISOString(),
        faceVerified: true,
        result: true
      });
      
      localStorage.setItem('logs', JSON.stringify(logs));
      
      message.success('成功执行一次核心操作');
      
      setIsVerifying(false);
      setIsModalVisible(false);
    }, 1000);
  };

  return (
    <div className="verify-container">
      <Card title="操作面板" className="verify-card">
        <div className="operation-buttons">
          <Button 
            type="primary" 
            size="large"
            onClick={handleNormalOperation}
          >
            普通操作
          </Button>
          <Button 
            type="primary" 
            danger
            size="large"
            onClick={handleCoreOperation}
          >
            核心操作
          </Button>
        </div>
      </Card>

      <Modal
        title="人脸验证"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <div className="face-verification">
          <CameraOutlined className="camera-icon" />
          <p>请将脸部对准摄像头</p>
          <Button 
            type="primary"
            loading={isVerifying}
            onClick={handleFaceVerification}
          >
            开始验证
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Verify;
