<template>
  <div>
    <router-view v-wechat-title="$route.meta.title"></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rightsMap: new Map([
        [
          "T3Rights",
          {
            topContent: "T3出行-打车券包",
            ticketImgUrl: require("../../assets/images/flexibleBilling/T3Ticket.png"),
            detailsImgUrl: require("../../assets/images/flexibleBilling/T3Details.png"),
            productId: "CPI2023080900001",
          },
        ],
        [
          "yhRights",
          {
            topContent: "永辉生活-购物红包",
            ticketImgUrl: require("../../assets/images/flexibleBilling/yhTicket.png"),
            detailsImgUrl: require("../../assets/images/flexibleBilling/yhDetails.png"),
            productId: "CPI2023080900002",
          },
        ],
      ]),
    };
  },
  props: {
    rightsType: {
      type: String,
    },
  },
  provide() {
    return {
      rightsType: this.rightsType,
      rights: this.rights,
      productIds: this.productIds,
      icons: this.icons,
    };
  },
  computed: {
    rights() {
      return this.rightsMap.get(this.rightsType);
    },
    productIds() {
      let productIds = [];
      for (const [key, value] of this.rightsMap) {
        console.log(value.productId);
        productIds.push(value.productId);
      }
      return productIds;
    },
    icons() {
      let icons = new Map();
      for (const [key, value] of this.rightsMap) {
        console.log(value.productId);
        icons.set(value.productId, key);
      }
      return icons;
    },
  },
  methods: {},
};
</script>
