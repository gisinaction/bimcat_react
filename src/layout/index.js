// 注意这里我们除了从antd中引入了Layout布局组件，还引入了Menu菜单组件，Icon图标组件

import { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import Link from 'umi/link';


const { Header, Footer, Sider, Content } = Layout;

// 引入子菜单组件
const SubMenu = Menu.SubMenu; 

export default class BasicLayout extends Component {
  render() {
    return (
      <Layout>
        <Sider width={256} style={{ minHeight: '100vh' }}>
        <div style={{ height: '32px', background: 'rgba(255,255,255,.2)', margin: '16px'}}/>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
            <Link to="/index">
                <Icon type="pie-chart" />
                <span>3D模型</span>
            </Link>
            </Menu.Item>
            <SubMenu
            key="sub1"
            title={<span><Icon type="workspace" /><span>工作区域</span></span>}
            >
                <Menu.Item key="11"><Link to="/workspace/managemodel">模型管理</Link></Menu.Item>
                <Menu.Item key="12"><Link to="/workspace/managework">工作管理</Link></Menu.Item>
                <Menu.Item key="13"><Link to="/workspace/manageprocess">流程管理</Link></Menu.Item>
            </SubMenu>
            <SubMenu
            key="sub2"
            title={<span><Icon type="system" /><span>系统管理</span></span>}
            >
                <Menu.Item key="21"><Link to="/system/user">用户管理</Link></Menu.Item>
                <Menu.Item key="22"><Link to="/system/role">角色管理</Link></Menu.Item>
                <Menu.Item key="23"><Link to="/system/log">系统日志</Link></Menu.Item>
            </SubMenu>
        </Menu>
        </Sider>
        <Layout >
          <Header style={{ background: '#fff', textAlign: 'center', padding: 0 }}>BIMCAT</Header>
          <Content style={{ margin: '24px 16px 0' }}>
            <div style={{ padding: 24, background: '#fff', height: "100%" }}>
              {this.props.children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>BIMCAT ©2020 Created by niuge8905</Footer>
        </Layout>
      </Layout>
    )
  }
}