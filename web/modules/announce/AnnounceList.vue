<template>
  <div class="animated fadeIn">
    <div class="announce-search">
         <Input v-model="keyword" icon="ios-search" placeholder="输入发布人和标题查询" @click.native="search()" @keyup.native.enter="search()"></Input>
    </div>
     <div v-show="announceList.length" id="announce">
           <div class="items" v-for="item in announceList" @click="goDetail(item.id)">
        <div class="clearfix">
            <div class="pull-left is-read">
                <div class="items-title font-18" v-bind:class="!item.isRead?'items-titles':'items-tit'">

                    <span class="col-333">{{item.title}}</span>
                    <img style="margin-bottom:8px" v-if="item.isTop" src="../announce/images/top_list.png">
                </div>
                <div class="items-content">{{item.summary}}</div>
                <div class="items-bottom">
                    <span>发布时间：{{item.createTime | parseTime}}</span>
                    <span>发布人：{{item.publisher}}</span>
                    <span class="col-248" @click="createReadModal($event,item)">
                        <label class="fa fa-eye"></label>浏览 {{item.browseCount}}
                    </span>
                    <span>
                    <label class="fa fa-flash"></label>附件 {{item.attachmentNum}}
                </span>
                </div>
            </div>
        </div>
        <hr/>
    </div>
    <Page class="gcb-page" :total="total" :current="postData.page" @on-change="changePage" show-total show-elevator ></Page>
     </div>
    <div class="gcb-data-null" v-show="!announceList.length">
        <img src="../announce/images/data-null.png" alt="">
        <p>暂无数据</p>
    </div>
  </div>
</template>
<script>
import Announce from "./module";
import { hasPermission, storage } from '@/libs/tools'
export default {
  // 页面组件名称
  name: "announce-list",
  // 数据
  data() {
    return {
      keyword: "",
      hasPermission: false,
      postData: {
        page: 1,
        pageSize: 10,
        searchText: null,
        isRead: false,
        messageType: 2
      },
      listIds: [],
      total: 0,
      announceList: [],
    };
  },
  // 调用方法
  methods: {
    search() {
      this.postData.searchText = this.keyword;
      let that = this;
      Announce.api.announce.listSearch(this.postData).then(result => {
         result.records.forEach(function (v, i) {
                            that.listIds[i] = v.id;
                        });
        this.announceList = result.records;
        this.total = result.total;
      });
    },
    changePage(page) {
      this.postData.page = page;
      this.search();
    },
    createReadModal($event, item) {
      let self = this;
      let postInfo = { announcementId: item.id, condition: null, isRead: null };
      Announce.api.announce.historySearch(postInfo).then(list => { 
          Announce.api.announce.recordSearch(postInfo).then(res => {
          this.$gcb.gcbReadRecord.open({ datas: list, type: "announce", params:res, announcementId: item.id, hasPermission: hasPermission(116) || hasPermission(117)});
         })
      });
      $event.stopPropagation();
    },
    goDetail(id) {
      sessionStorage.setItem('vueParams', JSON.stringify(this.postData));
      this.$router.push({name: "announceDetail", params: {id: {id: id, listIds: this.listIds, total: this.total}}})
    }
  },
  // 创建前状态
  beforeCreate: function() {},
  // 创建完毕状态
  created: function() {},
  //  挂载前状态
  beforeMount: function() {},
  // 挂载结束状态
  mounted: function() {
    if(sessionStorage.getItem('vueParams')){
      this.postData = JSON.parse(sessionStorage.getItem('vueParams'));
      this.keyword = this.postData.searchText;
      this.search(this.postData);
    }else{
      this.search(this.postData);
    }
  }
};
</script>
<style lang="less"  slot-scope="true">
.announce-search {
  text-align: right;
  margin-top: 15px;
  margin-bottom: 10px;
  input {
    width: 300px;
    font-size: 14px;
  }
}
#announce {
  padding-bottom: 150px;
  .gcb-page {
    margin-top: 20px;
    text-align: center;
  }
  .font-18 {
    font-size: 18px;
  }

  .col-333 {
    color: #333;
    padding-right: 10px;
  }

  .col-248 {
    color: #248bfe;
  }

  .main {
    background-color: #fff;
  }

  .is-read {
    position: relative;
  }

  .items {
    padding: 0px 30px;
    /*border-bottom: 1px solid gray;*/
  }

  .items:hover {
    cursor: pointer;
    background-color: #f1f1f1;
  }

  .items:hover .items-title {
    color: #0093dd;
  }

  .items-title {
    font-weight: bold;
    padding: 40px 0px 30px 0px;
  }

  .items-tit::before {
    content: "";
    display: inline-block;
    position: absolute;
    top: 45px;
    left: -20px;
  }

  .items-titles::before {
    content: "";
    display: inline-block;
    width: 13px;
    height: 13px;
    background-color: red;
    border-radius: 50%;
    position: absolute;
    top: 45px;
    left: -20px;
  }

  .items-content {
    line-height: 21px;
    margin-bottom: 30px;
    color: #939ba4;
    overflow: hidden;
    max-height: 63px;
    word-break: break-all;
  }

  .items-bottom {
    color: #939ba4;
    padding-bottom: 40px;
  }

  .items-bottom label {
    color: gray;
    padding-right: 8px;
  }

  .items-bottom span {
    width: 100px;
  }

  .items-bottom span:first-child {
    padding-right: 20px;
  }

  .items-bottom span:not(:first-child) {
    padding: 0px 15px;
  }

  .items hr {
    margin-top: 10px;
    margin-bottom: 0px;
  }
}
</style>