<template>
  <order></order>
</template>

<script>
import order from './order'
import { fetchList, changeGoodsSaleStatus } from '@/api/goods'
import { fetchCategory } from '@/api/category'
import { fetchBrand } from '@/api/brand'
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination


export default {
  components: { Pagination, order },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        id: undefined,
        name: undefined,
        categoryId: undefined,
        brandId: undefined,
      },
      categoryOptions: [],
      brandOptions: [],
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(data => {
        this.list = data.data.list
        this.total = data.data.total
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 1000)
      })
    },
    handleFilter(){
      this.getList()
    },
    handleGoodsEdit(index, row){
      this.$router.push({path:'/goods/goodsEdit',query:{id:row.id}})
    },
    handleCreate(){
      this.$router.push({path:'/goods/goodsAdd'})
    },
    handleSaleStatusChange(index, row){
      let goodsId = row.id
      let isOnSale = row.isOnSale
      changeGoodsSaleStatus({goodsId, isOnSale}).then(data => {
        this.$message({
          message: '修改成功',
          type: 'success'
        })
      })
    }
  }
}

</script>
<style>
  .pic{
    width: 100%;
    height: 100%;
  }
</style>
