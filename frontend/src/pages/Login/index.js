import React from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './index.css';

const Login = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    // 获取用户列表
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.username === values.username && u.password === values.password);
    
    if (user) {
      // 设置登录状态
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('currentUser', JSON.stringify(user));
      message.success('登录成功！');
      navigate('/app/profile');
    } else {
      message.error('用户名或密码错误！');
    }
  };

  return (
    <div className="login-container">
      <Card title="用户登录" className="login-card">
        <Form
          name="login"
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

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              登录
            </Button>
          </Form.Item>
          
          <div className="register-link">
            还没有账号？ <a onClick={() => navigate('/register')}>立即注册</a>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
