<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view></router-view>
  </div>
</template>

<script>
import bus from './components/common/bus'
export default {
  name: 'app',
  data() {
    return {
      count: 20//断线重连次数
    }
  },
  mounted() {
    console.log('haha')
    // 数据监听,每一次刷新页面都会调用一次receive
    this.receive()
    // 环信重新连接
    this.Reconnect()
  },
  methods: {
    // 数据监听
    receive() {
      console.log('进来')
      var that = this
      this.conn.listen({
        onOpened: function(message) {
          console.log("%c [opened] 连接已成功建立", "color: green")       //连接成功回调
          // 如果isAutoLogin设置为false，那么必须手动设置上线，否则无法收消息
          // 手动上线指的是调用conn.setPresence(); 如果conn初始化时已将isAutoLogin设置为true
          // 则无需调用conn.setPresence();             
        },
        onClosed: function(message) {
          // 重新连接次数
          that.count--
          if (count <= 0) {
            return
          }
          that.Reconnect()
          console.log("%c [opened] 连接失败", "color: red")
        },         //连接关闭回调
        onTextMessage: function(message) {
          bus.$emit('receiveText',message)
          console.log('收到的文本消息', message)
        },    //收到文本消息
        onEmojiMessage: function(message) { 
          bus.$emit('receiveText',message)          
          console.log(message,'收到了表情消息')
        },   //收到表情消息
        onPictureMessage: function(message) { }, //收到图片消息
        onCmdMessage: function(message) { },     //收到命令消息
        onAudioMessage: function(message) { },   //收到音频消息
        onLocationMessage: function(message) { },//收到位置消息
        onFileMessage: function(message) { },    //收到文件消息
        onVideoMessage: function(message) {
          var node = document.getElementById('privateVideo');
          var option = {
            url: message.url,
            headers: {
              'Accept': 'audio/mp4'
            },
            onFileDownloadComplete: function(response) {
              var objectURL = WebIM.utils.parseDownloadResponse.call(that.conn, response);
              node.src = objectURL;
            },
            onFileDownloadError: function() {
              console.log('File down load error.')
            }
          };
          WebIM.utils.download.call(that.conn, option);
        },   //收到视频消息
        onPresence: function(message) { },       //处理“广播”或“发布-订阅”消息，如联系人订阅请求、处理群组、聊天室被踢解散等消息
        onRoster: function(message) { },         //处理好友申请
        onInviteMessage: function(message) { },  //处理群组邀请
        onOnline: function() { },                  //本机网络连接成功
        onOffline: function() { },                 //本机网络掉线
        onError: function(message) { },          //失败回调
        onBlacklistUpdate: function(list) {       //黑名单变动
          // 查询黑名单，将好友拉黑，将好友从黑名单移除都会回调这个函数，list则是黑名单现有的所有好友信息
          console.log(list);
        },
        onReceivedMessage: function(message) { },    //收到消息送达客户端回执
        onDeliveredMessage: function(message) { },   //收到消息送达服务器回执
        onReadMessage: function(message) { },        //收到消息已读回执
        onCreateGroup: function(message) { },        //创建群组成功回执（需调用createGroupNew）
        onMutedMessage: function(message) { }        //如果用户在A群组被禁言，在A群发消息会走这个回调并且消息不会传递给群其它成员
      });
    },
    // 环信重连
    Reconnect() {
      console.log(1)
      if (sessionStorage.getItem('huanXinToken')) {
        console.log(2)
        var tokenObj = JSON.parse(sessionStorage.getItem('huanXinToken'))
        var options = {
          apiUrl: WebIM.config.apiURL,
          user: tokenObj.username,
          accessToken: tokenObj.token,
          appKey: WebIM.config.appkey
        };
        console.log(options)
        this.conn.open(options);
      }
    }
  },
  watch: {
    $route(router) {
      if (router.name == 'index') {
        sessionStorage.removeItem('huanXinToken')
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
