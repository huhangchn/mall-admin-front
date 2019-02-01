<template>
  <div>
    <el-form ref="ruleForm" :model="goodsInfo" :rules="rules" label-width="100px">
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

      <el-form-item label="商品图片" prop="picUrl">
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          :action="uploadAction"
          :on-success="picUrlUploadSuccess"
          accept=".jpg,.jpeg,.png,.gif"
          :limit="1"
          list-type="picture-card">
          <img v-if="goodsInfo.picUrl" :src="goodsInfo.picUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"/>
        </el-upload>
      </el-form-item>

      <el-form-item label="宣传画廊">
        <el-upload
          :action="uploadAction"
          :on-success="galleryUploadSuccess"
          accept=".jpg,.jpeg,.png,.gif"
          :limit="5"
          multiple
          list-type="picture-card">
          <i class="el-icon-plus"/>
        </el-upload>
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
      uploadAction: process.env.UPLOAD_URL,
      rules: {
        name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 3, max: 40, message: '长度在 3 到 40 个字符', trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    picUrlUploadSuccess(response, file){
      this.goodsInfo.picUrl = response.data
    },
    galleryUploadSuccess(response, file){
      this.goodsInfo.gallery = response.data
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
</style>
