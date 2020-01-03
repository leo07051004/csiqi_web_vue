<template >
  <div>
    <blog-header ref="blogHeader"></blog-header>
    <div id="toUserDiv" align="center">
     <!-- <el-button type="success" @click="backToSmsList"><i class="el-icon-back"></i></el-button>-->
      <el-button  icon="el-icon-back" ></el-button>
      <el-button   style="width: 80%;display: inline-block">好友：{{toUserName}}</el-button>
     <!-- <span   style="width: 80%;display: inline-block">好友：{{toUserName}}</span>-->
      <!--<el-input style="width:77%;" type="text" size="medium" v-model="toUserName" placeholder=""></el-input>-->
    </div>
    <div id="viewDiv" stlye="margin:0px; padding:0px;text-align:left" >
      <ul>
        <li v-for="item in message_array" style="">{{item.userName}}：{{item.f_message_content}}</li>
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
        path:"ws://www.csiqi.cn:8081/csiqi/websocket/", //服务器使用此地址
        //path:"ws://47.99.196.57:8081/csiqi/websocket/",
        //path:"ws://127.0.0.1:8081/csiqi/websocket/",//本地电脑使用此地址
        socket:"",
        message:"",
        message_array: [], //{"fromUserName":"cl","fromUserId":"cp","contentText":"da","toUserId":"21"}
        username:"",
        userId:"",
        toUserId:"",
        key:"",
        toUserName:"",
        pageNum: 0,
        pageSize: 0,
      }
    },
    mounted () {
      //获取传入的参数
      var param = this.$route.query;
      this.$refs.blogHeader.initPage(param.key);
      this.key=param.key;
      this.username=param.username;
      this.userId=param.userId;
      this.toUserId=param.toUserId;
      this.toUserName=param.toUserName;
      this.selectData();
      // 初始化
      this.init()
    },
    methods: {
      init: function () {
        if(typeof(WebSocket) === "undefined"){
          alert("您的浏览器不支持socket")
        }else{
          // 实例化socket
          this.socket = new WebSocket(this.path+this.userId)
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
        console.log(resultJson.data.f_message_fromUId);
        if(resultJson.data.f_message_fromUId){
          this.message_array.push(resultJson.data);
        }
        console.log(msg.data);
      },
      send: function () {
        this.message_array.push({"userName":this.username,"f_message_content":this.message,"f_message_toUId":this.toUserId});
        this.socket.send('[{"f_message_toUId":"'+this.toUserId+'","userName":"'+this.username+'","f_message_content":"'+this.message+'"}]');
        console.log('[{"f_message_toUId":"'+this.toUserId+'","userName":"'+this.username+'","f_message_content":"'+this.message+'"}]')
        this.message = '';
      },
      close: function () {
        console.log("socket已经关闭")
      },
      selectData: function () {
        var that=this;
        this.$axios
          .post('/message/selectMessageByFromUId', {
            f_message_fromUId:that.toUserId,
            f_message_toUId:that.userId,
            pageNum:that.pageNum,
            pageSize:that.pageSize,
          })
          .then(successResponse => {
          this.total=successResponse.data.total;
        this.responseResult = successResponse.data.list;//JSON.stringify(successResponse.data.list)
        if (successResponse.status === 200) {
          that.message_array=this.responseResult;
        }
      }).catch(failResponse => {})
      },
    },
    destroyed () {
      // 销毁监听
      this.socket.onclose = this.close
    },
  }
</script>

<style>

</style>
