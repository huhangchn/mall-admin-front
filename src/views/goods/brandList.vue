<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="dialogFormVisible = true">添加</el-button>
      <!-- Form -->

      <el-dialog title="添加品牌" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="品牌名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleAddBrand()">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="编辑品牌" :visible.sync="editDialogFormVisible">
        <el-form :model="editForm">
          <el-form-item label="品牌ID" :label-width="formLabelWidth">
            <el-input v-model="editForm.id" auto-complete="off" :disabled=true></el-input>
          </el-form-item>

          <el-form-item label="品牌名称" :label-width="formLabelWidth">
            <el-input v-model="editForm.name" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleEditBrand()">确 定</el-button>
        </div>
      </el-dialog>

    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;">
      <el-table-column label="品牌ID" prop="id" align="center" width="100px">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="品牌名称" prop="id" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" @click.native.prevent="editBrandDlg(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" @click.native.prevent="deleteBrand(scope.$index, scope.row)">删除</el-button>
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
import { fetchbrandList, changeGoodsSaleStatus, addBrand, deleteBrand, editBrand } from '@/api/goods'
import { fetchCategory } from '@/api/category'
import { fetchBrand } from '@/api/brand'
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination


export default {
  components: { Pagination, category, brand },
  data() {
    return {
      dialogFormVisible: false,
      editDialogFormVisible: false,
      form: {
        name: ''
      },
      editForm: {
        id: '',
        name: ''
      },
      formLabelWidth: '120px',

      list: null,
      total: 0,
      listLoading: false,
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
    handleAddBrand() {
      this.dialogFormVisible = false;
      addBrand(this.form).then(data => {
        let code = data.code
        if(code === 100000){
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          this.form.name = ''
          this.getList()
        }
      })
    },
    handleEditBrand() {
      this.editDialogFormVisible = false;
      editBrand(this.editForm).then(data => {
        let code = data.code
        if(code === 100000){
          this.$message({
            message: '编辑成功',
            type: 'success'
          })
          this.editForm.id = ''
          this.editForm.name = ''
          this.getList()
        }
      })
    },
    getList() {
      // this.listLoading = true
      fetchbrandList(this.listQuery).then(data => {
        this.list = data.data.list
        this.total = data.data.total
        // Just to simulate the time of the request
        // setTimeout(() => {
        //   this.listLoading = false
        // }, 0.1 * 1000)
      })
    },
    deleteBrand(index, row){
      deleteBrand(row.id).then(data => {
        let code = data.code
        if(code === 100000){
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.getList()
        }
      })
    },
    editBrandDlg(index, row){
      this.editForm.id = row.id
      this.editForm.name = row.name
      this.editDialogFormVisible = true
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
