<template>
  <div>
    <el-form label-width="100px">
      <el-form-item label="商品详情图片">
        <img class="gallery avatar-uploader" v-for="(galleryUrl, index) in detailList" :src="galleryUrl" :key="index">
        <el-upload
          :action="uploadAction"
          :show-file-list="false"
          :on-success="detailUploadSuccess"
          accept=".jpg,.jpeg,.png,.gif"
          multiple
          list-type="picture-card" style="display: block">
          <i class="el-icon-plus"/>
        </el-upload>
      </el-form-item>
      <el-form-item label="操作">
        <el-button type="danger" @click.native.prevent="clearDetail">清空详情</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        uploadAction: process.env.UPLOAD_URL
      }
    },
    computed: {
      detailList() {
        let gallery = this.goodsInfo.detail
        if(gallery){
          return gallery.split(",")
        }
        return []
      }
    },
    props: {
      goodsInfo: {
        type: Object
      }
    },
    methods: {
      detailUploadSuccess(response, file) {
        if(this.goodsInfo.detail===null||this.goodsInfo.detail===undefined){
          this.goodsInfo.detail = ""
        }
        if(this.detailList.length > 0){
          this.goodsInfo.detail += ","
        }
        this.goodsInfo.detail += response.data
      },
      clearDetail(){
        this.goodsInfo.detail = ""
      }
    }
  }

</script>

<style>

</style>
