<template>
  <div>
    <div class="line"></div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="1">活动中心</el-menu-item>
      <el-submenu index="2">
        <template slot="title">我的工作台</template>
        <el-menu-item index="2-1">新增活动</el-menu-item>
        <el-menu-item index="2-2">我新增的活动</el-menu-item>
        <el-menu-item index="2-3">我参加的活动</el-menu-item>
        <!--<el-submenu index="2-4">
          <template slot="title">活动管理</template>
          <el-menu-item index="2-4-1">新增活动</el-menu-item>
          <el-menu-item index="2-4-2">活动列表</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>-->
      </el-submenu>
      <el-menu-item index="3" disabled>消息中心</el-menu-item>
      <!--<el-menu-item index="4"><a href="#" target="_blank">订单管理</a></el-menu-item>-->
    </el-menu>
  </div>
</template>

<script>
 /* export default {
    name: 'BlogHeader'
  }*/
  export default {
    name: 'BlogHeader',
    data() {
      return {
        activeIndex: '1',
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
        switch (key){
          case "1":
                this.$router.replace({path: '/index'})
                break;
          case "2-1":
                this.$router.replace({path: '/acAdd',query:{key:key}})
                break;
        }
      },
      initPage(key){
        this.activeIndex=key;
      }
    },
    mounted(){

    }
   }
</script>
