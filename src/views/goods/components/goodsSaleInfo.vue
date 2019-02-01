<template>
  <el-form label-width="100px">
    <el-card shadow="never" class="cardBg">
      <el-form-item label="款式">
        <el-checkbox-group v-model="styleGroup">
          <el-checkbox v-for="(shoeStyle, index) in styleOptions" :label="shoeStyle" :key="index"
                       class="littleMarginLeft">
            {{shoeStyle}}
            <el-button type="text" class="littleMarginLeft" @click.native.prevent="removeStyle(index)">删除</el-button>
          </el-checkbox>
        </el-checkbox-group>
        <el-input style="width: 160px;margin-left: 10px" clearable v-model="newStyle" placeholder="自定义款式"></el-input>
        <el-button class="littleMarginLeft" @click="addStyle()" @keyup.enter="addStyle()">增加</el-button>
      </el-form-item>

      <el-form-item label="尺码">
        <el-checkbox-group v-model="shoeSizeGroup">
          <el-checkbox v-for="(shoeSize, index) in shoeSizeOptions" :label="shoeSize.size" :key="index" class="littleMarginLeft">
            {{shoeSize.size}}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item align="right">
        <el-button  type="primary" @click.native.prevent="addSku">添加组合</el-button>
        <el-button  type="danger" @click.native.prevent="clearSkuList">清空所有</el-button>
      </el-form-item>
    </el-card>

    <el-table
      :data="skuList"
      border
      style="width: 100%; margin-top: 20px">
      <el-table-column prop="goodsId" label="款式" align="center">
        <template slot-scope="scope">
          <el-input placeholder="请输入款式" v-model="scope.row.name" clearable :disabled="true"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="shoeSizeValue" align="center" label="尺码">
        <template slot-scope="scope">
          <el-input placeholder="请输入尺码" clearable v-model="scope.row.shoeSize" :disabled="true"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="price" align="center" label="销售价格">
        <template slot-scope="scope">
          <el-input placeholder="请输入价格" clearable v-model="scope.row.price"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="store" align="center" label="商品库存">
        <template slot-scope="scope">
          <el-input placeholder="请输入库存" clearable v-model="scope.row.store"></el-input>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="danger" icon="el-icon-delete" circle
                     @click.native.prevent="removeSku(scope.$index)"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-form>
</template>

<script>
  import {fetchShoeSizeOptions} from '@/api/shoeSize'

  export default {
    props: {
      goodsInfo: {
        type: Object
      }
    },
    data() {
      return {
        shoeSizeOptions: [],
        styleOptions: ["红色", "绿色", "蓝色", "黄色"],
        shoeSizeGroup: [],
        styleGroup: [],
        newStyle: ""
      }
    },
    computed:{
      skuList(){
        return this.goodsInfo.skuList
      }
    },
    created() {
      this.getShoeSizeOptions()
    },
    methods: {
      getShoeSizeOptions() {
        fetchShoeSizeOptions().then(res => {
          this.shoeSizeOptions = res.data
        })
      },
      addStyle() {
        const newStyle = this.newStyle.trim()
        if (!newStyle) {
          this.$message({
            message: '款式不能为空',
            type: 'warning',
            duration: 1000
          })
        } else {
          this.styleOptions.push(newStyle)
        }
        this.newStyle = ""
      },
      removeStyle(index) {
        console.log(index)
        this.styleOptions.splice(index, 1)
      },
      removeSku(index) {
        this.skuList.splice(index, 1);
      },
      skuContains(newSku){
        for (let i = 0; i < this.skuList.length; i++) {
          let sku = this.skuList[i]
          if(JSON.stringify(sku).indexOf(JSON.stringify(newSku)) >= 0){
            return true
          }
        }
        return false
      },
      addSku(){
        this.$confirm('确认添加sku信息', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const {styleGroup, shoeSizeGroup } = this

          for (let i = 0; i < styleGroup.length; i++) {
            for (let j = 0; j < shoeSizeGroup.length; j++) {
              let sku ={
                id: null,
                goodsId: null,
                name: styleGroup[i],
                store: null,
                price: null,
                shoeSize: shoeSizeGroup[j]
              }
              if(!this.skuContains(sku)){
                this.skuList.push(sku)
              }else{
                this.$message({
                  message: '不能重复添加',
                  type: 'warning',
                  duration: 1000
                })
              }
            }
          }
          this.styleGroup = this.shoeSizeGroup = []
        })
      },
      clearSkuList(){
        this.$confirm('操作将导致sku信息清空，是否要清空', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.skuList.splice(0, this.skuList.length)
        })
      }
    }
  }

</script>

<style scoped>
  .littleMarginLeft {
    margin-left: 10px;
  }

  .cardBg {
    background: #F8F9FC;
  }
</style>
