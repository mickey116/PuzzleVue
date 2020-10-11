<template>
  <div class="my-5">
    <ul class="progressbar list-unstyled d-flex justify-content-between">
      <li class="active">查看購物明細</li>
      <li >填寫訂單資料</li>
      <li >確認訂單完成</li>
    </ul>
  </div>
</template>

<script>
export default {

};
</script>

<style lang="scss">
// progressbar
  .progressbar {
    // 在父元素使用計數器 step是變數（自定義）
    counter-reset: step;
    li {
      width: 33.3%;
      position: relative;
      text-align: center;

      //上方數字(改為圖案)
      &:before {
        content: counter(step);
        // 把step累加上去 預設值為1
        counter-increment: step;
        width: 30px;
        height: 30px;
        line-height: 26px;
        border: 2px solid #ddd;
        display: block;
        text-align: center;
        margin: 0 auto 10px auto;
        border-radius: 50%;
        background-color: white;
      }
      // 後方線條
      &:after {
        content: '';
        position: absolute;
        width: 100%;
        height: 2px;
        background-color: #ddd;
        top: 15px;
        left: -50%;
        z-index: -9;
      }
      // 去除最前方的線
      &:first-child {
        &:after {
          content: none;
        }
      }
    }
  }
  .progressbar li.active{
    color:  #00346D;
    &:before {
      border-color:  #00346D;
      color:  #00346D;
    }
  }
  // active的狀態下 li後面的線條改變顏色
  .progressbar li.active + li:after {
    background-color: #00346D;
  }

</style>
