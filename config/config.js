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
            component: 'Helloworld',
          },
          {
            path: '/helloworld',
            component: 'Helloworld'
          },
          {
            path: '/dashboard',
            routes: [
              { path: '/dashboard/analysis', component: 'Dashboard/Analysis' },
              { path: '/dashboard/monitor', component: 'Dashboard/Monitor' },
              { path: '/dashboard/workplace', component: 'Dashboard/Workplace' }
            ]
          },
        ]
      }]
};