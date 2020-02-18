<template>
  <div id="app">
    <header class="header">
      <div class="input-box">
        <input type="text" />
      </div>
    </header>
    <main class="main">
      <div class="content">
        <router-view />
      </div>
    </main>
    <footer class="footer">
      <router-link v-for="(item,index) in footerData" :key="index" :to="item.path">{{item.title}}</router-link>
    </footer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      footerData: [
        {
          title: "首页",
          path: "/"
        },
        {
          title: "订单",
          path: "/order"
        },
        {
          title: "我的",
          path: "/mine"
        }
      ]
    };
  }
};
</script>
<style lang="scss">
* {
  padding: 0;
  margin: 0;
  list-style: none;
}
html,
body {
  width: 100%;
  height: 100%;
}
.header {
  width: 100%;
  height: 45px;
  background: #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  .input-box {
    width: 80%;
    height: 70%;
    margin: 15% 10%;
    input {
      width: 100%;
      height: 100%;
    }
  }
}
.main {
  flex: 1;
  height: 100%;
  overflow: auto;
}
.content {
  width: 100%;
  height: 100%;
}
.footer {
  width: 100%;
  height: 45px;
  background: #ccc;
  display: flex;
  a {
    flex: 1;
    text-align: center;
    line-height: 45px;
  }
}
#app {
  width: 100%;
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
}
a {
  font-weight: bold;
  color: #2c3e50;

  &.router-link-exact-active {
    color: #42b983;
  }
}
</style>
