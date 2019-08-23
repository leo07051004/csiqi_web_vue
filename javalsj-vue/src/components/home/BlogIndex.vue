<template>
  <div>
    <blog-header></blog-header>
    <br/>
    <div

    >
      <el-table
        :data="tableData"
        style="width: 100%"
        max-height="550"
        :stripe="true"
        v-infinite-scroll="load"
        infinite-scroll-distance="40"
        infinite-scroll-disabled="false"
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
      <p v-if="loading">加载中...</p>
      <p v-if="noMore">没有更多了</p>
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
      load(){
        console.log(this.loading);
        this.loading = true
      }
    },
    data() {
      return {
          tableData: [{a:0}],
          loading: false,
          count: 10,
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
    computed: {
      noMore () {
        return this.count >= 20
      },
      disabled () {
        return this.loading || this.noMore
      }
    },
  }
</script>
