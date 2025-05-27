import React, { useState } from 'react';
import { Form, Input, Button, Card, Radio, message, Modal } from 'antd';
import { UserOutlined, LockOutlined, CameraOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './index.css';

const Register = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);

  const onFinish = (values) => {
    // 存储用户信息
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const newUser = {
      id: Date.now().toString(),
      username: values.username,
      password: values.password,
      role: values.role,
      faceData: values.role === 'core' ? values.faceData : null,
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    message.success('注册成功！');
    navigate('/login');
  };

  const handleFaceCapture = () => {
    setIsCapturing(true);
    
    // TODO: 这里需要实现实际的人脸录入逻辑
    // 暂时直接模拟录入成功
    setTimeout(() => {
      form.setFieldsValue({ faceData: 'mock_face_data' });
      message.success('人脸信息录入成功！');
      setIsCapturing(false);
      setIsModalVisible(false);
    }, 1000);
  };

  return (
    <div className="register-container">
      <Card title="用户注册" className="register-card">
        <Form
          form={form}
          name="register"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名！' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="用户名" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码！' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="密码" />
          </Form.Item>

          <Form.Item
            name="confirm"
            dependencies={['password']}
            rules={[
              { required: true, message: '请确认密码！' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('两次输入的密码不一致！'));
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="确认密码" />
          </Form.Item>

          <Form.Item
            name="role"
            rules={[{ required: true, message: '请选择用户类型！' }]}
          >
            <Radio.Group>
              <Radio value="core">核心用户</Radio>
              <Radio value="normal">普通用户</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) => 
              prevValues.role !== currentValues.role
            }
          >
            {({ getFieldValue }) => 
              getFieldValue('role') === 'core' ? (
                <Form.Item
                  name="faceData"
                  rules={[{ required: true, message: '请录入人脸信息！' }]}
                >
                  <div className="face-registration">
                    <Button 
                      type="primary" 
                      icon={<CameraOutlined />}
                      onClick={() => setIsModalVisible(true)}
                    >
                      录入人脸信息
                    </Button>
                  </div>
                </Form.Item>
              ) : null
            }
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              注册
            </Button>
          </Form.Item>
          
          <div className="login-link">
            已有账号？ <a onClick={() => navigate('/login')}>立即登录</a>
          </div>
        </Form>
      </Card>

      <Modal
        title="人脸信息录入"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <div className="face-capture">
          <CameraOutlined className="camera-icon" />
          <p>请将脸部对准摄像头</p>
          <Button 
            type="primary"
            loading={isCapturing}
            onClick={handleFaceCapture}
          >
            开始录入
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Register;
