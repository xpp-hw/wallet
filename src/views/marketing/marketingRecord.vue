<template>
  <div class="page-record">
    <div class="page-record-body">
      <table
        class="record-table"
        cellpadding="0"
        cellspacing="0"
        style="width: 100%; border-collapse: collapse"
      >
        <tr>
          <th>时间</th>
          <th>名称</th>
          <th>状态</th>
        </tr>
        <tr v-for="(i, index) in list" :key="index">
          <td>{{ i.create_date }}</td>
          <td>{{ i.name }}</td>
          <td>{{ i.state }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
// import { orderCountQuery } from "@/api/firstLevelCashier";
import api from "@/common/apiUrls";
export default {
  data() {
    return {
      list: [],
    };
  },
  // watch: {
  //   // 监听路由对象中的变化
  //   $route: {
  //     handler: function (to, from) {
  //       // 如果路由发生变化，可以在这里执行刷新页面的逻辑
  //       window.location.reload();
  //     },
  //     deep: true,
  //   },
  // },
  // computed: {
  //   ...mapState(["firstLevelCashier", "userData", "loading"]),
  // },
  mounted() {
    this.getOrderCountQuery();
  },
  methods: {
    trans(t) {
      return t < 10 ? "0" + t : t;
    },
    getTimes(timestampStr) {
      // 分割字符串为年、月、日、时、分、秒
      var year = parseInt(timestampStr.substring(0, 4), 10);
      var month = parseInt(timestampStr.substring(4, 6), 10) - 1; // 月份从0开始
      var day = parseInt(timestampStr.substring(6, 8), 10);
      var hours = parseInt(timestampStr.substring(8, 10), 10);
      var minutes = parseInt(timestampStr.substring(10, 12), 10);
      var seconds = parseInt(timestampStr.substring(12, 14), 10);

      // 使用Date构造函数创建Date对象
      var date = new Date(year, month, day, hours, minutes, seconds);
      let y = date.getFullYear(),
        m = date.getMonth() + 1,
        d = date.getDate(),
        h = date.getHours(),
        min = date.getMinutes(),
        s = date.getSeconds();
      return (
        y +
        "-" +
        this.trans(m) +
        "-" +
        this.trans(d) +
        " " +
        this.trans(h) +
        ":" +
        this.trans(min) +
        ":" +
        this.trans(s)
      );
    },
    getOrderCountQuery() {
      api
        .orderCountQuery({
          queryTyp: "01",
        })
        .then((data) => {
          data.sendInfoList.map((res) => {
            this.list.push({
              create_date: this.getTimes(res.sendTm),
              name: "1元话费",
              state: "已发放",
            });
          });
        });
    },
  },
};
</script>
<style lang="less" scoped>
.page-record {
  height: 100vh;
  background: url("~@/assets/images/marketing/record.png");
  background-size: cover;
  background-repeat: no-repeat;
  overflow: hidden;
  padding: 16% 82px 116px;
  box-sizing: border-box;
  &-body {
    height: 100%;
    overflow: auto;
  }
}
.record-table {
  text-align: center;
  th {
    background: #fff2e3;
    color: #39434a;
  }
  th,
  td {
    padding: 28px;
  }
  td:nth-child(1) {
    color: #676767;
  }
  td:nth-child(2) {
    color: #ed6a35;
  }
  td:nth-child(3) {
    color: #55b950;
  }
}
</style>