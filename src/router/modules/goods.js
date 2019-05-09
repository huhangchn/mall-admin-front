/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const goodsRouter = {
  path: '/goods',
  component: Layout,
  redirect: '/goods/goodsList',
  name: 'Goods',
  meta: {
    title: '商城管理',
    icon: 'table'
  },
  children: [
    {
      path: 'brand',
      component: () => import('@/views/goods/brandList/'),
      name: 'brandManager',
      meta: {title: '品牌列表'}
    },
    {
      path: 'category',
      component: () => import('@/views/goods/categoryList/'),
      name: 'categoryManager',
      meta: {title: '分类列表'}
    },
    {
      path: 'goodsList',
      component: () => import('@/views/goods/goodsList'),
      name: 'GoodsList',
      meta: {title: '商品列表'}
    },
    {
      path: 'goodsAdd',
      component: () => import('@/views/goods/goodsAdd'),
      name: 'GoodsAdd',
      meta: {title: '添加商品'}
    },
    {
      path: 'goodsEdit',
      component: () => import('@/views/goods/goodsEdit/'),
      name: 'GoodsEdit',
      meta: {title: '编辑商品'},
      hidden: true
    },
    {
      path: 'orderList',
      component: () => import('@/views/goods/orderList/'),
      name: 'OrderList',
      meta: {title: '订单管理'}
    }
  ]
}
export default goodsRouter
