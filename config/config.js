export default {
    singular: true,
    history:'hash', //保留刷新前的配置
    plugins: [
        ['umi-plugin-react', {
            antd: true
        }],
      ],
      routes: [{
        path: '/',
        component: '../layout',
        routes: [
          {
            path: '/',
            component: 'index',
          },
          {
            path: '/index',
            component: 'index'
          },
          {
            path: '/workspace',
            routes: [
              { path: '/workspace/managemodel', component: 'Workspace/ManageModel' },
              { path: '/workspace/managework', component: 'Workspace/ManageWork' },
              { path: '/workspace/manageprocess', component: 'Workspace/ManageProcess' }
            ]
          },
          {
            path: '/system',
            routes: [
              { path: '/system/user', component: 'System/User' },
              { path: '/system/role', component: 'System/Role' },
              { path: '/system/log', component: 'System/Log' }
            ]
          },
        ]
      }]
};