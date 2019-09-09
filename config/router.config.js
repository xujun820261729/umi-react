/***
 * 路由地址配置
 * @description
 * 1,路由权限控制暂时分为admin 和 user 两种类型;
 * 2,路由可参考umijs的路由参考
 * 3,authority数组指定用户的权限
 * @author xj
 */
export default [
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/login',
      },
    ],
  },
  {
    path: '/',
    component: '../layouts/SecurityLayout',
    routes: [
      {
        path: '/',
        component: '../layouts/BasicLayout',
        authority: ['admin', 'user'],
        routes: [
          {
            path: '/',
            redirect: '/form',
          },
          {
            path: '/form',
            icon: 'form',
            name: 'form',
            routes: [
              {
                name: 'basic-form',
                path: '/form/basic-form',
                component: './form/basic-form',
              },
            ],
          },

        ],
      },

    ],
  },
]
