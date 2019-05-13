<template>
  <b-modal class="w-700" id="readModal" size="lg"  ref="gcbReadRecord">
    <div slot="modal-header">浏览记录</div>

      <Row>
        <Col span="24">
          <Input @click.native="search()" @keyup.native.enter="search()" v-model="searchText" style="margin-bottom: 10px;" icon="ios-search" placeholder="请输入用户姓名查询"></Input>
      </Col>
      </Row>
    <Row type="flex" justify="center" :gutter="8" align="bottom" class="code-row-bg readHistory" v-if="options.type == 'announce'">
      <Col span="4" style="margin-right: 12px"><i-button v-bind:class="{ active: isRead == null }" @click="isRead = null;search(isRead)" size="large">全部（{{options.params.amount}}）</i-button></Col>
      <Col span="4"><i-button v-bind:class="{ active: isRead == true }" @click="isRead = true;search(isRead)" size="large">已读（{{options.params.read}}）</i-button></Col>
      <Col span="4"><i-button v-bind:class="{ active: isRead == false }" @click="isRead = false;search(isRead)" size="large">未读（{{options.params.unread}}）</i-button></Col>
    </Row>
    <Row class="employ-tree">
      <div class="table-box">
        <table class="table table-striped table-hover ">
          <thead>
          <tr>
            <th class="text-left">部门</th>
            <th class="text-left">姓名</th>
            <th class="text-left">时间</th>
          </tr>
          </thead>
          <tbody>
          <tr v-if="options.type == 'report'" v-for="data in options.datas">
            <td class="text-left">{{data.departmentName}}</td>
            <td class="text-left">{{data.employeeName}}</td>
            <td class="text-left" v-if="!data.createTime">未读</td>
            <td class="text-left" v-if="data.createTime">{{data.createTime | parseTime}}</td>
          </tr>
           <tr v-if="options.type == 'announce'" v-for="data in options.datas">
            <td class="text-left">{{data.employee.department.departmentName}}</td>
            <td class="text-left">{{data.employee.employeeName}}</td>
            <td class="text-left" v-if="!data.createTime">未读</td>
            <td class="text-left" v-if="data.createTime">{{data.createTime | parseTime}}</td>
          </tr>
          </tbody>
        </table>
      </div>

    </Row>

    <div slot="modal-footer">
      <Button type="primary" size="large" v-if="options.type == 'announce' && isRemind && options.hasPermission" @click="oneKeyRemind">一键提醒</Button>
      <Button disabled size="large" v-if="options.type == 'announce' && !isRemind">{{cdTime}}秒后再提醒</Button>
      <Button size="large" @click="close">关闭</Button>
    </div>

  </b-modal>
</template>
<style lang="less" scoped>
  .table > thead > tr > th {
  border: 0;
  background: #e6e6e6;
  padding: 10px 5px;
}
#readModal .buttons {
  text-align: center;
  margin-bottom: 15px;
}
#readModal .modal-footer button {
    width: 120px;
    margin-left: 20px;
  }
.readHistory {
  margin: 16px 0;
}
#readModal .active {
  background-color: #248bfe;
  color: #ffffff;
}
#readModal .table-box {
  height: 350px;
  overflow: auto;
}

#readModal .table tbody tr td {
  border-top: none;
}
</style>
<script>
import Component from "../module";
import Announce from "./../../modules/announce/module";
export default {
  data() {
    return {
      options: {
        datas: {},
        type: "",
        params: {},
        announcementId: null,
        hasPermission: false
      },
      selectItem: {},
      isRead: null,
      searchText: "",
      isRemind: true,
      cdTime: 59
    };
  },
  computed:{

  },
  methods: {
    itemSelect(node) {
      this.selectItem = node;
    },
    handleAction(button) {
      this.$emit("action", button);
    },
    open() {
      this.$refs.gcbReadRecord.show();
    },
    close() {
      this.$refs.gcbReadRecord.hide();
    },
    search() {
      if (this.options.type == "announce") {
        let postInfo = { announcementId: this.options.announcementId, condition: this.searchText, isRead: this.isRead };
        Announce.api.announce.historySearch(postInfo).then(res => {
          this.options.datas = res;
        });
      }
    },
    oneKeyRemind() {
       Announce.api.announce.oneKeyRemind({id:this.options.announcementId}).then(res => {
         this.isRemind = false;
         this.cdTime = 59;
          let stop = window.setInterval(() => {
                                    this.cdTime--;
                                    if (this.cdTime === 0) {
                                        window.clearInterval(stop);
                                        this.isRemind = true;
                                    }
                                }, 1000);
         this.$gcb.tooltip.open({
                 message:"提醒成功",
               })
        });
    }
  },
  mounted() {
  }
};
</script>

