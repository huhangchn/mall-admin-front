<template>
  <el-select filterable v-model="object.brandId" placeholder="商品品牌" clearable class="filter-item" style="width: 200px">
    <el-option v-for="(item, index) in brandOptions" :key="index" :label="item.name" :value="item.id"/>
  </el-select>
</template>

<script>
  import { fetchBrand } from '@/api/brand'
    export default {
      created(){
        this.getBrandOptions()
      },
      props:{
        object: {
          type: Object
        }
      },
      data() {
        return {
          brandOptions: []
        }
      },
      methods:{
        getBrandOptions() {
          fetchBrand().then(res => {
            this.brandOptions = res.data
          })
        }
      }
    }
</script>

<style>

</style>
