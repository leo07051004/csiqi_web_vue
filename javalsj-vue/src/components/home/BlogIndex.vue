<template>
  <div>
    <blog-header></blog-header>
    <br/>
    <div>
      <el-table
        :data="tableData"
        style="width: 100%"
        max-height="550">
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
          prop="f_ac_usernum"
          label="人数"
          width="120">
        </el-table-column>
        <el-table-column
          prop="f_ac_keys"
          label="标签"
          width="770">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="120">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="acList()"
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
    </div>
    <br/>
    <blog-footer></blog-footer>
  </div>
</template>

<script>
  import blogHeader from '@/components/common/BlogHeader.vue'
  import blogFooter from '@/components/common/BlogFooter.vue'

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

    },
    data() {
      return {
          tableData: [{a:0}]
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
          console.log(that.tableData);
        }
      }).catch(failResponse => {})
      }
  }
</script>
