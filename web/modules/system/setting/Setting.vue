<template>
  <div class="animated fadeIn">
    <Row class="setting-top">
        <h4>企业信息</h4>
    </Row>
    <Form ref="formValidate" class="setting-form">
        <FormItem>
            <Col span="3"><span>企业号:</span></Col>
            <Col span="12" offset="1"><span>@{{ companyInfo.companyNo }}</span></Col>
        </FormItem>
        <FormItem>
            <Col span="3"><span>企业logo:</span></Col>
            <Col span="12" offset="1">
              <Button type="primary" size="large">上传文件</Button>
              <p class="form-tip">支持jpg、jpeg、png、bmp格式 <br> 图片小于5M（尺寸80*80像素），超过此尺寸会被压缩并降低质量</p>
              <img class="form-logo" :src="buildDownloadUrl(companyInfo.logoUuid)" alt="">
            </Col>
        </FormItem>
        <FormItem>
            <Col span="3"><span class="form-required">*</span><span> 企业名称:</span></Col>
            <Col span="12" offset="1">
              <Input size="large" v-model="companyInfo.companyName"></Input>
            </Col>
            <Col span="4" offset="1"><span class="form-tip">字数限制30字符</span></Col>
        </FormItem>
        <FormItem>
            <Col span="3"><span> 企业简称:</span></Col>
            <Col span="12" offset="1">
              <Input size="large" v-model="companyInfo.simpleName"></Input>
              <p class="form-tip">注：系统上显示简称</p>
            </Col>
            <Col span="4" offset="1"><span class="form-tip">字数限制30字符</span></Col>
        </FormItem>
        <FormItem>
            <Col span="3"><span class="form-required">*</span><span> 企业电话:</span></Col>
            <Col span="12" offset="1">
              <Input size="large" v-model="companyInfo.telphone"></Input>
            </Col>
        </FormItem>
        <FormItem>
            <Col span="3"></Col>
            <Col span="12" offset="4"><Button type="primary" @click="saveClick" size="large">保存</Button></Col>
        </FormItem>
    </Form>
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
                companyInfo: {}
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
        }
    }
</script>
<style lang="less" scoped>
    .setting-top {
        padding: 10px;
        border-bottom: 1px solid #ccc;
        margin: 0 0 15px 0;
    }
    
    .setting-form {
        span {
            font-size: 14px!important;
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
        .form-required {
            font-size: 14px;
            color: #ec412b;
        }
        .form-tip {
            font-size: 14px;
            color: #939ba4;
        }
        .ivu-col:first-child {
            text-align: right;
        }
    }
</style>