<template >
  <div>
    <blog-header ref="blogHeader"></blog-header>
    <div id="toUserDiv" align="center">
      <el-input style="width:77%;" type="text" size="medium" v-model="toUserId" placeholder="请输入聊天对象"></el-input>
    </div>
    <div id="viewDiv" stlye="margin:0px; padding:0px;text-align:left" >
      <ul>
        <li v-for="item in message_array" style="">{{item.fromUserId}}：{{item.contentText}}</li>
      </ul>
    </div>
    <div id="buttomDiv" align="center">
      <el-input style="width:77%;" type="text" size="medium" v-model="message" placeholder="请输入内容"></el-input>
      <el-button type="success" @click="send">发送</el-button>
    </div>
    <blog-footer></blog-footer>
  </div>
</template>
<style>

  #viewDiv{
    overflow:scroll; width:100%;
    height: 500px;
  }
  #buttomDiv{
    align-items:center;
  }
  #toUserDiv{
    align-items:center;
  }
</style>
<script>
  import blogHeader from '@/components/common/BlogHeader.vue'
  import blogFooter from '@/components/common/BlogFooter.vue'
  export default {
    name: 'SmsPage',
    // blogHeader/blogFooter组件给申明到components里面然后在template里面使用
    components: { blogHeader, blogFooter },
    data () {
      return {
        path:"ws://127.0.0.1:8081/csiqi/websocket/",
        socket:"",
        message:"",
        message_array: [], //{"fromUserId":"cp","contentText":"da","toUserId":"21"}
        username:"",
        toUserId:""
      }
    },
    mounted () {
      //获取传入的参数
      var param = this.$route.query;
      this.$refs.blogHeader.initPage(param.key);
      this.username=param.username;
      // 初始化
      this.init()
    },
    methods: {
      init: function () {
        if(typeof(WebSocket) === "undefined"){
          alert("您的浏览器不支持socket")
        }else{
          // 实例化socket
          this.socket = new WebSocket(this.path+this.username)
          // 监听socket连接
          this.socket.onopen = this.open
          // 监听socket错误信息
          this.socket.onerror = this.error
          // 监听socket消息
          this.socket.onmessage = this.getMessage
        }
      },
      open: function () {
        console.log("socket连接成功")
      },
      error: function () {
        console.log("连接错误")
      },
      getMessage: function (msg) {
        var resultJson=JSON.parse(msg.data);
        console.log(resultJson.data.fromUserId);
        if(resultJson.data.fromUserId){
          this.message_array.push(resultJson.data);
        }
        console.log(msg.data);
      },
      send: function () {
        this.message_array.push({"fromUserId":"我","contentText":this.message,"toUserId":this.toUserId});
        this.socket.send('[{"toUserId":"'+this.toUserId+'","contentText":"'+this.message+'"}]');
        console.log('[{"toUserId":"'+this.toUserId+'","contentText":"'+this.message+'"}]')
        this.message = '';
      },
      close: function () {
        console.log("socket已经关闭")
      }
    },
    destroyed () {
      // 销毁监听
      this.socket.onclose = this.close
    },
  }
</script>

<style>

</style>
