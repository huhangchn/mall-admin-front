/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const goodsRouter = {
  path: '/goods',
  component: Layout,
  redirect: '/goods/goodsList',
  name: 'Goods',
  meta: {
    title: '商品',
    icon: 'table'
  },
  children: [
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
    }
  ]
}
export default goodsRouter
