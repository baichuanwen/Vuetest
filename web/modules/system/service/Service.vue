<template>
  <div class="animated fadeIn">
    <Row class="service-panel">
      <Col>
          <Row>
              <Col span="20"><img class="form-logo" :src="buildDownloadUrl(companyInfo.logoUuid)" alt=""></Col>
              <Col span="4">还有 <span class="remain-days"> {{ remainingDays }} 天</span> 到期</Col>
          </Row>
      </Col>
      <Col>
          <b> {{ companyInfo.companyName }} </b>
          <p>简称： {{ companyInfo.simpleName ? companyInfo.simpleName : '-' }} </p>
          <p>启用人数：{{sevrice.activeEmployeeNum}}人&nbsp;&nbsp;&nbsp;&nbsp;付费人数：{{sevrice.payEmployeeNum}}人</p>
      </Col>
      <Col>
          <h3>存储空间</h3>
          <p>您当前使用了 {{usedSpace}}G / {{totalSpace}}G 剩余 {{spareSpace}}G</p>
          <Progress :percent="usedRate" status="active"></Progress>
      </Col>
      <br>
      <Col>
         <p>服务热线：400-060-0889</p>
      </Col>
    </Row>
  </div>
</template>
<script>
    import {
        buildDownloadUrl
    } from '@/libs/tools'
    import System from '../module'
    export default {
        data() {
            return {
                companyInfo: {},
                sevrice: {},
                // 
                remainingDays: 0,
                // 使用空间
                fixedSpace: 0,
                // 全部空间
                totalSpace: 0,
                // 使用空间
                usedSpace: 0,
                // 剩余空间
                spareSpace: 0,
                // 占比
                usedRate: 0
            }
        },
        methods: {
            saveClick() {
                // 还没实现编码
            },
            buildDownloadUrl(uuid) {
                return buildDownloadUrl(uuid)
            }
        },
        mounted() {
            System.api.company.info({}).then(company => {
                this.companyInfo = company
            })
            System.api.companyService.info({}).then(sevrice => {
                let serverDate = new Date();
                let endDate = new Date(sevrice.payEndTime || sevrice.tryEndTime);
                let serverTime = serverDate.getTime();
                let endTime = endDate.getTime();
                if (serverTime < endTime) {
                    this.remainingDays = Math.ceil((endTime - serverTime) / 1000 / 60 / 60 / 24);
                }

                this.sevrice = sevrice
                this.fixedSpace = sevrice.fixedSpace
                this.totalSpace = (sevrice.freeSpace + sevrice.fixedSpace + sevrice.paySpace).toFixed(1)
                this.usedSpace = (sevrice.usedSpace / 1024 / 1024 / 1024).toFixed(1)
                this.spareSpace = (this.totalSpace - this.usedSpace).toFixed(1)
                this.usedRate = (((this.usedSpace * 1) / (this.totalSpace * 1)) * 100).toFixed(2)
            })
        }
    }
</script>
<style lang="less" scoped>
    .service-panel {
        span {
            font-size: 14px!important;
        }
        b {
            display: inline-block;
            margin: 10px 0;
        }
        h3 {
            margin: 30px 0 15px;
        }
        .remain-days {
            display: inline;
            padding: .2em .5em .3em .7em;
            font-size: 75%;
            font-weight: bold;
            line-height: 1;
            color: #fff;
            text-align: center;
            white-space: nowrap;
            vertical-align: baseline;
            border-radius: .25em;
            background-color: #ff7c34;
        }
        .form-logo {
            max-height: 200px;
            padding: 4px;
            line-height: 1.42857143;
            background-color: #fff;
            border: 1px solid #ddd;
            border-radius: 3px;
            -webkit-transition: all .2s ease-in-out;
            -o-transition: all .2s ease-in-out;
            transition: all .2s ease-in-out;
            display: inline-block;
            max-width: 100%;
            margin-top: 15px;
        }
        .form-tip {
            font-size: 14px;
            color: #939ba4;
        }
    }
</style>