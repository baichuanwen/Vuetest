<template>
  <div class="animated fadeIn">
    <Row class="order-top">
        <h4>订单中心</h4>
    </Row>
    <Row class="order-header">
      <table class="gcb-table">
          <thead>
            <tr>
                <th style="width:40% ">订单详情</th>
                <th>服务类型</th>
                <th>金额</th>
                <th>提交人</th>
                <th>全部状态</th>
                <th>操作</th>
            </tr>
          </thead>
      </table>
    </Row>
    <Row>
      <!--<table class="table table-striped table-hover" ng-repeat="item in items track by $index" ng-class="{true:'table-blue',false:'table-edf'}[item.orderStatus == 1]" >
            <thead >
            <tr>
                <th>{{item.createTimeToString}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 订单号：{{item.orderNo}}</th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            <tr >
                <td style="width:40% ">
                    <div>{{item.orderType==1?"开通":item.orderType==2?"续费":"升级"}}人数：{{item.payMinNum}}-{{item.payMaxNum}}人</div>
                    <div ng-show="item.orderType!=3">{{item.orderType==1?"开通":item.orderType==2?"续费":"升级"}}年限：{{item.payYears }}年</div>
                </td>
                <td class="sty-td">{{item.orderType==1?"开通":item.orderType==2?"续费":"升级"}}</td>
                <td class="sty-td">￥{{item.payMoney|number:2}}</td>
                <td class="sty-td">{{item.employeeName}}</td>
                <td class="sty-td">
                    <div ng-show="item.orderStatus == 1">等待付款</div>
                    <div ng-show="item.orderStatus == 2">支付完成</div>
                    <div ng-show="item.orderStatus == 3">{{item.orderType==1?"开通成功":item.orderType==2?"续费成功":"升级成功"}}</div>
                    <div ng-show="item.orderStatus == 4">订单取消</div>
                    <div class="action" click-and-disable="orderDetail(item.id)">订单详情</div>
                    <div ng-show="item.isOpenInvoice == 1">
                        <div ng-show="item.invoiceStatus == 2">发票已开具</div>
                        <div ng-show="item.invoiceStatus == 1">发票已申请</div>
                    </div>
                </td>
                <td class="sty-td">
                    <div><button class="btn btn-primary btn-width-70" ng-show="item.orderStatus == 1" click-and-disable="goPayment(item.id)" >去付款</button></div>
                    <div class="action" ng-show="(!item.isOpenInvoice)&&item.orderStatus == 3" click-and-disable="askForInvoices(item.id,item.orderNo)">索要发票</div>
                    <div class="action" ng-show="item.orderStatus == 1" ng-click="createCancelModal(item.id)" >取消订单</div>
                </td>
            </tr>
            </tbody>
        </table>-->
    </Row>
  </div>
</template>

<script>
    import System from '../module'
    export default {
        name: 'position',
        data() {
            return {
                listData: [],
            }
        },
        methods: {

        },
        mounted() {
            const self = this

            System.api.orderCenter.orderList({}).then(orders => {
                self.listData = orders
            })
        }
    }
</script>
<style lang="less" scoped>
    .order-top {
        padding: 10px;
        border-bottom: 1px solid #ccc;
        margin: 0 0 15px 0;
    }
    
    .order-header {
        .gcb-table {
            font-size: 12px;
            font-weight: 500;
        }
    }
</style>