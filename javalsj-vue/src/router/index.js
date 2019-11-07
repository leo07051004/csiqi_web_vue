import Vue from 'vue'
import Router from 'vue-router'
import BlogLogin from '@/components/manage/BlogLogin.vue'
import BlogIndex from '@/components/home/BlogIndex.vue'
import AcAdd from '@/components/home/AcAdd.vue'
import AcView from '@/components/home/AcView.vue'
import SmsPage from '@/components/sms/SmsPage.vue'
import SmsUserList from '@/components/sms/SmsUserList.vue'
import SmsList from '@/components/sms/SmsList.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/index',
      name: 'BlogIndex',
      component: BlogIndex
    },
    {
      path: '/manage',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'BlogLogin',
      component: BlogLogin
    },
    {
      path: '/acAdd',
      name: 'AcAdd',
      component: AcAdd
    },
    {
      path: '/acView',
      name: 'AcView',
      component: AcView
    },
    {
      path: '/smsPage',
      name: 'SmsPage',
      component: SmsPage
    },
    {
      path: '/smsUserList',
      name: 'SmsUserList',
      component: SmsUserList
    },
    {
      path: '/smsList',
      name: 'SmsList',
      component: SmsList
    },
  ]
})
