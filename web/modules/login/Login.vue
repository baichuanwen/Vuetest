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
                <img @click="codeLogin" class="topIcon toggleScanLogin" src="../../../static/img/codeIcon.png">
                <div class="outer">
                    <div style="text-align: center;">
                        <ul class="nav nav-tabs">
                            <li @click="passwordLogin" :class="{active:loginType == 1}"><a>密码登录</a></li>
                            <li @click="textLogin" :class="{active:loginType == 2}"><a>短信登录</a></li>
                        </ul>
                    </div>
                    <div v-if="loginType == 1" style="padding: 48px 8.5% 0">
                        <div style="position: relative;">
                                <input class="inputBox" id="username" type="text" v-on:input="clearTel(userInfo.username)" placeholder="请输入手机号或企业账号" autocomplete="off" v-model="userInfo.username">
                                <Icon type="chevron-down" class="drop-down" @click="showCookie"></Icon>
                                <ul id="chooseCookie" v-if="showCookies">
                                 <li v-for="(v, index) in getCookie" @click="chooseCookie(v)"><a>{{v.username}}</a></li>
                                </ul>
                            </div>
                            <div style="position: relative">
                               <input type="password" class="form-control" placeholder="请输入密码" style="width: 0;height: 0">
                                <input class="inputBox" id="password" type="password" placeholder="请输入密码" autocomplete="off" v-model="userInfo.password">
                                <input type="password" class="form-control" placeholder="请输入密码" style="width: 0;height: 0">
                            </div>
                            <div id="warnTxt1" class="warnTxt text-danger" v-if="errorMessage">{{errorMessage}}</div>
                            <div class="logOnBtnBg" v-if="userInfo.username&&userInfo.password" @click="login">
                                <div class="logOnBtn" id="logOnBtn">
                                    登录
                                </div>
                            </div>
                            <div class="logBtnBg" v-else>
                                <div class="logOnBtn">
                                    登录
                                </div>
                            </div>
                            <div class="clearfix">
                                <div class="pull-left">
                                    <div class="checkbox-inline autoLogOn">
                                        <label class="text-gray">
                                        <input type="checkbox" v-model="remember">
                                        <i></i>
                                        记住密码</label>
                                    </div>
                                </div>
                                <div class="pull-right">
                                    <a style="color:#939ba4" class="text-gray forgetPassword" @click="forgetPassword">忘记密码</a>
                                    <i class="line"></i>
                                    <a class="text-primary cursor-pot registerSrc" @click="register">注册</a>
                                </div>
                            </div>
                    </div>
                     <!--短信登录-->
                        <div v-if="loginType == 2" style="padding: 35px 8.5% 0">
                            <div style="position: relative;">
                                <input class="inputBox" v-model="telephone" id="messagePhone" type="phone" maxlength="13" placeholder="请输入手机号" name="phone">
                                <div class="closeIcon" id="clearPhone" @click="clearPhone">
                                    <img src="../../../static/img/delete-input.png">
                                </div>
                            </div>
                            <div id="getCodeBox" class="getCodeBox cursor-pot">
                                <input class="inputBox" v-model="messageCode" id="messageCode" maxlength="4" type="text" placeholder="请输入验证码" name="code">
                                <span id="getCode" @click="getCode" class="getCode" :style="{'color': interval == 0 ? '#007bff' : '#bdc7d2'}">{{getCoder}}</span>
                            </div>
                            <div id="warnTxt2" class="warnTxt text-danger" v-if="errorMessage">{{errorMessage}}</div>
                            <div class="autoRegister" style="position: relative;color: #bdc7d2;top: -32px;left: 133px;font-size: 12px;cursor: default">未注册手机验证后自动登录</div>
                            <div class="logOnBtnBg" id="logOnBtnBg2" v-if="messageCode && messageCode" @click="messageSignIn">
                                <div class="logOnBtn" id="logIn">
                                    登录
                                </div>
                            </div>
                               <div class="logBtnBg" id="logOnBtnBg2" v-else>
                                <div class="logOnBtn">
                                    登录
                                </div>
                            </div>
                            <div class="clearfix">
                                <div class="pull-right">
                                    <a style="color:#939ba4" class="text-gray forgetPassword" @click="forgetPassword">忘记密码</a>
                                    <i class="line"></i>
                                    <a class="text-primary cursor-pot registerSrc" @click="register">注册</a>
                                </div>
                            </div>
                        </div>
                         <!--扫码登录-->
                <div class="loginCode" id="loginCode" v-if="loginType == 3">
                    <img class="topIcon toggleScanLogin" src="../../../static/img/computerIcon.png" @click="codeLogin">
                    <div class="title">
                        二维码登录
                    </div>
                    <div class="codeImg" id="loginCodeImg">
                        <!-- <img id="loginCodeImg" alt="登录二维码"> -->
                        <!--二维码遮罩-->
                        <div id="codeShade" @click="codeShadeRefresh">
                            <img id="scanIcon" src="../../../static/img/tools-warning.png">
                            <div id="scanTxt">二维码失效，请点击<span class="refresh" id="refresh">刷新</span></div>
                        </div>
                    </div>
                    <div class="warn">
                        <p id="line1">请使用乐建工程宝客户端"扫一扫"</p>
                        <p id="line2"></p>
                    </div>
                    <div class="bottomTxt">
                        <span class="toggleScanLogin" @click="passwordLogin">密码登录</span>
                        <i class="line"></i>
                        <a class="registerSrc" @click="register">注册新账号</a>
                    </div>
                </div>
                    <div class="codePicBox outer" id="codePicBox">
                    <div class="codeTitle">
                        乐建工程宝
                    </div>
                    <div class="codePic">
                    </div>
                </div>
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
import Login from "./module";
export default {
  name: "Login",
  data() {
    return {
      store: this.$store.state,
      userInfo: {
        username: "",
        password: "",
        isAutoLogin: "false"
      },
      host: "https://dev.gcb365.com/api",
      errorMessage: "",
      browserType: null,
      loginType: 1,
      remember: false,
      getCookie: [],
      showCookies: false,
      code: true,
      messageCode: null,
      telephone: null,
      interval: 0,
      submit: false,
      getCoder: "获取短信验证码",
      appMarket: null,
      timerId: null,
      timerId2: null,
      getLoginCode: null
    };
  },
  methods: {
    // ...mapActions([
    //   //该 handleLogin 来自 store.js 中导出的 actions 和 mutations 中的 handleLogin
    //   "handleLogin",
    //   "getLoginData"
    // ]),
    forgetPassword() {
      this.$router.push({
        path: "/forgetPassword"
      });
    },
    register() {
      if (this.appMarket) {
        this.$router.push({
          path: "/register",
          params: { appMarket: "guanwang" }
        });
      } else {
        this.$router.push({
          path: "/register"
        });
      }
    },
    passwordLogin() {
      $("#loginCodeImg").css("background-image", "");
      this.loginType = 1;
      this.errorMessage = null;
    },
    textLogin() {
      $("#loginCodeImg").css("background-image", "");
      this.loginType = 2;
      this.errorMessage = null;
    },
    // 刷新二维码
    codeShadeRefresh() {
      $("#loginCodeImg").css("background-image", "none");
      $("#codeShade").css("display", "none");
      $("#line2").text("");
      this.getLoginCode();
    },
    // 获取登陆二维码
    codeLogin(type) {
      let self = this;
      if (this.loginType == 3) {
        $("#loginCodeImg").css("background-image", "");
        this.loginType = 1;
      } else {
        this.loginType = 3;
        // 显示隐藏扫码登录
        $(".toggleScanLogin").on("click", function() {
          var s = $("#loginCode").css("display") == "none" ? "block" : "none";
          $("#loginCode").css("display", s);
          if (s == "block") {
            getLoginCode();
          } else {
            clearInterval(self.timerId);
            clearTimeout(self.timerId2);
          }
        });
        // 超时处理
        function overTime() {
          clearInterval(self.timerId);
          $("#scanIcon").attr("src", "../../../static/img/tools-warning.png");
          $("#scanTxt").html(
            "二维码失效，请点击<span id='refresh' style='cursor: pointer'>刷新</span>"
          );
          $("#codeShade").css({ display: "block" });
        }
        // 获取登录二维码
        this.getLoginCode = function() {
          $("#codeShade").css("display", "none");
          $("#line1").css("font-size", "12px");
          $("#line1").text('请使用乐建工程宝客户端"扫一扫"');
          $("#line2").text("");
          $.ajax({
            xhrFields: {
              withCredentials: true
            },
            type: "post",
            dataType: "json",
            data: "{}",
            contentType: "application/json;charset=UTF-8",
            url: self.host + "/web/employee/generateLoginQrCode",
            beforeSend: function() {
              self.submit = true;
            },
            success: function(data) {
              if (data.error) {
                $("#line1").text(data.error.message);
                $("#line2").text("");
                return;
              }
              let loginCodeId = data.body.id;
              var imgSrc =
                self.host + "/web/file/download?uuid=" + data.body.uuid;
              $("#loginCodeImg").css("background-image", "url(" + imgSrc + ")");
              // 每隔2秒验证当前人员扫码状态
              self.timerId = setInterval(function() {
                $.ajax({
                  xhrFields: {
                    withCredentials: true
                  },
                  type: "post",
                  dataType: "json",
                  data: '{"id": "' + loginCodeId + '"}',
                  contentType: "application/json;charset=UTF-8",
                  url: self.host + "/web/employee/getLoginQrCodeStatus",
                  beforeSend: function(request) {
                    self.submit = true;
                    if (self.appMarket) {
                      request.setRequestHeader("appMarket", self.appMarket);
                    }
                  },
                  success: function(data) {
                    if (data.body.status == 1) {
                      //初始化
                    } else if (data.body.status == 2) {
                      //已扫描
                      $("#line1").css("font-size", "12px");
                      $("#line1").text("请在乐建工程宝客户端点击确认即可登录");
                      $("#line2").text("");
                    } else if (data.body.status == 3) {
                      //已授权
                      $("#codeShade").css("display", "block");
                      $("#scanIcon").attr(
                        "src",
                        "../../../static/img/tools-success.png"
                      );
                      $("#scanTxt").text("扫码成功");
                      setTimeout(function() {
                        clearInterval(self.timerId);
                        self.$store.commit("setLoginData", data);
                        self.$router.push({
                          path:
                            data.body &&
                            data.body.loginData &&
                            data.body.loginData.employee
                              ? "/home"
                              : "/home"
                        });
                      }, 1000);
                    } else if (data.body.status == 4) {
                      //已取消
                      $("#line1").css("font-size", "14px");
                      $("#line1").text("您已取消此次登录");
                      $("#line2").text("您可再次扫描登录，或关闭窗口");
                    } else if (data.body.status == 5) {
                      //已失效
                      overTime();
                    }
                  },
                  error: function() {
                    overTime();
                  },
                  complete: function() {
                    self.submit = false;
                  }
                });
              }, 2000);
              self.timerId2 = setTimeout(function() {
                overTime();
              }, 30000);
            },
            error: function() {},
            complete: function() {
              self.submit = false;
            }
          });
        };
        if (self.loginType == 3) {
          this.getLoginCode();
        }
      }
    },
    // 历史记录
    showCookie() {
      this.showCookies = !this.showCookies;
      event.stopPropagation();
    },
    // 选择历史账号
    chooseCookie(item) {
      this.userInfo.username = item.username;
      this.userInfo.password = item.password;
      this.showCookies = false;
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
    // 清除手机号
    clearPhone() {
      this.telephone = null;
      this.messageCode = null;
    },
    clearTel(it) {
      let self = this;
      if (!it) {
        self.userInfo.username = null;
        self.userInfo.password = null;
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
      } else if (!/^1\d{10}$/.test(self.telephone)) {
        self.errorMessage = "手机号格式不正确";
      } else {
        self.submit = false;
        self.errorMessage = null;
        Login.login.getCode({ mobile: self.telephone }).then(res => {
          if (res.error) {
            self.errorMessage = res.error.message;
            return;
          }
          self.interval = 60;
          let timer = setInterval(function() {
            if (self.interval == 0) {
              self.submit = true;
              self.getCoder = "获取短信验证码";
              clearInterval(timer);
              return;
            }
            self.getCoder = self.interval + "秒后重新获取";
            self.interval--;
          }, 1000);
        });
      }
    },
    // 验证码登陆
    messageSignIn() {
      const self = this;
      if (self.submit) {
        return;
      }
      let phone = self.telephone.replace(/\D/g, "").substring(0, 11),
        validCode = $.trim(self.messageCode);
      if (phone === "") {
        self.errorMessage = "请填写手机号";
      } else if (!/^1\d{10}$/.test(phone)) {
        self.errorMessage = "手机号格式不正确";
      } else if (validCode === "") {
        self.errorMessage = "请填写验证码";
      } else {
        self.errorMessage = null;
        let data = {
          mobile: self.telephone,
          validCode: self.messageCode,
          validCodeType: 1,
          isAutoLogin: false
        };
        $.ajax({
          xhrFields: {
            withCredentials: true
          },
          type: "post",
          dataType: "json",
          data: JSON.stringify(data),
          contentType: "application/json;charset=UTF-8",
          url: self.host + "/web/employee/mobileValidCodeLogin",
          beforeSend: function(request) {
            self.submit = true;
            if (self.appMarket) {
              request.setRequestHeader("appMarket", self.appMarket);
            }
          },
          success: function(data) {
            if (data.error && data.error.code == 200921) {
              if (self.appMarket) {
                self.$router.push({
                  path: "/register",
                  params: { fromLog: 1, appMarket: "guanwang" }
                });
              } else {
                self.$router.push({
                  path: "/register",
                  params: { fromLog: 1, appMarket: "" }
                });
              }
              return;
            } else if (data.error) {
              self.errorMessage = data.error.message;
              return;
            }
            self.$store.commit("setLoginData", data);
            self.userInfo.username = null;
            self.userInfo.password = null;
            self.telephone = null;
            self.messageCode = null;
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
    // 登陆
    login() {
      const self = this;
      let index = self.userInfo.username.lastIndexOf("@");
      let loginName =
        index > 0
          ? self.userInfo.username.substring(0, index)
          : self.userInfo.username;
      if (self.username === "") {
        self.errorMessage = "请填写账号";
      } else if (
        !/^[a-zA-Z0-9\u4E00-\u9FA5\uF900-\uFA2D]{1,20}$/.test(loginName)
      ) {
        self.errorMessage = "账号为1-20位数字、字母或中文";
      } else if (self.userInfo.password === "") {
        self.errorMessage = "请填写密码";
      } else if (
        !/^[\x21-\x7eA-Za-z0-9`！￥…（）—【】、；：‘“，《。》、？]{8,20}$/.test(
          self.userInfo.password
        )
      ) {
        self.errorMessage = "密码为8-20位数字、字母或特殊字符";
      } else {
        $.ajax({
          xhrFields: {
            withCredentials: true
          },
          type: "post",
          dataType: "json",
          data:
            '{"username": "' +
            self.userInfo.username +
            '","password":"' +
            self.userInfo.password +
            '","isAutoLogin":"false"}',
          contentType: "application/json;charset=UTF-8",
          url: self.host + "/web/employee/login",
          beforeSend: function(request) {
            self.submit = true;
            if (self.appMarket) {
              request.setRequestHeader("appMarket", self.appMarket);
            }
          },
          success: function(data) {
            if (data.error) {
              self.errorMessage = data.error.message;
              return false;
            }
            self.$store.commit("setLoginData", data);
            let save = false;
            if (self.remember) {
              let cookie = Cookies.getJSON("usernameAndPassword");
              if (cookie) {
                for (var i = 0; i < cookie.length; i++) {
                  if (cookie[i].username == self.userInfo.username) {
                    save = true;
                    break;
                  } else {
                    save = false;
                  }
                }
                if (save) {
                } else {
                  cookie.push(self.userInfo);
                  Cookies.set("usernameAndPassword", cookie, {
                    expires: 7,
                    path: ""
                  });
                }
              } else {
                let rememb = [];
                rememb.push(self.userInfo);
                Cookies.set("usernameAndPassword", rememb, {
                  expires: 7,
                  path: ""
                });
              }
              Cookies.set("username", self.userInfo.username, {
                expires: 7,
                path: ""
              });
              Cookies.set("password", self.userInfo.password, {
                expires: 7,
                path: ""
              });
            } else {
              Cookies.remove("username");
              Cookies.remove("password");
            }
            self.$router.push({
              path: "/home"
            });
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
    // 历史账号
    let _this = this;
    if (Cookies.get("usernameAndPassword")) {
      _this.getCookie = Cookies.getJSON("usernameAndPassword");
    }
    $("body").click(() => {
      _this.showCookies = false;
    });
    if (Cookies.get("username")) {
      _this.userInfo.username = Cookies.get("username");
      _this.userInfo.password = Cookies.get("password");
      _this.remember = true;
    }
    this.appMarket = this.$route.params.appMarket;
  }
};
</script>
<style scoped>
#login {
  min-width: 1400px;
  background-color: #ffffff;
}
.text-gray {
  color: #939ba4;
}
.hide {
  display: none;
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
  background: url("../../../static/img/background.png") center center no-repeat;
  background-size: cover;
  position: relative;
}

#panel {
  width: 350px;
  height: 370px;
  overflow: hidden;
  position: absolute;
  top: 100px;
  right: 100px;
  background: #ffffff;
  border-radius: 0;
  border: none;
}
#chooseCookie {
  left: 5px;
  width: 277px;
  max-height: 150px;
  overflow-y: scroll;
  position: absolute;
  z-index: 1000;
  background-color: #ffffff;
  border: 1px solid #f8f8f8;
  top: 40px;
  padding: 10px 0;
  line-height: 26px;
}
#chooseCookie li {
  cursor: pointer;
  padding: 2px 10px;
}
#chooseCookie li:hover {
  background-color: #f8f8f8;
}
/*顶部图标*/

.topIcon {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}

#panel .outer {
  padding-top: 20px;
  height: 370px;
}

#panel .panel-body {
  padding: 0 30px 38px 30px;
}

#panel .nav {
  display: inline-block;
  border: none;
  height: 47px;
  line-height: 47px;
}

#panel .nav > li > a {
  color: #939ba4;
  padding: 10px 0;
  margin: 0 25px;
  font-size: 18px;
  text-decoration: none;
}

#pane1 .nav-tabs {
  border: none;
}

.nav-tabs > li {
  float: left;
  margin-bottom: -1px;
}
.tab-content {
  margin-top: -1px;
  background: #fff;
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

.drop-down {
  position: absolute;
  top: 14px;
  right: 16px;
  color: #248bfe;
  cursor: pointer;
}

.inputBox:-webkit-autofill {
  background-color: #edf0f4;
  color: #bdc7d3;
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
  font-size: 32px;
  line-height: 32px;
}

.codePic {
  width: 184px;
  height: 184px;
  margin: 0 auto;
  background-color: #000;
  margin-top: 55px;
  background: url("../../../static/img/downloadCode.png") center center
    no-repeat;
  background-size: contain;
}

#passwordIcon {
  position: absolute;
  right: 10px;
  top: 3px;
  padding: 10px;
  cursor: pointer;
}

/*下载按钮*/

.downloadBtn {
  position: absolute;
  right: 100px;
  top: 490px;
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
#myTabContent {
  padding: 40px 8.5% 0;
}

.form-horizontal .form-group {
  margin-left: 0;
  margin-right: 0;
  margin-bottom: 20px;
}

/*短信验证码*/

.getCode {
  position: relative;
  top: -49px;
  left: 164px;
  font-size: 16px;
  cursor: pointer;
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
/*获取验证码*/

#getCodeBox .text-gray1 {
  color: #bdc7d3;
}

.closeIcon {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}

input:-webkit-autofill,
textarea:-webkit-autofill,
select:-webkit-autofill {
  -webkit-box-shadow: 0 0 0 20px #edf0f4 inset;
}

/*提示信息*/

.warnTxt {
  font-size: 12px;
  padding-left: 5px;
  margin-top: -9px;
  position: absolute;
}
#warnTxt2 {
  margin-top: -32px;
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
  background: url(../../../static/img/btnBg.png) top center no-repeat;
  background-size: contain;
}
#logOnBtnBg2 {
  margin-top: 7px;
}
.logOnBtn {
  width: 95%;
  margin: 0 auto;
  cursor: pointer;
}
.logBtnBg {
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
#loginCode {
  width: 100%;
  height: 100%;
  background-color: #fff;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
}
.loginCode .warn {
  color: #bdc7d2;
  margin-top: -31px;
}

.loginCode .warn p {
  margin: 0;
  text-align: center;
  display: block;
  font-size: 12px;
  line-height: 20px;
}

.loginCode .bottomTxt {
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 30px;
  text-align: center;
}

.loginCode .bottomTxt a,
.loginCode .bottomTxt span {
  cursor: pointer;
  color: #939ba4;
  text-decoration: none;
}
#codeShade {
  cursor: pointer;
  display: none;
  text-align: center;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  padding-top: 43px;
}

#scanIcon {
  width: 45px;
  margin-bottom: 20px;
}

#scanTxt {
  color: #fff;
  text-align: center;
  font-size: 14px;
}
#scanTxt {
  color: #fff;
  text-align: center;
  font-size: 14px;
}
#refresh {
  cursor: pointer;
}
.loginCode .title {
  color: #248bfe;
  text-align: center;
  font-size: 18px;
  padding: 32px 0 0;
}

.loginCode .codeImg {
  width: 241px;
  height: 241px;
  padding: 38px;
  background: center center no-repeat;
  background-size: cover;
  margin: 0 auto;
  margin-top: -10px;
}
/*自动登录*/
.autoLogOn label {
  font-weight: 500;
}

.autoLogOn label i {
  top: 3px;
}
#panel label input[type="checkbox"] {
  display: none;
}
#panel label input[type="checkbox"]:checked + i:before {
  content: "\2714";
  color: #fff;
  font-size: 12px;
  border-color: #248bfe;
  background-color: #248bfe;
  line-height: 14px;
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
  position: relative;
  top: 2px;
}

/*忘记密码*/

.line {
  margin: 0 5px;
  display: inline-block;
  width: 1px;
  height: 10px;
  background-color: #e2e4e8;
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

.forgetPassword:hover {
  color: #939ba4;
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
/*滚动条样式修改*/
#chooseCookie::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 4px;
}
#chooseCookie::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.2);
}
#chooseCookie::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
}
</style>
