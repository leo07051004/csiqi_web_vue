<template>


  <div class="loginPage">
    <div>
      用户名:<!--<input type="text" v-model="loginInfoVo.username" placeholder="请输入用户名" />-->
      <el-input v-model="loginInfoVo.username" placeholder="请输入用户名"></el-input>

      <br/>
      密码：<!--<input type="password" v-model="loginInfoVo.password" placeholder="请输入密码" />-->
      <el-input v-model="loginInfoVo.password" placeholder="请输入密码" show-password>></el-input>

      <br/>
      <!--<button v-on:click="login">登录</button>-->
      <el-row>
      <el-button type="success" v-on:click="login">登录</el-button>
        <el-button type="success" >注册</el-button>
        </el-row>
      <br/>
      登录验证：<!--<textarea cols="35" rows="2" v-model="responseResult"></textarea>-->
      <el-input type="textarea" :rows="2" placeholder=""  v-model="responseResult"> </el-input>
    </div>
    <br/>
    <blog-footer></blog-footer>
  </div>
</template>
<style>
  .el-input,.el-textarea{
    width: 20%;
    margin-top: 20px;
  }
  .el-button{
    margin-top: 20px;
  }
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
              this.$router.replace({path: '/index'})
            }
          })
          .catch(failResponse => {})
      }
    }
  }
</script>
