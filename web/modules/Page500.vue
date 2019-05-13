<template>
  <div class="flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="6">
          <div class="clearfix">
            <h1 class="float-left display-3 mr-4">No</h1>
            <h4 class="pt-3">没有该模块权限!</h4>
            <p class="text-muted">请向管理员申请该模块权限.</p>
          </div>
          <!--<b-input-group>
            <b-input-group-prepend>
              <b-input-group-text>
                <i class="fa fa-search"></i>
              </b-input-group-text>
            </b-input-group-prepend>
            <input id="prependedInput" class="form-control" size="16" type="text" placeholder="What are you looking for?">
            <b-input-group-append>
              <b-button variant="info">Search</b-button>
            </b-input-group-append>
          </b-input-group>-->
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'Page500'
    }
</script>