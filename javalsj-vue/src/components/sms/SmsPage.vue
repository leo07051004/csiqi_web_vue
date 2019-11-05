<template>

  <div>
    <blog-header ref="blogHeader"></blog-header>
    <br/>
    <button @click="send">发消息</button>
    <br/>
    <blog-footer></blog-footer>
  </div>
</template>

<script>
  import blogHeader from '@/components/common/BlogHeader.vue'
  import blogFooter from '@/components/common/BlogFooter.vue'
  export default {
    name: 'SmsPage',
    // blogHeader/blogFooter组件给申明到components里面然后在template里面使用
    components: { blogHeader, blogFooter },
    data () {
      return {
        path:"ws://127.0.0.1:8081/csiqi/websocket/cp",
        socket:""
      }
    },
    mounted () {
      // 初始化
      this.init()
      //获取传入的参数
      var param = this.$route.query;
      this.$refs.blogHeader.initPage(param.key);
    },
    methods: {
      init: function () {
        if(typeof(WebSocket) === "undefined"){
          alert("您的浏览器不支持socket")
        }else{
          // 实例化socket
          this.socket = new WebSocket(this.path)
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
        console.log(msg.data)
      },
      send: function () {
        this.socket.send('[{"toUserId":"'+21+'","contentText":"hhello"}]')
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
