<template>
  <div class='charing'>
    <!--显示模块-->
    <div class='char-box' ref='Anchor'>
      <ul class='ul-box'>
        <li v-for='mes in mesList' class='clearfix'>
          <div class='text-box' :class='{textPosition:mes.bool,textLeft:!mes.bool}' v-html='mes.text'></div>
        </li>
      </ul>
    </div>
    <!--输入模块-->
    <div class='char-tex'>
      <!--表情按钮-->
      <div class='additional' @click='imageBoxIsShow=!imageBoxIsShow'><img style='cursor:pointer' src="../../../static/images/faces/ee_1.png" alt=""></div>
      <!--表情列表-->
      <div class='image-box' v-show='imageBoxIsShow'>
        <img v-for='map in mapPath' :src="map.path" alt="" style='cursor:pointer' @click='addExpression(map.map,map.path)'>
      </div>
      <!--聊天框-->
      <textarea @keyup.enter='sendText' v-model='text' name="" id="">
      </textarea>
      <!--好友列表-->
      <div class='Friends'>
        <ul>
          <li v-for='(friend,index) in Friends' @click='switchCurrent(index)' :class='{current:liCurrent[index]}' style='cursor:pointer'>
            <img :src="friend.src" alt=""><br>
            <span>{{friend.name}}</span>
          </li>
        </ul>
      </div>
    </div>
    <!--发送按钮-->
    <div class='send'>
      <button @click='sendText'>发送</button>
    </div>
  </div>
