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
        tableData: [{
          f_ac_id:'1',
          f_ac_begintime: '2016-05-03',
          f_ac_name: '王小虎',
          f_ac_usernum: '上海',
          f_ac_keys: '普陀区',
        }, {
          f_ac_id:'2',
          f_ac_begintime: '2016-05-02',
          f_ac_name: '王小虎',
          f_ac_usernum: '上海',
          f_ac_keys: '普陀区',
        }, {
          f_ac_id:'3',
          f_ac_begintime: '2016-05-04',
          f_ac_name: '王小虎',
          f_ac_usernum: '上海',
          f_ac_keys: '普陀区',
        }, {
          f_ac_id:'4',
          f_ac_begintime: '2016-05-01',
          f_ac_name: '王小虎',
          f_ac_usernum: '上海',
          f_ac_keys: '普陀区',
        }, {
          f_ac_id:'5',
          f_ac_begintime: '2016-05-08',
          f_ac_name: '王小虎',
          f_ac_usernum: '上海',
          f_ac_keys: '普陀区',
        }, {
          f_ac_id:'6',
          f_ac_begintime: '2016-05-06',
          f_ac_name: '王小虎',
          f_ac_usernum: '上海',
          f_ac_keys: '普陀区',
        }, {
          f_ac_id:'7',
          f_ac_begintime: '2016-05-07',
          f_ac_name: '王小虎',
          f_ac_usernum: '上海',
          f_ac_keys: '普陀区',
        }, {
          f_ac_id:'8',
          f_ac_begintime: '2016-05-06',
          f_ac_name: '王小虎',
          f_ac_usernum: '上海',
          f_ac_keys: '普陀区',
        }, {
          f_ac_id:'9',
          f_ac_begintime: '2016-05-07',
          f_ac_name: '王小虎',
          f_ac_usernum: '上海',
          f_ac_keys: '普陀区',
        }, {
          f_ac_id:'10',
          f_ac_begintime: '2016-05-06',
          f_ac_name: '王小虎',
          f_ac_usernum: '上海',
          f_ac_keys: '普陀区',
        }, {
          f_ac_id:'11',
          f_ac_begintime: '2016-05-07',
          f_ac_name: '王小虎',
          f_ac_usernum: '上海',
          f_ac_keys: '普陀区',
        }, {
          f_ac_id:'12',
          f_ac_begintime: '2016-05-06',
          f_ac_name: '王小虎',
          f_ac_usernum: '上海',
          f_ac_keys: '普陀区',
        }, {
          f_ac_id:'13',
          f_ac_begintime: '2016-05-07',
          f_ac_name: '王小虎',
          f_ac_usernum: '上海',
          f_ac_keys: '普陀区',
        }, {
          f_ac_id:'14',
          f_ac_begintime: '2016-05-06',
          f_ac_name: '王小虎',
          f_ac_usernum: '上海',
          f_ac_keys: '普陀区',
        }, {
          f_ac_id:'15',
          f_ac_begintime: '2016-05-07',
          f_ac_name: '王小虎',
          f_ac_usernum: '上海',
          f_ac_keys: '普陀区',
        }]
      }
    }
  }
</script>
