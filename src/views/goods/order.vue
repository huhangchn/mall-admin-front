<template>
  <div>
    <div class="filter-container app-container">
      <el-input v-model="orderId" placeholder="订单编号" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-input v-model="username" placeholder="用户名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-select filterable v-model="orderStatus" placeholder="订单状态" clearable class="filter-item" style="width: 200px">
        <el-option v-for="(item, index) in statusOptions" :key="index" :label="item.name" :value="item.id"/>
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
    </div>

      <div slot="content">
        <div v-loading="loading" element-loading-text="加载中..." v-if="orderList.length" style="min-height: 10vw;">
          <div v-for="(item,i) in orderList" :key="i">
            <div class="gray-sub-title cart-title">
              <div class="first">
                <div>
                  <span class="date" v-text="item.createDate"></span>
                  <span class="order-id"> 订单号： <a @click="orderDetail(item.orderId)">{{item.orderId}}</a> </span>
                </div>
                <div class="f-bc">
                  <span class="price">单价</span>
                  <span class="num">数量</span>
                  <span class="operation">商品操作</span>
                </div>
              </div>
              <div class="last">
                <span class="sub-total">实付金额</span>
                <span class="order-detail"> <a @click="orderDetail(item.orderId)">查看详情 ><em class="icon-font"></em></a> </span>
              </div>
            </div>
            <div class="pr">
              <div class="cart" v-for="(good,j) in item.goodsList" :key="j">
                <div class="cart-l" :class="{bt:j>0}">
                  <div class="car-l-l">
                    <div class="img-box"><a @click="goodsDetails(good.productId)"><img :src="good.productImg" alt=""></a></div>
                    <div class="ellipsis">
                      <a style="color: #626262;" @click="goodsDetails(good.productId)">{{good.productName}}</a>
                      <ul class="attribute">
                        <li style="color: #6b95ea">{{good.skuAttr}}</li>
                      </ul>
                    </div>
                  </div>
                  <div class="cart-l-r">
                    <div>¥ {{Number(good.salePrice).toFixed(2)}}</div>
                    <div class="num">{{good.productNum}}</div>
                    <div class="type">
                      <div v-if="j<1&&(item.orderStatus === '1')">
                        <el-button @click="handleSendOrder(i, item.orderId)" type="primary" size="small">发货</el-button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="cart-r">
                  <div class="prod-operation pa" style="right: 0;top: 0;">
                    <div class="total">¥ {{item.orderTotal}}</div>
                    <div class="status" v-if="j<1"> {{getOrderStatus(item.orderStatus)}}  </div>
                    <div v-if="j>=1" class="status"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-loading="loading" element-loading-text="加载中..." class="no-info" v-else>
          <div style="padding: 100px 0;text-align: center">
            未查询到订单
          </div>
        </div>
      </div>
    <div style="float:right">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import { orderList, sendOrder } from '@/api/order'
  import YShelf from './shelf'
  export default {
    data () {
      return {
        orderId: undefined,
        username: undefined,
        orderStatus: undefined,
        orderList: [0],
        userId: '',
        statusOptions: [
          {
            id: 0,
            name: '待付款'
          },
          {
            id: 1,
            name: '待发货'
          },
          {
            id: 2,
            name: '待收货'
          },
          {
            id: 3,
            name: '交易完成'
          },
          {
            id: 6,
            name: '交易取消'
          }
        ],
        loading: true,
        currentPage: 1,
        pageSize: 5,
        total: 0
      }
    },
    methods: {
      message (m) {
        this.$message.error({
          message: m
        })
      },
      handleSizeChange (val) {
        this.pageSize = val
        this._orderList()
      },
      handleCurrentChange (val) {
        this.currentPage = val
        this._orderList()
      },
      handleFilter(){
        this._orderList()
      },
      handleSendOrder (index, orderId) {
        console.log(index, orderId)
        let params = {
          orderId: orderId
        }
        sendOrder(params).then(data => {
          let code = data.code
          if(code === 100000){
            this.orderList[index].orderStatus = 2
            this.$message({
              message: '发货成功',
              type: 'success'
            })
          }
        })
      },
      goodsDetails (skuId) {
        // window.open(window.location.origin + '#/goodsDetails?skuId=' + skuId)
      },
      orderDetail (orderId) {
        // this.$router.push({
        //   path: 'orderDetail',
        //   query: {
        //     orderId: orderId
        //   }
        // })
      },
      getOrderStatus (status) {
        if (status === '0') {
          return '待付款'
        } else if (status === '1') {
          return '待发货'
        } else if (status === '2') {
          return '待收货'
        } else if (status === '3') {
          return '交易成功'
        } else if (status === '4') {
          return '交易关闭'
        } else if (status === '5') {
          return '支付失败'
        }else if (status === '6') {
          return '交易取消'
        }

      },
      _orderList () {
        this.loading = true
        let params = {
          orderId: this.orderId,
          username: this.username,
          size: this.pageSize,
          page: this.currentPage,
          orderStatus: this.orderStatus
        }
        orderList(params).then(data => {
          this.orderList = data.data.data
          this.total = data.data.total
          this.loading = false
        })
      },
    },
    created () {
      // this.userId = getStore('userId')
      this._orderList()
    },
    components: {
      YShelf
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../assets/style/mixin";

  .gray-sub-title {
    height: 38px;
    padding: 0 24px;
    background: #EEE;
    border-top: 1px solid #DBDBDB;
    border-bottom: 1px solid #DBDBDB;
    line-height: 38px;
    font-size: 12px;
    color: #666;
    display: flex;
    span {
      display: inline-block;
      height: 100%;
    }
    .first {
      display: flex;
      justify-content: space-between;
      flex: 1;
      .f-bc {
        > span {
          width: 112px;
          text-align: center;
        }
      }
    }
    .last {
      width: 230px;
      text-align: center;
      display: flex;
      border-left: 1px solid #ccc;
      span {
        flex: 1;
      }
    }
  }

  .bt {
    border-top: 1px solid #EFEFEF;
  }

  .date {
    padding-left: 0px;
  }

  .order-id {
    margin-left: 25px;
  }

  .cart {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;
    &:hover {
      .del-order {
        display: block;
      }
    }
    .del-order {
      display: none;
    }
    .cart-l {
      display: flex;
      align-items: center;
      flex: 1;
      padding: 15px 0;
      justify-content: space-between;
      position: relative;
      &:before {
        position: absolute;
        content: ' ';
        right: -1px;
        top: 0;
        width: 1px;
        background-color: #EFEFEF;
        height: 100%;
      }
      .ellipsis {
        margin-left: 20px;
        width: 220px;
      }
      .img-box {
        border: 1px solid #EBEBEB;
      }
      img {
        display: block;
        @include wh(80px);
      }
      .cart-l-r {
        display: flex;
        > div {
          text-align: center;
          width: 112px;
        }
      }
      .car-l-l {
        display: flex;
        align-items: center;
      }
    }
    .cart-r {
      width: 230px;
      display: flex;
      span {
        text-align: center;
        flex: 1;
      }
    }
  }

  .prod-operation {
    height: 110px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 254px;
    div {
      width: 100%;
      text-align: center;
    }
    div:last-child {
      padding-right: 24px;
    }
  }
</style>
