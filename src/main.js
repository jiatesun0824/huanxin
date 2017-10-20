// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 环信的引入
// var adapter = require('../static/js/adapter.js')
// var strophe = require('../static/js/strophe-1.2.8.js')
// var webim = require('../static/js/webim.config.js')
// var webrtc = require('../static/js/webrtc-1.4.13.js')
// var websdk = require('../static/js/websdk-1.4.12.js')
// 环信的引入
// 基础样式
import '../static/css/base.css'
// 导入第三方表情包
WebIM.Emoji = {
    path: '../static/images/faces/' /*表情包路径*/ ,
    map: {
        '[):]': 'ee_1.png',
        '[:D]': 'ee_2.png',
        '[;)]': 'ee_3.png',
        '[:O]': 'ee_4.png',
        '[:a]': 'ee_5.png',
        '[:b]': 'ee_6.png',
        '[:c]': 'ee_7.png',
        '[:d]': 'ee_8.png',
        '[:e]': 'ee_9.png',
        '[:f]': 'ee_10.png',
        '[:g]': 'ee_11.png',
        '[:h]': 'ee_12.png',
        '[:i]': 'ee_13.png',
        '[:j]': 'ee_14.png',
        '[:k]': 'ee_15.png',
        '[:l]': 'ee_16.png',
        '[:m]': 'ee_17.png',
        '[:n]': 'ee_18.png',
        '[:o]': 'ee_19.png',
        '[:p]': 'ee_20.png',
        '[:q]': 'ee_21.png',
        '[:r]': 'ee_22.png',
        '[:s]': 'ee_23.png',
        '[:t]': 'ee_24.png',
        '[:u]': 'ee_25.png',
        '[:v]': 'ee_26.png',
        '[:w]': 'ee_27.png',
        '[:s]': 'ee_28.png',
        '[:y]': 'ee_29.png',
        '[:z]': 'ee_30.png',
        '[:A]': 'ee_31.png',
        '[:B]': 'ee_32.png',
        '[:C]': 'ee_33.png',
        '[:D]': 'ee_34.png',
        '[:E]': 'ee_35.png',
    }
};
// 导入第三方表情包
// 创建连接
var conn = new WebIM.connection({
    isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
    https: typeof WebIM.config.https === 'boolean' ? WebIM.config.https : location.protocol === 'https:',
    url: WebIM.config.xmppURL,
    heartBeatWait: WebIM.config.heartBeatWait,
    autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
    autoReconnectInterval: WebIM.config.autoReconnectInterval,
    apiUrl: WebIM.config.apiURL,
    isAutoLogin: true
});
Vue.prototype.conn = conn
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {
        App
    }
})