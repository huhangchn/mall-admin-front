<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="dialogFormVisible = true">添加</el-button>
      <!-- Form -->

      <el-dialog title="添加分类" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="分类名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleAddCategory()">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="编辑分类" :visible.sync="editDialogFormVisible">
        <el-form :model="editForm">
          <el-form-item label="分类ID" :label-width="formLabelWidth">
            <el-input v-model="editForm.id" auto-complete="off" :disabled=true></el-input>
          </el-form-item>

          <el-form-item label="分类名称" :label-width="formLabelWidth">
            <el-input v-model="editForm.name" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleEditCategory()">确 定</el-button>
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
      <el-table-column label="分类ID" prop="id" align="center" width="100px">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="分类名称" prop="id" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" @click.native.prevent="editCategoryDlg(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" @click.native.prevent="deleteCategory(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

  </div>
</template>

<script>
import { fetchPv, createArticle, updateArticle } from '@/api/article'
import { fetchCategoryList, changeGoodsSaleStatus, addCategory, deleteCategory, editCategory } from '@/api/goods'
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination


export default {
  components: { Pagination},
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
        name: undefined
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handleAddCategory() {
      this.dialogFormVisible = false;
      addCategory(this.form).then(data => {
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
    handleEditCategory() {
      this.editDialogFormVisible = false;
      editCategory(this.editForm).then(data => {
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
      fetchCategoryList(this.listQuery).then(data => {
        this.list = data.data.list
        this.total = data.data.total
      })
    },
    deleteCategory(index, row){
      deleteCategory(row.id).then(data => {
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
    editCategoryDlg(index, row){
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
