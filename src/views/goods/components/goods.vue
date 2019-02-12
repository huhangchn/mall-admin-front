<template>
  <div>
    <el-steps :active="active" finish-status="success" simple style="margin-top: 20px">
      <el-step title="基本信息" />
      <el-step title="基本属性" />
      <el-step title="销售属性" />
      <el-step title="商品详情" />
    </el-steps>
    <div class="info">
      <goodsBasicInfo v-show="active===0" :goodsInfo="goodsInfo"/>
      <goodsBasicAttr v-show="active===1" :goodsInfo="goodsInfo"/>
      <goodsSaleInfo v-show="active===2" :goodsInfo="goodsInfo"/>
      <goodsDetail v-show="active===3" :goodsInfo="goodsInfo"/>
    </div>
    <div class="button">
      <el-button v-show="active>0" @click="previous">上一步</el-button>
      <el-button v-show="active<3" @click="next">下一步</el-button>
      <el-button type="primary" v-show="active===3" @click.native.prevent="fished" :disabled="adding">完成</el-button>
    </div>
  </div>
</template>

<script>
import goodsBasicInfo from './goodsBasicInfo'
import goodsSaleInfo from './goodsSaleInfo'
import goodsBasicAttr from './goodsBasicAttr'
import goodsDetail from './goodsDetail'
import {addOrUpdateGoods, fetchGoodsInfo} from '@/api/goods'
export default {
  components: {
    goodsSaleInfo,
    goodsBasicInfo,
    goodsBasicAttr,
    goodsDetail
  },
  props: {
    edit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      active: 0,
      goodsInfo: {
        name: null,
        categoryId: null,
        brandId: null,
        brief: null,
        price: null,
        picUrl: null,
        gallery: "",
        detail: null,
        isOnSale: false,
        basicValueId: [],
        skuList: []
      },
      adding: false
    }
  },
  created() {
    if(this.edit){
      fetchGoodsInfo(this.$route.query.id).then(response=>{
        this.goodsInfo=response.data;
      });
    }
  },
  methods: {
    next() {
      if (this.active < 3) this.active++
    },
    previous() {
      if (this.active > 0) this.active--
    },
    fished(){
      this.$confirm('确认 添加/修改 该商品吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.adding = true
        const {edit} = this
        addOrUpdateGoods(Object.assign({}, this.goodsInfo), {edit}).then(() => {
          this.$message({
            message: '添加成功',
            type: 'success',
            duration: 1000
          })
        }).catch(error => {
          this.$message({
            message: '添加失败',
            type: 'warning',
            duration: 1000
          })
        })
      })
    }
  }
}
</script>

<style>
  .button{
    text-align: center;
    margin-top: 50px;
  }
  .info{
    width: 700px;
    margin: 50px auto 0;
  }
</style>
