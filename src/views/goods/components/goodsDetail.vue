<template>
  <div>
    <el-upload
      :on-change='changeUpload'
      :action="uploadAction"
      list-type="picture-card"
      :show-file-list="false"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :limit="1">
      <img v-if="goodsInfo.detail" :src="goodsInfo.detail" class="avatar">
      <i class="el-icon-plus" v-if="!goodsInfo.detail"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="imageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        uploadAction: process.env.UPLOAD_URL,
        imageUrl: '',
        fileList: null,
        dialogVisible: false
      };
    },
    props: {
      goodsInfo: {
        type: Object
      }
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.imageUrl = file.url;
        this.dialogVisible = true;
      },
      handleSuccess(response, file){
        console.log(response.data)
        this.goodsInfo.detail = response.data
      },
      changeUpload(file, fileList) {
        this.imageUrl = file.url
        this.fileList = fileList
      }
    }
  }

</script>

<style>

</style>
