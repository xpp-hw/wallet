<template>
     <div class='browse' id='browse'>
        <!-- <div class='browse-btn'>
            <p>+30E豆</p>
        </div> -->
        <div class='browse-img'>
            <img src='../../assets/images/walletActivity/index-browse-lihe.png'>
        </div>
        <div class='browse-text'>
            <p class='browse-text-p1'>{{mengchongtxt.uptxt}}</p>
            <p v-show="mengchongtxt.downtxt" class='browse-text-p2'>{{mengchongtxt.downtxt}}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'eBean',
    props: ['mengchongtxt'],
    components: {},
    data() {
        return {};
    }
};
</script>

<style lang="less" scoped>
.browse{
    width:1.5rem;
    height:1.66rem;
    position: fixed;
    bottom:1rem;
    left:0rem;
    /* border:1px solid #000; */
    z-index: 999;
  }
  
  .browse p{
    margin-block-start: 0;
    margin-block-end: 0;
  }
  
  .browse-btn,.browse-img,.browse-text{
    margin:0 auto;
    /* border:1px solid #000; */
  }
  
  .browse-btn{
    width:1.24rem;
    height:0.32rem;
    background: #f5552d;
    color:#fff;
    border-radius: 0.16rem;
    display: none;
  }
  
  .browse-btn p{
    font-size: 0.24rem;
    width:100%;
    text-align: center;
    line-height: 0.32rem;
  }
  
  .browse-img{
    width:1.26rem;
    height:1.19rem;
    position: absolute;
    top:0.1rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: -1;
  }
  
  .browse-img img{
    width:100%;
  }
  
  .browse-text{
    width:1.09rem;
    // height:0.62rem;
    position: absolute;
    top:1.07rem;
    left:50%;
    transform: translateX(-47%);
    background: rgba(0, 0, 0, 0.7);
    border-radius: 0 0 0.2rem 0.2rem;
  }
  
  .browse-text p{
    font-size: 0.2rem;
    height:0.31rem;
    line-height: 0.31rem;
    width:100%;
    text-align: center;
    color:#d3d3d3;
  }
 
</style>
