<template>
  <div class="subsidebar">



</div>
</template>
<script>
import SubSidebarNavItem from "./SubSidebarNavItem";
import SubSidebarNavButton from "./SubSidebarNavButton";
import SubSidebarNavLable from "./SubSidebarNavLable";
export default {
  name: "sub-subsidebar",
  props: {
    title: {
      type: String,
      default: ""
    },
    navSubItems: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  components: {
    SubSidebarNavItem,
    SubSidebarNavButton,
    SubSidebarNavLable
  },
  methods: {
    lableClick(item) {
        if (item.path.substring(0, 4) === "http") {
          window.open(item.path);
        } else {
             window.sessionStorage.clear();
          this.$router.push({
            name: item.name
          });
        }
    }
  }
};
</script>

<style lang="css">
.nav-link {
  cursor: pointer;
}
</style>
