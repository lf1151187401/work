<template>
  <div class="home">
    <div class="m_top">
      <div class="text">猜你喜欢</div>
    </div>
    <div class="m_main">
      <ul class="ul">
        <li v-for="(item,index) in shoplist" :key="index">
          <div class="li_left">
            <img :src="item.Img" />
          </div>
          <div class="li_right">
            <div class="li_right_top">{{item.ShopTitle}}</div>
            <div class="li_right_bottom">
              <div class="store">
                <div class="store_left">
                  <span class="Up_to_send">￥{{item.UpToSend}}</span>
                  <span class="Up_to">￥{{item.ToSend}}</span>
                </div>
                <div class="store_right">
                  <span class="min">{{item.Min}}分钟</span>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  data() {
    return {
      shoplist: []
    };
  },
  created() {
    this.Http();
  },
  methods: {
    async Http() {
      let res = await this.$http("get", "/api/getlist");
      console.log(res);
      if (res.data.code === 0) {
        this.shoplist = res.data.data;
      }
    }
  }
};
</script>
<style lang="scss">
.home {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.m_top {
  width: 100%;
  height: 50px;
  text-align: center;
  line-height: 50px;
  border-bottom: 1px solid #ccc;
}

.m_main {
  width: 100%;
  height: 100%;
  .ul li {
    width: 90%;
    height: 100px;
    margin: 10px 5%;
    border: 1px solid #ccc;
    display: flex;
    .li_left {
      flex: 3;
      border: 1px solid #ccc;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .li_right {
      flex: 7;
      .li_right_top {
        width: 90%;
        height: 10%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 5%;
        font-size: 15px;
      }
      .li_right_bottom {
        width: 100%;
        height: 100%;
        .store {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: space-between;
          align-content: center;
          .store_left {
            margin-left: 10px;
          }
          .store_right {
            margin-right: 10px;
          }
        }
      }
    }
  }
}
</style>
