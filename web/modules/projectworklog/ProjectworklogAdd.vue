<template>
  <div class="animated fadeIn">
    <Row class="announce-add-top">
      <Col span="12">&nbsp;</Col>
      <Col span="12">
      <Button type="primary" @click="addKnowLedge()" size="large">保存</Button>
      <Button type="default" @click="cancel('knowledgeList')" size="large">取消</Button>
      </Col>
    </Row>
    施工日志 模块
  </div>
</template>

<script>
    export default {
        name: 'projectworklog-add'
    }
</script>
