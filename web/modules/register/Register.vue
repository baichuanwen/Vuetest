<template>
  <div id="login">
    <div id="browerCompatible">
    <span>温馨提示：您当前使用的浏览器在访问工程宝可能达不到预期效果，为了让您有更好的用户体验，建议您更换浏览器访问</span>
    <a class="brower" style="margin-left: 20px" href="https://www.google.cn/chrome/" target="view_window">谷歌</a>
    <a class="brower" href="http://www.firefox.com.cn/" target="view_window">火狐</a>
    <a class="brower" href="https://browser.360.cn/se/" target="view_window">360</a>
    <a class="brower" href="https://support.microsoft.com/zh-cn/help/17621/internet-explorer-downloads" target="view_window">IE11</a>
</div>
    <nav id="navbar">
        <img src="../../../static/img/login-logo.png" alt="乐建工程宝">
        <a href="javascript:void(0)">联系我们：400-060-0889</a>
    </nav>
   <div id="body">
 <div id="container" class="container">
           <div id="panel" class="panel">
            <div>
                <div class="title">
                    注册
                </div>
                <div id="myTabContent" >
                    <!--密码登录-->
                    <div>
                        <input class="inputBox top2" id="phone" type="phone" maxlength="13" v-model="telephone" placeholder="请输入手机号">
                        <div id="getCodeBox" class="getCodeBox top2 cursor-pot">
                            <input class="inputBox" id="code" maxlength="6" v-model="messageCode" type="text" autocomplete="off" placeholder="请输入验证码">
                            <span id="getCode" class="getCode" :style="{'color': interval == 0 ? '#007bff' : '#bdc7d2'}" @click="getCode">{{getCoder}}</span>
                        </div>
                        <input class="inputBox" id="username" type="text" name="username" style="display:none;visibility:hidden;height: 0;margin: 0;">
                        <input class="inputBox" v-model="password" type="password" name="password" style="display:none;visibility:hidden;height: 0;margin: 0;">
                        <div class="password">
                            <input class="inputBox" v-model="password" id="password" type="text" placeholder="请输入密码" name="password" autocomplete="off">
                            <i id="passwordIcon" class="fa fa-eye-slash"></i>
                        </div>
                        <div id="warnTxt" class="warnTxt text-danger" v-if="haveLogin">
                            该账号已注册，请直接<a class="loginSrc" href="#" @click="goLogin">登录</a>
                        </div>
                       <div id="warnTxt2" class="warnTxt text-danger" v-if="errorMessage">{{errorMessage}}</div>
                        <div class="logOnBtnBg" id="logOnBtnBg" v-if="!telephone || !messageCode && isRegister">
                            <div class="logOnBtn" id="logOnBtn">
                                注册
                            </div>
                        </div>
                        <div class="logOnBtnBg" id="logOnBtnBg2" v-if="telephone && messageCode && isRegister">
                            <div class="logOnBtn" id="logOnBtn2" @click="messageSignIn">
                                注册
                            </div>
                        </div>
                         <div class="logOnBtnBg" id="logOnBtnBg2" v-if="telephone && messageCode && !isRegister">
                            <div class="logOnBtn" id="logOnBtn2" @click="passwordLogin">
                                注册
                            </div>
                        </div>
                        <div class="text-gray1">
                            注册代表您同意<a class="text-gray1" href="#" @click="registerProtical">《服务协议》</a>
                        </div>
                        <div class="exist text-gray">已有账号？<a class="text-primary cursor-pot loginSrc" href="#" @click="goLogin">登录</a></div>

                    </div>
                </div>
            </div>
            <div class="codePicBox" id="codePicBox">
                <div class="codeTitle">
                    乐建工程宝
                </div>
                <div class="codePic">

                </div>
            </div>
            <!--自动登录提示框-->
            <div id="autoLogWarn">
                <img class="loadPic" src="../../../static/img/loading.gif" alt="">
                <p style="text-align: center;">发现您曾经注册过乐建工程宝账号，</p>
                <p style="text-align: center;">正在登陆中...</p>
            </div>
        </div>
            <div id="downloadBtn" class="downloadBtn" @click="download"> 下载&nbsp;&nbsp;APP </div>
        </div>
   </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import Axios from "axios";
