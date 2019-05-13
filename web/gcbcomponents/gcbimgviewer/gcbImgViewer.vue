<template>
  <div id="app" ref='viewer'>
    <viewer :options="options" :images="options.images"
            @inited="inited"
            class="viewer" ref="viewer"
    >
      <template slot-scope="scope">
        <img v-for="src in scope.options.images" :src="src" :key="src">
        {{scope.options}}
      </template>
    </viewer>
  </div>
</template>
<script>
import "viewerjs/dist/viewer.css";
import Viewer from "v-viewer/src/component.vue";
export default {
  components: {
    Viewer
  },
  data() {
    return {
      $viewer: null,
      options: {
        images: [],
        index: ""
      }
    };
  },
  methods: {
    inited(viewer) {
      $(".viewer-container").remove();
      this.$viewer = viewer;
      viewer.view(this.options.index);
      $(".viewer-canvas .viewer-title").remove();
      $(".viewer-toolbar ul").append(
        '<li id="viewer-download"><img src="../../../static/img/download1.png"></li>'
      );
      $("#viewer-download").click(function() {
        var href = $(".viewer-canvas img").attr("src");
        window.open(href, "_blank");
      });
    }
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
.viewer-container {
  z-index: 0;
  width: 700px;
  height: 525px;
}
</style>
