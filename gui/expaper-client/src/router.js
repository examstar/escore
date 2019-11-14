import Vue from 'vue'
import Router from 'vue-router'
import index from './views/index.vue'
import register from './views/Register.vue'
import login from './views/login.vue'
import notfound from './views/404.vue'
import expapercreate from './views/ExpaperCreate.vue'
import expaperlist from './views/ExpaperList.vue'
import userlist from './views/infopages/userslist.vue'
import testpage from './views/testpage.vue'
import excreate from './views/ExCreate.vue'
import Home from './views/Home.vue'
import InfoShow from './views/InfoShow.vue'

import mypaper from './views/ExCreate2.vue'
import exedit from './views/ExEdit.vue'
import operating from './views/OperaList.vue'
import uplodeimg from './views/Utils/UplodeImg.vue'

import cuttingcanvas from './views/Utils/CuttingCanvas.vue'

Vue.use(Router);

const router =new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/index',
    },
    {
      path: '/index',
      name: 'index',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component:index,
      children:[
        {path:'',component:Home,},
        {path:'/home',name:"Home",component:Home,},
        {path:'/InfoShow',name:"InfoShow",component:InfoShow,},
        {path:'/expaperlist',name:"expaperlist",component:expaperlist,},
        {path:'/operating',name:"operating",component:operating,},
        {path:'/uplodeimg',name:"uplodeimg",component:uplodeimg,},
        {path:'/expapercreate',name:"expapercreate",component:expapercreate,},
        {path:'/mypaper',name:"mypaper",component:mypaper,},
        {path:'/exedit:id',name:"exedit",component:exedit,},
        {path:'/cuttingcanvas:id',name:"cuttingcanvas",component:cuttingcanvas,},
        {path:'/userslist',name:"userlist",component:userlist,},

      ]
    },{
      path: '/register',
      name: 'register',
      component:register
    },{
      path: '/login',
      name: 'login',
      component:login
    },{
      path: '/expapercreate',
      name: 'expapercreate',
      component:expapercreate
    },{
      path: '/mypaper',
      name: 'mypaper',
      component:mypaper
    },{
      path: '/excreate',
      name: 'excreate',
      component:excreate
    }
    ,{
      path: '/expaperlist',
      name: 'expaperlist',
      component:expaperlist
    },
    {
      path:'/exedit:id',
      name:"exedit",
      component:exedit}
    ,{
      path: '/testpage',
      name: 'testpage',
      component:testpage
    }
    ,{
      path: '*',
      name: '/404',
      component:notfound
    },
  ]
});

// 添加路由守卫
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.eleToken ? true : false;
  if (to.path == "/login" || to.path == "/register"||to.path.startsWith("/usertest")) {
    next();
  } else {
    isLogin ? next() : next("/login");
  }
});

export default router;
