import React from 'react';
import { Layout, Menu, Button } from 'antd';
import { 
  UserOutlined, 
  SafetyOutlined, 
  LogoutOutlined 
} from '@ant-design/icons';
import { Link, useNavigate, Outlet, Navigate } from 'react-router-dom';
import './MainLayout.css';

const { Header, Content, Footer } = Layout;

const MainLayout = () => {
  const navigate = useNavigate();
  
  // 检查是否已登录
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  // 如果未登录，重定向到登录页
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  return (
    <Layout className="layout">
      <Header className="header">
        <div className="logo">人脸验证系统</div>
        <Menu 
          theme="dark" 
          mode="horizontal" 
          className="menu"
          defaultSelectedKeys={['profile']}
        >
          <Menu.Item key="profile" icon={<UserOutlined />}>
            <Link to="/app/profile">个人信息</Link>
          </Menu.Item>
          <Menu.Item key="verify" icon={<SafetyOutlined />}>
            <Link to="/app/verify">操作</Link>
          </Menu.Item>
        </Menu>
        <Button 
          type="text" 
          icon={<LogoutOutlined />} 
          onClick={handleLogout}
          className="logout-button"
        >
          退出登录
        </Button>
      </Header>
      <Content className="content">
        <div className="site-layout-content">
          <Outlet />
        </div>
      </Content>
      <Footer className="footer">
        人脸验证系统 ©2024
      </Footer>
    </Layout>
  );
};

export default MainLayout;
