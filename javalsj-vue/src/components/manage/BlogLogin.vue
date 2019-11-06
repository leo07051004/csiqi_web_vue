<template>


  <div class="loginPage" align="center">
    <div>
      <div style="width: 100%;">
        用户名:
        <el-input style="width: 80%;" v-model="loginInfoVo.username" placeholder="请输入用户名"></el-input>
      </div>
      <div style="width: 100%;">
        密码：
        <el-input style="width: 80%;" v-model="loginInfoVo.password" placeholder="请输入密码" show-password>></el-input>
      </div>
      <br/>
      <el-row>
        <el-button type="success" v-on:click="login">登录</el-button>
        <el-button type="success" >注册</el-button>
      </el-row>
      <br/>
      <div style="width: 100%;">
        验证：<!--<textarea cols="35" rows="2" v-model="responseResult"></textarea>-->
        <el-input style="width: 80%;" type="textarea" :rows="2" placeholder=""  v-model="responseResult"> </el-input>
      </div>
    </div>
    <br/>
    <blog-footer></blog-footer>
  </div>
</template>
<style>
  .loginPage{
    margin-top: 100px;
  }
</style>
<script>
  import blogHeader from '@/components/common/BlogHeader.vue'
  import blogFooter from '@/components/common/BlogFooter.vue'
  import querystring from 'querystring'
  export default {
    name: 'BlogLogin',
    // blogHeader、blogFooter组件给申明到components里面然后在template里面使用
    components: { blogHeader, blogFooter },
    data () {
      return {
        loginInfoVo: { username: '', password: '' },
        responseResult: []
      }
    },
    methods: {
      login () {
        this.$axios
          .post('/login', {
            username: this.loginInfoVo.username,
            password: this.loginInfoVo.password
          })
          .then(successResponse => {
            this.responseResult = JSON.stringify(successResponse.data)
            if (successResponse.data.code === 200) {
              this.$router.replace({path: '/index',query:{username:successResponse.data.data.userName,userId:successResponse.data.data.userId}})
            }
          })
          .catch(failResponse => {})
      }
    }
  }
</script>
