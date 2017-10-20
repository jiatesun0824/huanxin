<template>
  <div class="hello">
    <div class='oneBox'>
      <input type="text" v-model='username' placeholder="账号">
      <input type="text" v-model='password' @keyup.enter='login' placeholder="密码">
      <button @click.enter='login'>登录</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'hello',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      password: '',
      username: ''
    }
  },
  methods: {
    login() {
      if (this.username == '18688721763' && this.password == '123456') {
        var that = this, username = this.username, password = this.password
        // 注册环信账号
        // var options1 = {
        //   username: username,
        //   password: password,
        //   nickname: 'nickname',
        //   appKey: WebIM.config.appkey,
        //   success: function() {
        //   },
        //   error: function() { },
        //   apiUrl: WebIM.config.apiURL
        // };
        // conn.registerUser(options1);
        // 注册环信账号  
        // 登录环信      
        var options2 = {
          apiUrl: WebIM.config.apiURL,
          user: username,
          pwd: password,
          success: function(token) {
            // 把token存起来
            var tokenObj = {
              token: token.access_token,
              username: that.username
            }
            sessionStorage.setItem('huanXinToken', JSON.stringify(tokenObj))
            that.$router.push({ name: 'charing' })
          },
          appKey: WebIM.config.appkey
        };
        this.conn.open(options2);
        // 登录环信
      } else if (this.username == '18020659352' && this.password == '123456') {
        var that = this, username = this.username, password = this.password
        // 登录环信
        var options2 = {
          apiUrl: WebIM.config.apiURL,
          user: username,
          pwd: password,
          success: function(token) {
            // 把token存起来
            var tokenObj = {
              token: token.access_token,
              username: that.username
            }
            sessionStorage.setItem('huanXinToken', JSON.stringify(tokenObj))
            that.$router.push({ name: 'charing' })
          },
          appKey: WebIM.config.appkey
        };
        this.conn.open(options2);
        // 登录环信                      
      }
    }
  },
  created() {
     const s = new Set()
    let arr = [1, 2, 3, 1, 2, 3, 4, 6, 7, 8, 9, 0]
    arr.forEach((value, i) => {
        s.add(value)
    })
    console.log(s)
    // 获取服务器时间
    function getServerDate() {
      var xhr = null;
      if (window.XMLHttpRequest) {
        xhr = new window.XMLHttpRequest();
      } else { // ie
        xhr = new ActiveObject("Microsoft")
      }

      xhr.open("GET", "/", false)//false不可变
      xhr.send(null);
      var date = xhr.getResponseHeader("Date");
      return new Date(date);
    }
    console.log(getServerDate())
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.oneBox {
  padding: 20px;
  width: 200px;
  height: 200px;
  margin: 0 auto;
}

.oneBox input {
  height: 30px;
  width: 200px;
  border-radius: 5px;
  margin-bottom: 20px;
}

.oneBox button {
  width: 100px;
  height: 30px;
  background: skyblue;
  border: none;
}
</style>
