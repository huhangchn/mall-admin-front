<template>
  <div>
    <el-form :model="goodsInfo" label-width="100px">
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="goodsInfo.name"/>
      </el-form-item>
      <el-form-item label="商品分类" prop="category">
        <category :object="goodsInfo"/>
      </el-form-item>
      <el-form-item label="商品品牌" prop="brand">
        <brand :object="goodsInfo"/>
      </el-form-item>
      <el-form-item label="商品简介" prop="description">
        <el-input v-model="goodsInfo.brief" type="textarea"/>
      </el-form-item>
      <el-form-item label="商品价格">
        <el-input v-model="goodsInfo.price"/>
      </el-form-item>
      <el-form-item label="是否上架">
        <el-switch v-model="goodsInfo.isOnSale"/>
      </el-form-item>
      <el-form-item label="商品图片" prop="picUrl">
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          :action="uploadAction"
          :on-success="picUrlUploadSuccess"
          accept=".jpg,.jpeg,.png,.gif"
          list-type="picture-card">
          <img v-if="goodsInfo.picUrl" :src="goodsInfo.picUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"/>
        </el-upload>
      </el-form-item>


      <el-form-item label="宣传画廊">
        <img class="gallery avatar-uploader" v-for="(galleryUrl, index) in galleryList" :src="galleryUrl" :key="index">
        <el-upload
          :action="uploadAction"
          :show-file-list="false"
          :on-success="galleryUploadSuccess"
          accept=".jpg,.jpeg,.png,.gif"
          :limit="5"
          multiple
          list-type="picture-card" style="display: block">
          <i class="el-icon-plus"/>
        </el-upload>
      </el-form-item>
      <el-form-item label="操作">
        <el-button type="danger" @click.native.prevent="clearGallery">清空画廊</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
  import category from './category'
  import brand from './brand'

  export default {
    components: {
      category,
      brand
    },
    props: {
      goodsInfo: {
        type: Object,
        default: undefined
      }
    },
    data() {
      return {
        uploadAction: process.env.UPLOAD_URL
      }
    },
    computed: {
      galleryList() {
        let gallery = this.goodsInfo.gallery
        if(gallery){
          return gallery.split(",")
        }
        return []
      }
    },

    methods: {
      picUrlUploadSuccess(response, file) {
        this.goodsInfo.picUrl = response.data
      },
      galleryUploadSuccess(response, file) {
        if(this.goodsInfo.gallery===null||this.goodsInfo.gallery===undefined){
          this.goodsInfo.gallery = ""
        }
        if (this.galleryList.length < 5) {
          if(this.galleryList.length > 0){
            this.goodsInfo.gallery += ","
          }
          this.goodsInfo.gallery += response.data
        }else{
          this.$message({
            message: '最多添加5张图片',
            type: 'warning',
            duration: 1000
          })
        }
      },
      clearGallery(){
        this.goodsInfo.gallery = ""
      }
    }
  }
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 100%;
    height: 100%;
    display: block;
  }

  .gallery {
    width: 146px;
    height: 146px;

  }
</style>
