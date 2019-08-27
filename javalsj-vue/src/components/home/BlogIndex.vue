<template>
  <div>
    <blog-header></blog-header>
    <br/>
    <div>
      <el-table
        :data="tableData"
        style="width: 100%"
        max-height="550"
        :stripe="true"
      >
        <el-table-column
          fixed
          prop="f_ac_begintime"
          label="开始日期"
          width="95">
        </el-table-column>
        <el-table-column
          prop="f_ac_name"
          label="名称"
          width="120">
        </el-table-column>
        <el-table-column
          prop="f_ac_adminName"
          label="主持人"
          width="120">
        </el-table-column>
        <el-table-column
          prop="f_ac_usernum"
          label="人数"
          width="120">
        </el-table-column>
        <el-table-column
          prop="f_ac_keys"
          label="标签"
          width="150">
        </el-table-column>
        <el-table-column
          prop="f_ac_desc"
          label="活动详情"
          width="470">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="120">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="aplayAc(scope.$index, tableData)"
              type="text"
              size="small">
              报名
            </el-button>
            <el-button
              @click.native.prevent="deleteRow(scope.$index, tableData)"
              type="text"
              size="small">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[100, 30, 20, 10]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400">
        </el-pagination>
      </div>
    </div>
    <br/>
    <blog-footer></blog-footer>
  </div>
</template>

<script>
  import blogHeader from '@/components/common/BlogHeader.vue'
  import blogFooter from '@/components/common/BlogFooter.vue'
  import querystring from 'querystring'
 /* export default {
    name: 'BlogIndex',
    // blogHeader/blogFooter组件给申明到components里面然后在template里面使用
    components: { blogHeader, blogFooter }
  }*/
  export default {
    name: 'BlogIndex',
    // blogHeader/blogFooter组件给申明到components里面然后在template里面使用
    components: { blogHeader, blogFooter },
    methods: {
      deleteRow(index, rows) {
        rows.splice(index, 1);
      },
      aplayAc(index, rows) {
        console.log(rows[index].f_ac_id);
        this.$router.replace({path: '/acAdd'})
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    },
    data() {
      return {
          tableData: [{a:0}],
          currentPage1: 5,
          currentPage2: 5,
          currentPage3: 5,
          currentPage4: 1
        }
    },
    mounted(){
        var that=this;
        this.$axios
          .post('/acList', {
            pageNum:1,
            pageSize:10
          })
          .then(successResponse => {
          this.responseResult = successResponse.data.list;//JSON.stringify(successResponse.data.list)
        if (successResponse.status === 200) {
          that.tableData=this.responseResult;
        }
      }).catch(failResponse => {})
      },
  }
</script>
