<template>
    <div class="forget">
        <nav id="navbar" class="navbar navbar-default">
    <div class="container">
        <div class="navbar-header">
            <a href="javascript:void(0)" class="navbar-brand">乐建工程宝</a>
        </div>
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        </div>
    </div>
</nav>
<div id="body" class="container-fluid">
    <div id="container" class="container">
        <div id="step-box" class="clearfix">
            <div class="step-item" id="step1-info" :class="{'active': step == 1}">
                <div class="title">安全验证</div>
                <div class="number">1</div>
                <div class="line"></div>
            </div>
            <div class="step-item" id="step2-info" :class="{'active': step == 2}">
                <div class="title">密码重置</div>
                <div class="number">2</div>
                <div class="line"></div>
            </div>
        </div>
        <div id="form-box">
            <form  class="form-horizontal">
                <div class="form-group" style="height: 30px;margin-bottom:0px;">
                    <label class="col-sm-2 control-label"></label>
                    <div class="col-sm-9">
                        <div id="alert" class="text-danger" role="alert" v-if="alert">{{alert}}</div>
                    </div>
                </div>
            </form>
            <form id="step1-from" class="form-horizontal" v-if="step == 1">
                <div class="form-group">
                    <Row :gutter="16">
        <Col span="4">
            <div style="line-height:32px">手机号</div>
        </Col>
        <Col span="14">
            <div>
                           <Input v-model="telephone" placeholder=""/>
            </div>
        </Col>
        <Col span="6">
        <Button type="primary" ghost @click="getCode">{{sendCode}}</Button>
        </Col>
    </Row>
                </div>
                <div class="form-group" style="margin-bottom: 30px;">
                     <Row :gutter="16">
        <Col span="4">
            <div style="line-height:32px">验证码</div>
        </Col>
        <Col span="20">
            <div>
                <Input v-model="code" placeholder=""/>
            </div>
        </Col>
    </Row>
                </div>
                <div class="form-group">
                    <div style="text-align:center">
                        <Button type="primary" ghost style="padding:6px 33px;font-size:16px" @click="next">下一步</Button>
                    </div>
                </div>
            </form>
            <form id="step2-from" class="form-horizontal" v-if="step == 2">
                <div class="form-group">
                     <Row :gutter="16">
        <Col span="4">
            <div style="line-height:32px">新密码</div>
        </Col>
        <Col span="20">
            <div>
                <Input v-model="newPassword" placeholder="" type="password"/>
            </div>
        </Col>
    </Row>
                </div>
                <div class="form-group" style="margin-bottom: 30px;">
                     <Row :gutter="16">
        <Col span="4">
            <div style="line-height:32px">重复密码</div>
        </Col>
        <Col span="20">
            <div>
                <Input v-model="againPassword" placeholder="" type="password"/>
            </div>
        </Col>
    </Row>
                </div>
                <div class="form-group">
                     <div style="text-align:center">
                        <Button type="primary" ghost style="padding:6px 33px;font-size:16px" @click="complate">完成</Button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
    </div>
</template>
<script>
import ForgetPassword from "./module";
export default {
  name: "ForgetPassword",
  data() {
    return {
      telephone: "",
      code: "",
      step: 1,
      newPassword: "",
      againPassword: "",
      alert: null,
      interval: null,
      timer: null,
      sendCode: '发送验证码',
    };
  },
  methods: {
    //获取验证码
    getCode() {
      let self = this;
      if (self.interval) {
        return;
      }
      if (!/^1\d{10}$/.test(self.telephone)) {
        self.alert = "手机格式不正确";
        return;
      }
      self.alert = null;
      let params = {
        mobile: self.telephone,
      };
      ForgetPassword.forgetPassword.passwordFindValidCode(JSON.stringify(params)).then(res => {
        if (res.error) {
          self.alert = res.error.message;
        } else {
          self.interval = 60;
          self.timer = setInterval(function() {
            self.sendCode = self.interval + '秒';
            self.interval--;
            if (self.interval == 0) {
              self.interval = "发送验证码";
              clearInterval(self.timer);
            }
          }, 1000);
        }
      });
    },
    //下一步
    next() {
      let self = this;
      if (!self.telephone) {
        self.alert = "请填写手机";
        return;
      }
      if (!/^1\d{10}$/.test(self.telephone)) {
        self.alert = "手机格式不正确";
        return;
      }
      if (self.code == "") {
        self.alert = "请填写验证码";
        return;
      }
      self.alert = null;
      let params = {
        mobile: self.telephone,
        validCode: self.code
      };
      ForgetPassword.forgetPassword.passwordFindValidCodeCheck(JSON.stringify(params)).then(res => {
        if (res.error) {
          self.alert = res.error.message;
        } else {
          self.alert = null;
          clearInterval(self.timer);
          this.step = 2;
        }
      });
    },
    // 完成
    complate() {
      let self = this;
      if(!self.newPassword){
        self.alert = "请填写新密码";
        return;
      }
      if(!/^[\x21-\x7eA-Za-z0-9`！￥…（）—【】、；：‘“，《。》、？]{8,20}$/.test(self.newPassword)){
          self.alert = "新密码为8-20位数字、字母或特殊字符";
          return;
      }
      if(!/^[\x21-\x7eA-Za-z0-9`！￥…（）—【】、；：‘“，《。》、？]{8,20}$/.test(self.againPassword)){
          self.alert = "重复密码为8-20位数字、字母或特殊字符";
          return;
      }
      if(self.newPassword != self.againPassword){
          self.alert = "两次密码不相同";
          return;
      }
      let params = {
        mobile: self.telephone,
        validCode: self.code,
        newPassword: self.newPassword
      }
       ForgetPassword.forgetPassword.passwordFind(JSON.stringify(params)).then(res => {
        if (res.error) {
          self.alert = res.error.message;
        } else {
         this.$router.push({
                path: "/login"
              });
        }
      });
    }
  }
};
</script>
<style scoped>
#navbar {
  border-radius: 0;
}
.navbar-default {
  background-color: #248bfe;
}
.navbar-brand {
  font-size: 18px;
  color: #fff;
}
#container {
  width: 1000px;
  position: relative;
  padding: 0;
}

#step-box {
  width: 666px;
  margin: 80px auto 0 auto;
}
.form-horizontal .control-label {
  color: #333333;
  padding-right: 0;
  text-align: right;
  margin-bottom: 0;
  padding-top: 7px;
  float: left;
}
.step-item {
  float: left;
  width: 333px;
  height: 100px;
  position: relative;
}

.step-item .title {
  width: 4em;
  height: 30px;
  color: #ccc;
  margin: 0 auto;
}

.step-item .number {
  width: 30px;
  height: 30px;
  border-radius: 15px;
  margin: 0 auto;
  text-align: center;
  line-height: 30px;
  color: #fff;
  background: #bdc7d2;
}

.step-item .line {
  position: absolute;
  top: 42px;
  width: 100%;
  height: 4px;
  background: #e2e4e8;
  z-index: -1;
}

.step-item.active .title {
  color: #248bfe;
}

.step-item.active .number {
  background: #248bfe;
  -webkit-box-shadow: 0 6px 12px rgba(162, 215, 252, 0.5);
  box-shadow: 0 6px 12px rgba(162, 215, 252, 0.5);
}

.step-item.active .line {
  background: #248bfe;
}

#form-box {
  width: 440px;
  margin: 0 auto;
}

.btn-basic.btn-primary {
  background-color: transparent;
  border-width: 1px;
  color: #248bfe;
}

.form-horizontal .control-label {
  color: #333333;
  padding-right: 0;
}
</style>
