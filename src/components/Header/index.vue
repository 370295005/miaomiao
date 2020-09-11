<template>
  <div>
    <header id="header">
      <h1>{{ title }}</h1>
    </header>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {
    title: {
      type: String,
      default: "喵喵电影"
    }
  }
};
</script>

<style scoped>
#header {
  width: 100%;
  height: 40px;
  color: rgb(37, 37, 37);
  background: #ffffff;
  border-bottom: 1px solid #ededed;
  position: relative;
}
#header h1 {
  font-size: 18px;
  text-align: center;
  line-height: 40px;
  font-weight: normal;
}
#header i {
  position: absolute;
  left: 7px;
  top: 50%;
  margin-top: -13px;
  font-size: 26px;
}
</style>
