<template>
  <div>
    <blog-header ref="blogHeader"></blog-header>
    <div>
      <el-table
        :data="tableData"
        style="width: 100%"
        max-height="550"
        :stripe="true"
      >
        <!--<el-table-column
          fixed
          prop="f_ac_begintime"
          label="开始日期"
          width="95">
        </el-table-column>-->
        <el-table-column
          prop="userName"
          label="消息列表"
          width="120">
        </el-table-column>
        <el-table-column
          prop="allcount"
          label=""
          width="120">
        </el-table-column>
        <!--<el-table-column
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
        </el-table-column>-->
        <el-table-column
          fixed="right"
          label="操作"
          width="120">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="smsPage(scope.$index, tableData)"
              type="text"
              size="small">
              聊天
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
          :current-page="currentPage"
          :page-sizes="[100, 30, 20, 10]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
    <blog-footer></blog-footer>
  </div>
</template>

<script>
  import blogHeader from '@/components/common/BlogHeader.vue'
  import blogFooter from '@/components/common/BlogFooter.vue'
  import querystring from 'querystring'
  export default {
    name: 'SmsList',
    // blogHeader/blogFooter组件给申明到components里面然后在template里面使用
    components: { blogHeader, blogFooter },
    methods: {
      deleteRow(index, rows) {
        rows.splice(index, 1);
      },
      smsPage(index, rows) {//BlogHeader
        this.$router.replace({path: '/smsPage',query:{toUserId:rows[index].f_message_fromUId,toUserName:rows[index].userName,key:this.key,username:this.username,userId:this.userId}})
      },
      handleSizeChange(val) {
        this.pageSize=val;
        this.selectData();
        //console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.pageNum=val;
        this.selectData();
        //console.log(`当前页: ${val}`);
      },
      selectData(){
        var that=this;
        console.log(`that.userId=`+that.userId);
        this.$axios
          .post('/message/selectMessage', {
            f_message_toUId:that.userId,
            pageNum:that.pageNum,
            pageSize:that.pageSize
          })
          .then(successResponse => {
            this.total=successResponse.data.total;
            this.responseResult = successResponse.data.list;//JSON.stringify(successResponse.data.list)
            if (successResponse.status === 200) {
              that.tableData=this.responseResult;
              console.log(that.tableData);
            }
          }).catch(failResponse => {})
      },
      requestUserVo(){
        var that=this;
        this.$axios
          .post('/requestUserVo', {})
          .then(successResponse => {
          //this.responseResult = JSON.stringify(successResponse.data)
          if (successResponse.data.code === 200) {
            that.username=successResponse.data.data.userName;
            that.userId=successResponse.data.data.userId;
            console.log("that.userId="+that.userId);
            this.selectData();
          }
      }).catch(failResponse => {})
      },
    },

    data() {
      return {
          tableData: [],
          pageNum: 1,
          pageSize: 10,
          currentPage: 1,
          total:0,
          username:"",
          key:"",
          userId:""
        }
    },
    mounted(){
      //获取传入的参数
      var param = this.$route.query;
      this.$refs.blogHeader.initPage(param.key);
      //this.username=param.username;
      //this.userId=param.userId;
      this.key=param.key;
      this.requestUserVo();
      },
  }
</script>
