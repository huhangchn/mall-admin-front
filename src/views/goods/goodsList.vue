<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.number" placeholder="商品编号" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-input v-model="listQuery.name" placeholder="商品名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>

      <category :object="listQuery"/>
      <brand :object="listQuery"/>

      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">添加</el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;">
      <el-table-column v-if="false" label="商品ID" prop="id" align="center" width="100px">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品编号" prop="id" align="center" width="100px">
        <template slot-scope="scope">
          <span>{{ scope.row.number }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品名称" min-width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品图片" width="110px" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.picUrl" class="pic">
        </template>
      </el-table-column>
      <el-table-column label="画廊" width="110px" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.gallery" class="pic">
        </template>
      </el-table-column>
      <el-table-column label="状态" class-name="status-col" width="150px">
        <template slot-scope="scope">
          <p>上架：
            <el-switch
              v-model="scope.row.isOnSale"
              @change="handleSaleStatusChange(scope.$index, scope.row)"/>
          </p>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" @click.native.prevent="handleGoodsEdit(scope.$index, scope.row)">查看/编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

  </div>
</template>

<script>
import category from './components/category'
import brand from './components/brand'
import { fetchPv, createArticle, updateArticle } from '@/api/article'
import { fetchList, changeGoodsSaleStatus } from '@/api/goods'
import { fetchCategory } from '@/api/category'
import { fetchBrand } from '@/api/brand'
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination


export default {
  components: { Pagination, category, brand },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        number: undefined,
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
