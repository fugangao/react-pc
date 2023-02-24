import React, { useState, useEffect } from 'react'
import { useStore } from '@/store'
import { observer } from 'mobx-react-lite'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import './layOut.scss'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  FormOutlined,
  BarChartOutlined,
  FileDoneOutlined,
  UserOutlined,
  QuestionCircleOutlined,
  LoginOutlined
} from '@ant-design/icons'
import { Layout, Menu, theme, Avatar, Space, Popconfirm } from 'antd'

const { Header, Sider, Content } = Layout

function LayOut () {
  const { userStore, loginStore } = useStore()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  const routeChange = ({ item, key, keyPath, domEvent }) => {
    navigate(key)
  }
  //副作用加载数据用户信息
  useEffect(() => {
    userStore.getUserInfo()
  }, [userStore])
  //确认退出
  const confirmLogOut = () => {
    loginStore.logOut()
    navigate('/login')
  }
  return (
    <Layout className='layout'>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[pathname]}
          onSelect={routeChange}
          items={[
            {
              key: '/',
              icon: <BarChartOutlined />,
              label: '数据概览',
            },
            {
              key: '/article',
              icon: <FileDoneOutlined />,
              label: '内容管理',
            },
            {
              key: '/publish',
              icon: <FormOutlined />,
              label: '发布文章',
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0, background: colorBgContainer, display: 'flex', justifyContent: 'space-between' }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
          <div className='userInfo'>
            <Space direction="vertical" size={16}>
              <Space wrap size={16}>
                <Avatar icon={<UserOutlined />} src='http://geek.itheima.net/images/user_head.jpg' />
              </Space>
            </Space>
            <Popconfirm
              title="退出登录"
              description="确定要退出登录吗?"
              okText="确定"
              cancelText="取消"
              onConfirm={confirmLogOut}
              icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            >
              <span>{userStore.userInfo.name}</span>
              <LoginOutlined className='logOut' twoToneColor="#52c41a" />
            </Popconfirm>

          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default observer(LayOut)