<template>
  <el-select filterable v-model="object.categoryId" placeholder="商品分类" clearable class="filter-item" style="width: 200px">
    <el-option v-for="(item, index) in categoryOptions" :key="index" :label="item.name" :value="item.id"/>
  </el-select>
</template>

<script>
  import { fetchCategory } from '@/api/category'
  export default {
    created(){
      this.getCategoryOptions()
    },
    props:{
      object: {
        type: Object
      }
    },
    data() {
      return {
        categoryOptions: []
      }
    },
    methods:{
      getCategoryOptions() {
        fetchCategory().then(res => {
          this.categoryOptions = res.data
        })
      }
    }
  }
</script>

<style>

</style>