import { mapActions } from "vuex";
import Register from "./module";
export default {
  name: "Login",
  data() {
    return {
      store: this.$store.state,
      host: "https://dev.gcb365.com/api",
      errorMessage: "",
      browserType: null,
      loginType: 1,
      remember: false,
      showCookies: false,
      code: true,
      messageCode: null,
      telephone: null,
      interval: 0,
      submit: false,
      getCoder: "获取验证码",
      appMarket: null,
      timerId: null,
      timerId2: null,
      getLoginCode: null,
      validCodeType: null,
      marginTop: "-349px",
      haveLogin: false,
      password: null,
      isRegister: true
    };
  },
  methods: {
    ...mapActions([
      //该 handleLogin 来自 store.js 中导出的 actions 和 mutations 中的 handleLogin
      "handleLogin",
      "getLoginData"
    ]),
    // 服务协议
    registerProtical() {
      this.$router.push({
        path: "/registerProtical"
      });
    },
    goLogin() {
      if (this.appMarket) {
        this.$router.push({
          path: "/login",
          params: { appMarket: "guanwang" }
        });
      } else {
        this.$router.push({
          path: "/login"
        });
      }
    },
    // 下载
    download() {
      if (this.code) {
        if (this.loginType == 1) {
          $("#codePicBox").animate({ "margin-top": "-360", opacity: 1 }, 500);
        } else if (this.loginType == 2) {
          $("#codePicBox").animate({ "margin-top": "-346", opacity: 1 }, 500);
        } else if (this.loginType == 3) {
          $("#codePicBox").css("z-index", "11");
          $("#codePicBox").animate({ "margin-top": "-62", opacity: 1 }, 300);
        }
        $("#downloadBtn").text("关闭二维码");
        this.code = false;
      } else {
        $("#codePicBox").animate(
          { "margin-top": "0", opacity: 0, "z-index": "1" },
          500
        );
        $("#downloadBtn").text("下载 APP");
        this.code = true;
      }
    },
    //获取验证码
    getCode() {
      let self = this;
      if (self.interval != 0) {
        return;
      }
      if (!self.telephone) {
        self.errorMessage = "请填写手机号";
        return;
      }
      if (!/^1\d{10}$/.test(self.telephone)) {
        self.errorMessage = "手机号格式不正确";
        return;
      }
      self.errorMessage = null;
      Register.register
        .cusRegisterValidCode({ mobile: self.telephone })
        .then(res => {
          if (res.error) {
            self.errorMessage = res.error.message;
            return;
          }
          self.interval = 60;
          let timer = setInterval(function() {
            if (self.interval == 0) {
              self.getCoder = "获取验证码";
              clearInterval(timer);
              return;
            }
            self.getCoder = self.interval + "秒后重新获取";
            self.interval--;
          }, 1000);
        });
    },
    // 验证码登陆
    messageSignIn() {
      const self = this;
      if (self.submit) {
        return;
      }
      self.errorMessage = null;
      let data = {
        mobile: self.telephone,
        validCode: self.messageCode
      };
      $.ajax({
        xhrFields: {
          withCredentials: true
        },
        type: "post",
        dataType: "json",
        data: JSON.stringify(data),
        contentType: "application/json;charset=UTF-8",
        url: self.host + "/web/customer/registerValidCodeCheck",
        beforeSend: function(request) {
          self.submit = true;
          if (self.appMarket) {
            request.setRequestHeader("appMarket", self.appMarket);
          }
        },
        success: function(data) {
          //已经注册过
          if (data.error && data.error.code == 200905) {
            $("#autoLogWarn").css({ display: "block" });
            setTimeout(function() {
              $.ajax({
                xhrFields: {
                  withCredentials: true
                },
                type: "post",
                dataType: "json",
                data:
                  '{"mobile": "' +
                  self.telephone +
                  '","validCode":"' +
                  self.messageCode +
                  '","validCodeType": "' +
                  self.validCodeType +
                  '","isAutoLogin ":"true"}',
                contentType: "application/json;charset=UTF-8",
                url: self.host + "/web/employee/mobileValidCodeLogin",
                beforeSend: function(request) {
                  self.submit = true;
                  if (self.appMarket) {
                    request.setRequestHeader("appMarket", self.appMarket);
                  }
                },
                success: function(data) {
                  if (data.error) {
                    $("#autoLogWarn").css({ display: "none" });
                    self.errorMessage = data.error.message;
                    return;
                  }
                  self.$store.commit("setLoginData", data);
                  self.$router.push({
                    path: data.body.employee ? "/home" : "/home"
                  });
                },
                complete: function() {
                  self.submit = false;
                }
              });
            }, 1000);
          } else if (data.error) {
            self.errorMessage = data.error.message;
            return;
          } else {
            //未注册过
            self.isRegister = false;
            self.marginTop = "-290px";
            $(".top2").css({ display: "none" });
            $(".password").css({ display: "block" });
            $(".downloadBtn").css({ top: "426px" });
            $(".codePic").css({ "margin-top": "25px" });
            $("#logOnBtnBg2").css({ display: "block" });
            $("#logOnBtnBg").css({ display: "none" });
          }
        },
        complete: function() {
          self.submit = false;
        }
      });
    },
    passwordLogin() {
      let self = this;
      if (self.submit) return;
      if (!self.password) {
        self.errorMessage = "请填写密码";
      } else if (
        !/^[\x21-\x7eA-Za-z0-9`！￥…（）—【】、；：‘“，《。》、？]{8,20}$/.test(
          self.password
        )
      ) {
        self.errorMessage = "密码为8-20位数字、字母或特殊字符";
      } else {
        //注册
        self.errorMessage = null;
        $.ajax({
          xhrFields: {
            withCredentials: true
          },
          type: "post",
          dataType: "json",
          data:
            '{"mobile": "' +
            self.telephone +
            '","validCode":"' +
            self.validCode +
            '","password":"' +
            self.password +
            '","validCodeType": "' +
            validCodeType +
            '"}',
          contentType: "application/json;charset=UTF-8",
          url: self.host + "/web/customer/register",
          beforeSend: function(request) {
            self.submit = true;
            if (self.appMarket) {
              request.setRequestHeader("appMarket", self.appMarket);
            }
          },
          success: function(data) {
            if (data.error) {
              self.errorMessage = data.error.message;
              return;
            } else {
              //注册完毕，调用登录接口
              $.ajax({
                xhrFields: {
                  withCredentials: true
                },
                type: "post",
                dataType: "json",
                data:
                  '{"username": "' +
                  self.telephone +
                  '","password":"' +
                  self.password +
                  '","isAutoLogin":"false"}',
                contentType: "application/json;charset=UTF-8",
                url: self.host + "/web/employee/login",
                beforeSend: function() {
                  self.submit = true;
                },
                success: function(data) {
                  if (data.error) {
                    self.errorMessage = data.error.message;
                    return;
                  }
                  $("#phone").val("");
                  $("#code").val("");
                  $("#password").val("");
                  self.$router.push({
                    path: data.body.employee ? "/home" : "/home"
                  });
                },
                complete: function() {
                  self.submit = false;
                }
              });
            }
          },
          complete: function() {
            self.submit = false;
          }
        });
      }
    }
  },
  mounted() {
    let userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    let isIE =
      userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
    let isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
    let isIE11 =
      userAgent.indexOf("Trident") > -1 && userAgent.indexOf("rv:11.0") > -1;
    if (isIE) {
      $("#browerCompatible").hide();
    } else if (isEdge) {
      return "edge"; //edge
    } else if (isIE11) {
      $("#browerCompatible").hide(); //IE11
    } else {
      //火狐
      if (userAgent.toLocaleLowerCase().match(/firefox/) != null) {
        browserType = "火狐";
        browserVersion =
          userAgent.toLocaleLowerCase().match(/msie ([\d.]+)/) != null
            ? userAgent.toLocaleLowerCase().match(/msie ([\d.]+)/)[1]
            : userAgent.toLocaleLowerCase().match(/rv:([\d.]+)/)[1];
        if (browserVersion < 60) {
          $("#browerCompatible").show();
        } else {
          $("#browerCompatible").hide();
        }
      } else if (userAgent.toLocaleLowerCase().match(/chrome/) != null) {
        var is360 = _mime("type", "application/vnd.chromium.remoting-viewer");
        function _mime(option, value) {
          var mimeTypes = navigator.mimeTypes;
          for (var mt in mimeTypes) {
            if (mimeTypes[mt][option] == value) {
              return true;
            }
          }
          return false;
        }
        var _broswer = {};
        var reChorme = new RegExp("Chrome/(\\d+\\.\\d+(?:\\.\\d+\\.\\d+))?");
        reChorme.test(userAgent);
        if (is360) {
          _broswer.version = parseFloat(RegExp["$1"]);
          _broswer.name = "360";
          if (_broswer.version < 55) {
            $("#browerCompatible").show();
          } else {
            $("#browerCompatible").hide();
          }
        } else {
          _broswer.version = parseFloat(RegExp["$1"]);
          _broswer.name = "chrome";
          if (_broswer.version < 58) {
            $("#browerCompatible").show();
          } else {
            $("#browerCompatible").hide();
          }
        }
      }
    }

    if (this.$route.params.fromLog == 1 && localStorage.getItem("loginInfo")) {
      // 隐藏账号验证码
      this.validCodeType = 1;
      var v = JSON.parse(localStorage.getItem("loginInfo"));
      $("#phone").val(v.mobile);
      $("#code").val(v.validCode);
      this.marginTop = "-290px";
      $(".top2").css({ display: "none" });
      $(".password").css({ display: "block" });
      $(".downloadBtn").css({ top: "426px" });
      $(".codePic").css({ "margin-top": "25px" });
      $("#logOnBtnBg2").css({ display: "block" });
      $("#logOnBtnBg").css({ display: "none" });
    } else {
      // 隐藏密码
      this.validCodeType = 2;
      this.marginTop = "-349px";
      $(".top2").css({ display: "block" });
      $(".password").css({ display: "none" });
      $(".downloadBtn").css({ top: "483px" });
      $(".codePic").css({ "margin-top": "55px" });
      $("#logOnBtnBg2").css({ display: "none" });
      $("#logOnBtnBg").css({ display: "block" });
    }
    this.appMarket = this.$route.params.appMarket;
    var checkInputType = function() {
      if ($("#password").val() == "") {
        $("#password").attr("type", "text");
      } else if (
        !($("#password").val() == "") &&
        $("#passwordIcon").attr("class") == "fa fa-eye-slash"
      ) {
        $("#password").attr("type", "password");
      }
    };
    $("#password").on("input", function() {
      checkInputType();
    });
    // 显示隐藏密码
    var togglePassword = function() {
      if ($("#passwordIcon").attr("class") == "fa fa-eye") {
        $("#passwordIcon").attr("class", "fa fa-eye-slash");
        $("#password").attr("type", "password");
      } else {
        $("#passwordIcon").attr("class", "fa fa-eye");
        $("#password").attr("type", "text");
      }
      checkInputType();
    };

    $("#passwordIcon").click(togglePassword);
  }
};
</script>
<style scoped>
.text-gray {
  color: #939ba4;
}
.text-gray1 {
  color: #c6ced8;
}
.title {
  color: #939ba4;
  font-size: 18px;
  text-align: center;
}
.text-danger {
  font-size: 12px;
  padding-left: 5px;
}
#browerCompatible {
  background-color: #fef4d6;
  height: 36px;
  line-height: 36px;
  margin: 0 auto;
  text-align: center;
}
#browerCompatible span {
  color: #e89811;
}
#browerCompatible .brower {
  padding: 3px 9px;
  background-color: #ffffff;
  border: 1px solid #e89811;
  border-radius: 3px;
  margin: 0 10px;
  cursor: pointer;
  color: #e89811;
  text-decoration: none;
}
#navbar {
  width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100px;
  margin: 0 auto;
}
#navbar .navbar-brand {
  padding: 25px 40px;
  height: 100px;
}

#navbar .navbar-nav > li > a {
  padding-top: 40px;
  padding-bottom: 40px;
}

#body {
  height: 600px;
  background: url(../../../static/img/background.png) center center no-repeat;
  background-size: cover;
  position: relative;
}

.container {
  width: 1200px;
}

#panel {
  width: 350px;
  /*height: 420px;*/
  padding-bottom: 14px;
  overflow: hidden;
  position: absolute;
  top: 100px;
  right: 100px;
  background: #ffffff;
  border-radius: 0;
  border: none;
}
#panel > div {
  padding-top: 30px;
  /*height: 410px;*/
}
#panel .panel-body {
  padding: 0 30px 38px 30px;
}

#panel .nav {
  display: inline-block;
  border: none;
}

/*safari去除icon*/
input::-webkit-contacts-auto-fill-button {
  visibility: hidden;
  display: none !important;
  pointer-events: none;
  position: absolute;
  right: 0;
}

input:-webkit-autofill,
textarea:-webkit-autofill,
select:-webkit-autofill {
  -webkit-box-shadow: 0 0 0 20px #edf0f4 inset;
}
/*输入框*/
#myTabContent {
  padding: 30px 8.5% 0;
}
.form-horizontal .form-group {
  margin-left: 0;
  margin-right: 0;
  margin-bottom: 20px;
}

/*登录按钮*/
.logOnBtnBg {
  width: 110%;
  height: 65px;
  line-height: 38px;
  letter-spacing: 2px;
  font-size: 16px;
  text-align: center;
  color: #fff;
  margin-top: 40px;
  margin-left: -15px;
  background: url(../../../static/img/btnUnclickBg.png) top center no-repeat;
  background-size: contain;
}
#logOnBtnBg2 {
  width: 110%;
  height: 65px;
  line-height: 38px;
  letter-spacing: 2px;
  font-size: 16px;
  text-align: center;
  color: #fff;
  margin-top: 40px;
  margin-left: -15px;
  background: url(../../../static/img/btnBg.png) top center no-repeat;
  background-size: contain;
}
.logOnBtn {
  width: 95%;
  margin: 0 auto;
  cursor: pointer;
}

/*自动登录*/
.autoLogOn {
}
.autoLogOn label {
  font-weight: 500;
}
.autoLogOn label i {
  top: 3px;
}
#panel label input[type="checkbox"]:checked + i:before {
  text-align: center;
  content: "\f00c";
  color: #fff;
  font-size: 12px;
  border-color: #248bfe;
  background-color: #248bfe;
}
#panel label input[type="checkbox"] + i:before {
  color: #ccc;
  content: "";
  font-size: 18px;
  width: 16px;
  height: 16px;
  overflow: hidden;
  line-height: 16px;
  border: 1px solid #c4cdd7;
  border-radius: 50%;
  background-color: #edf0f4;
  display: inline-block;
}
/*已存在*/
.exist {
  text-align: center;
  margin-top: 22px;
}

/*下载二维码*/
.codePicBox {
  background-color: #fff;
  width: 350px;
  height: 370px;
  position: absolute;
  z-index: 3;
  opacity: 0;
}
.codeTitle {
  text-align: center;
  color: #248bfe;
  font-size: 30px;
  line-height: 30px;
}
.codePic {
  width: 184px;
  height: 184px;
  margin: 0 auto;
  background-color: #000;
  background: url("../../../static/img/downloadCode.png") center center
    no-repeat;
  background-size: contain;
}

/*短信验证码*/
.getCodeBox {
  position: relative;
}
.getCode {
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 16px;
  cursor: pointer;
}

a.text-gray1:hover {
  color: #c6ced8;
}

.panel-title {
  color: #248bfe;
  font-size: 20px;
  font-weight: 800;
  padding: 25px 30px 0 30px;
  text-align: center;
}

.icon-box {
  width: 30px;
  height: 34px;
  padding-right: 6px;
  line-height: 34px;
  text-align: left;
  float: left;
}
#panel .nav > li > a {
  color: #939ba4;
  padding: 10px 0;
  margin: 0 25px;
  font-size: 18px;
}
#pane1 .nav-tabs {
  border: none;
}
/*输入框*/
.inputBox {
  display: block;
  font-size: 16px;
  /*color: #bdc7d2;*/
  width: 100%;
  margin: 0 auto;
  border: none;
  background-color: #edf0f4;
  height: 40px;
  line-height: 40px;
  border-radius: 20px;
  padding: 0 20px;
  outline: none;
  margin-bottom: 17px;
}

.input-box {
  float: left;
  width: 250px;
}
#panel .nav-tabs > li.active > a,
#panel .nav-tabs > li.active > a:hover,
#panel .nav-tabs > li.active > a:focus {
  border: none;
  border-bottom: 3px solid #248bfe;
  color: #248bfe;
  text-decoration: none;
}
#panel .nav > li > a,
#panel .nav > li > a {
  border: none;
}
.nav > li > a:hover,
.nav > li > a:focus {
  background-color: transparent;
  border: none;
}

/*提示信息*/
.warnTxt {
  font-size: 12px;
  padding-left: 5px;
  margin-top: -8px;
  position: absolute;
}

/*已注册提示信息*/
#autoLogWarn {
  display: none;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #fff;
}
.loadPic {
  margin: 20% auto 15%;
  display: block;
}

/*下载按钮*/
.downloadBtn {
  position: absolute;
  right: 100px;
  top: 483px;
  width: 350px;
  height: 50px;
  line-height: 50px;
  background-color: #fff;
  color: #248bfe;
  font-size: 16px;
  text-align: center;
  cursor: pointer;
}
#remember-password {
  height: 34px;
  line-height: 34px;
}

#forget-password {
  text-align: right;
  height: 34px;
  line-height: 34px;
}
.password {
  position: relative;
}
#password {
  padding-right: 50px;
}
#passwordIcon {
  position: absolute;
  right: 10px;
  top: 3px;
  padding: 10px;
  cursor: pointer;
}

input.form-control {
  padding: 0;
  border: none;
  outline: none;
  background: transparent;
  box-shadow: none;
  border-radius: 0;
  border-bottom: 1px #e2e4e8 solid;
}

input.form-control:focus {
  border: none;
  outline: none;
  box-shadow: none;
  background: transparent;
  border-radius: 0;
  border-bottom: 1px #248bfe solid;
}
.inputBox::-webkit-input-placeholder {
  color: #bdc7d2;
} /* 使用webkit内核的浏览器 */
.inputBox:-moz-placeholder {
  color: #bdc7d2;
} /* Firefox版本4-18 */
.inputBox::-moz-placeholder {
  color: #bdc7d2;
} /* Firefox版本19+ */
.inputBox:-ms-input-placeholder {
  color: #bdc7d2;
} /* IE浏览器 */
</style>