</template>
<script> 
import bus from '../common/bus'
export default {
  data() {
    return {
      text: '',//用于发送
      displayText: '',//用于显示,
      user: '18688721763',
      mesList: [],
      Friends: [{
        src: '../../../static/images/18688721763.jpg',
        name: '18688721763',
        accountNumber: 18688721763
      },
      {
        src: '../../../static/images/18020659352.jpg',
        name: '18020659352',
        accountNumber: 18020659352
      }
      ],
      liCurrent: [true, false],
      mapPath: [],
      imageBoxIsShow: false,
      map: [//表情列表
        '[):]',
        '[:D]',
        '[;)]',
        '[:O]',
        '[:a]',
        '[:b]',
        '[:c]',
        '[:d]',
        '[:e]',
        '[:f]',
        '[:g]',
        '[:h]',
        '[:i]',
        '[:j]',
        '[:k]',
        '[:l]',
        '[:m]',
        '[:n]',
        '[:o]',
        '[:p]',
        '[:q]',
        '[:r]',
        '[:s]',
        '[:t]',
        '[:u]',
        '[:v]',
        '[:w]',
        '[:s]',
        '[:y]',
        '[:z]',
        '[:A]',
        '[:B]',
        '[:C]',
        '[:D]',
        '[:E]',
      ],
      mapObj: {
        '[):]': '../../../static/images/faces/ee_1.png',
        '[;)]': '../../../static/images/faces/ee_3.png',
        '[:D]': '../../../static/images/faces/ee_2.png',
        '[:O]': '../../../static/images/faces/ee_4.png',
        '[:a]': '../../../static/images/faces/ee_5.png',
        '[:b]': '../../../static/images/faces/ee_6.png',
        '[:c]': '../../../static/images/faces/ee_7.png',
        '[:d]': '../../../static/images/faces/ee_8.png',
        '[:e]': '../../../static/images/faces/ee_9.png',
        '[:f]': '../../../static/images/faces/ee_10.png',
        '[:g]': '../../../static/images/faces/ee_11.png',
        '[:h]': '../../../static/images/faces/ee_12.png',
        '[:i]': '../../../static/images/faces/ee_13.png',
        '[:j]': '../../../static/images/faces/ee_14.png',
        '[:k]': '../../../static/images/faces/ee_15.png',
        '[:l]': '../../../static/images/faces/ee_16.png',
        '[:m]': '../../../static/images/faces/ee_17.png',
        '[:n]': '../../../static/images/faces/ee_18.png',
        '[:o]': '../../../static/images/faces/ee_19.png',
        '[:p]': '../../../static/images/faces/ee_20.png',
        '[:q]': '../../../static/images/faces/ee_21.png',
        '[:r]': '../../../static/images/faces/ee_22.png',
        '[:s]': '../../../static/images/faces/ee_23.png',
        '[:t]': '../../../static/images/faces/ee_24.png',
        '[:u]': '../../../static/images/faces/ee_25.png',
        '[:v]': '../../../static/images/faces/ee_26.png',
        '[:w]': '../../../static/images/faces/ee_27.png',
        '[:s]': '../../../static/images/faces/ee_28.png',
        '[:y]': '../../../static/images/faces/ee_29.png',
        '[:z]': '../../../static/images/faces/ee_30.png',
        '[:A]': '../../../static/images/faces/ee_31.png',
        '[:B]': '../../../static/images/faces/ee_32.png',
        '[:C]': '../../../static/images/faces/ee_33.png',
        '[:D]': '../../../static/images/faces/ee_34.png',
        '[:E]': '../../../static/images/faces/ee_35.png',
      }
    }
  },
  mounted() {
    // this.receive()
    this.mesTransmit()
    // 渲染表情
    this.renderImage()
  },
  watch: {
    mesList(newVal, oldVal) {
      this.$nextTick(() => {
        if (this.$refs.Anchor.scrollHeight) {
          this.$refs.Anchor.scrollTop = this.$refs.Anchor.scrollHeight
        }
      })
    }
  },
  methods: {
    // 发送消息触发
    sendText() {
      if (this.text.trim() == '') {
        alert('你好，不能为空')
        return
      }
      // 单聊发送文本消息
      this.sendPrivateText()
    },
    // 发送消息主函数
    sendPrivateText() {
      var id = this.conn.getUniqueId();                 // 生成本地消息id
      var msg = new WebIM.message('txt', id);      // 创建文本消息
      var text = this.text
      var that = this
      msg.set({
        msg: that.text.trim(),                  // 消息内容
        to: that.user,                          // 接收消息对象（用户id）
        roomType: false,
        // 信息发送成功
        success: function(id, serverMsgId) {
          var index = -1
          var arr = []
          for (var i = 0; i < that.text.length; i++) {
            index = that.text.indexOf('[', ++index)
            if (index == -1) {
              break;
            }
            arr.push(index)
          }
        if(arr.length>0){
            for (var j = 0; j < arr.length; j++) {
            if (j == 0 && arr.length == 1) {
              that.displayText += that.text.slice(0, arr[j]) + '<img style="vertical-align:middle" src="' + that.mapObj[that.text.slice(arr[j], arr[j] + 4)] + '">'+that.text.slice(arr[j] + 4)
            } else if (j == 0 && arr.length != 1) {
              that.displayText +=  that.text.slice(0, arr[j]) + '<img style="vertical-align:middle" src="' + that.mapObj[that.text.slice(arr[j], arr[j] + 4)] + '">' + that.text.slice(arr[j] + 4, arr[j + 1])
            } else if(j==arr.length-1){
              that.displayText += '<img style="vertical-align:middle" src="' + that.mapObj[that.text.slice(arr[j], arr[j] + 4)] + '">' + that.text.slice(arr[j] + 4)
            }else{
              that.displayText += '<img style="vertical-align:middle" src="' + that.mapObj[that.text.slice(arr[j], arr[j] + 4)] + '">' + that.text.slice(arr[j] + 4, arr[j + 1])              
            }
          }
        }else{
          that.displayText=that.text
        }
          that.mesList.push({
            text: that.displayText,
            id: id,
            bool: false
          })
          console.log(that.mesList)
          that.text = ''
          that.displayText = ''
        },
        // 信息发送失败
        fail: function(e) {
          console.log("Send private text error");
        }
      });
      msg.body.chatType = 'singleChat';
      this.conn.send(msg.body);
    },
    // 信息传递,接收消息
    mesTransmit() {
      var that = this
      bus.$on('receiveText', function(message) {
        // 是否带有表情
        if (typeof message.data == 'object') {
          var messageTemp = ''
          for (var i = 0; i < message.data.length; i++) {
            if (message.data[i].type == 'txt') {
              messageTemp += message.data[i].data
            } else if (message.data[i].type == 'emoji') {
              messageTemp += '<img style="vertical-align:middle" src="' + message.data[i].data + '">'
            }
          }
          message.data = messageTemp
        }
        that.mesList.push({
          text: message.data,
          id: message.id,
          bool: true
        })
      })

    },
    // 头像焦点切换
    switchCurrent(index) {
      // 改变焦点样式
      for (var i = 0; i < this.liCurrent.length; i++) {
        if (i == index) {
          this.liCurrent[i] = true
          this.user = this.Friends[i].accountNumber
        } else {
          this.liCurrent[i] = false
        }
      }
      // 改变发送对象
      this.liCurrent = this.liCurrent.concat()
    },
    // 表情渲染
    renderImage() {
      for (var i = 0; i < 35; i++) {
        this.mapPath.push({
          path: '../../../static/images/faces/ee_' + (i + 1) + '.png',
          map: this.map[i]
        })
      }
    },
    // 将表情添加到输入框
    addExpression(map, path) {
      this.imageBoxIsShow = !this.imageBoxIsShow
      this.text += map
      this.displayText = this.displayText
    }
  }
}
</script>
<style>
.char-box {
  width: 500px;
  height: 339px;
  border: solid 1px hotpink;
  margin: 0 auto;
  background: url('../../../static/images/kakaluote.jpg');
}

.char-tex {
  width: 500px;
  height: 130px;
  border: solid 1px blueviolet;
  margin: 0 auto;
  position: relative;
}

.char-tex textarea {
  width: 493px;
  height: 94px;
  background-color: yellowgreen
}

.textPosition {
  float: right
}

.textLeft {
  float: left
}

ul,
li {
  list-style: none;
  text-align: left;
  padding: 10px;
}

.char-box {
  overflow: auto;
}

.clearfix:after,
.clearfix::before {
  content: "";
  display: block;
  clear: both;
}

.clearfix {
  zoom: 1;
}

.text-box {
  padding: 5px;
  background: skyblue;
  border-radius: 5px;
}

.Friends img {
  width: 50px;
  height: 50px;
}

.Friends {
  position: absolute;
  left: -150px;
  ;
  top: -340px;
}

.current {
  background: yellowgreen
}

.send button {
  margin-top: 10px;
  width: 100px;
  height: 30px;
  background: yellow;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.char-tex .additional {
  text-align: left;
  width: 100px;
  height: 30px;
}

.char-tex .image-box {
  width: 280px;
  height: 194px;
  border: solid 1px #ccc;
  position: absolute;
  top: -200px;
  box-shadow: #ccc 2px 2px 10px;
  background: white;
  padding: 4px
}

.char-tex .image-box img {
  width: 32px;
  height: 32px;
}
</style>