<template>
  <div>
    <el-form :model="goodsInfo" label-width="100px">
      <el-form-item v-for="(attrOptions, index) in basicAttrOptions" :key="index" :label="attrOptions.name" prop="name" class="options">
        <el-select filterable v-model="goodsInfo.basicValueId[index]" :placeholder="attrOptions.name" clearable class="filter-item" style="width: 330px">
          <el-option v-for="(item, index) in attrOptions.attributeValue" :key="index" :label="item.value" :value="item.id"/>
        </el-select>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
  import {fetchBasicAttrOptions} from "@/api/attribute"
  export default {
    props: {
      goodsInfo: {
        type: Object,
        default: undefined
      }
    },
    data(){
      return {
        basicAttrOptions: [],
      }
    },
    created(){
      this.getBasicAttrOptions()
    },
    methods: {
      getBasicAttrOptions(){
        fetchBasicAttrOptions().then(res => {
          this.basicAttrOptions = res.data
        })
      }
    }
  }
</script>

<style>
  .options{
    margin: 30px 100px 0;
  }

</style>
