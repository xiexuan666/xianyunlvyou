<template>
  <div class="map">
    <span>
      <span role="link" class="el-breadcrumb_item">酒店</span>
      <i class="el-icon-arrow-right"></i>
      <span>佛山市酒店预订</span>
    </span>
    <script
      type="text/javascript"
      src="https://webapi.amap.com/maps?v=1.4.15&key=d57fb27f29d1937aee6f0a34834ffc4c"
    ></script>

    <div id="container"></div>
  </div>
</template>

<script>
export default {
  mounted() {
    var map = new AMap.Map("container");
  }
};
</script>

<style lang="less" scoped>
#container {
  width: 300px;
  height: 300px;
  z-index: 99;
  right: 0px;
  bottom: 0px;
}</style
>>
