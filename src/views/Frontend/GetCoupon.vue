<template>
  <div class="getcoupon container">
    <AlertMessage/>
    <!-- banner -->
    <div class="couponbannerbox">
      <div class="couponbanner mb-4  mt-3 mt-lg-0"
      :style="{backgroundImage: `url(${img.banner})` }">
      </div>
      <h2 class="mb-0">專屬優惠</h2>
    </div>
    <!-- main -->
    <div class="couponbox mx-auto"
    :style="{backgroundImage: `url(${img.bg1})` }">
      <p class="text-primary">刮開你個人的專屬優惠大獎，多項折扣等你來拿，不限金額每筆訂單最高享有"五折"優惠，數量有限送完為止，早買早享受唷！</p>
      <!-- 刮刮樂區塊 -->
      <div class="main text-center ">
        <div class="prize">
          <p class="mb-0">恭喜獲得 <br>
          <span>{{prize}}</span> <br>
          大獎
          </p>
        </div>
        <div class="mt-2">結帳時輸入以下序號，即可獲得折扣優惠</div>
        <div class="coupon mt-3 d-flex justify-content-center align-items-center">
          <input id="input_code" type="text" readonly v-model="discount_code"/>
          <div class="btn btn-outline-primary copybtn"
            @click="clipboard()"
            ref="copy"
            data-clipboard-target="#input_code"
            >
            <i class="fas fa-copy"></i>
          </div>
        </div>
        <canvas id="myCanvas"></canvas>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery';
import AlertMessage from '@/components/AlertMessage.vue';

export default {
  name: 'GetCoupon',
  components: {
    AlertMessage,
  },
  data() {
    return {
      discount_code: '12345',
      copyBtn: null, // 儲存初始化複製按鈕事件
      prize: '八折',
      img: {
        bg1: 'https://hexschool-api.s3.us-west-2.amazonaws.com/custom/Ks9v02XEb4nThRFHYAN6IVCDVupEy3OgbqOsFPLzZOenm88z4fNMi067BSAUfEMVhiqUlJFKi2StRF3cNePTIPsPr5wH6saafwLMhutBuQ8XCjfxmWHmp61aoIhdf7jg.jpeg',
        banner:
          'https://hexschool-api.s3.us-west-2.amazonaws.com/custom/JmgReiZHDg7yjqzHTiUaZFBtOVdJVI4Zlpaeiygc1pwPwwxW6udpRZMMZIUczHFAJramsTDIuwnWgIgboFgL31wgkqpB2D6YmQqznxaKDU1vF95zSTZlR5peeKiKXGvo.jpeg',
      },
    };
  },
  mounted() {
    this.scratchInit();
    this.copyBtn = new this.Clipboard(this.$refs.copy);
  },
  methods: {
    clipboard() {
      this.$bus.$emit('message:push', '已複製序號，快去購物吧！', 'success');
    },
    scratchInit() {
      // 獲取畫布
      const myCanvas = document.getElementById('myCanvas');
      const parentDOM = document.getElementById('myCanvas').parentNode;
      const rect = myCanvas.getBoundingClientRect();
      myCanvas.width = parentDOM.clientWidth;
      myCanvas.height = parentDOM.clientHeight;
      // 獲取畫布當前寬高
      const X = myCanvas.width;
      const Y = myCanvas.height;
      // 獲取繪圖對象
      const area = myCanvas.getContext('2d');
      area.rect(0, 0, X, Y);
      area.fillStyle = '#ccc';
      area.fill();

      /* 增加觸摸監聽 */
      const device = /android|iphone|ipad|ipod|webos|iemobile|opear mini|linux/i.test(navigator.userAgent.toLowerCase());
      const startEvtName = device ? 'touchstart' : 'mousedown';
      const moveEvtName = device ? 'touchmove' : 'mousemove';
      const endEvtName = device ? 'touchend' : 'mouseup';

      /* 根據手指滑動路線，變透明 */
      function draw(event) {
        event.preventDefault();
        const x = device ? event.touches[0].pageX - rect.x : event.offsetX;
        const y = device ? event.touches[0].pageY - rect.y : event.offsetY;
        area.beginPath();
        area.globalCompositeOperation = 'destination-out';
        area.arc(x, y, 20, 0, Math.PI * 2, false);
        area.fill();
        area.closePath();
      }
      myCanvas.addEventListener(startEvtName, () => {
        myCanvas.addEventListener(moveEvtName, draw, false);
      }, false);

      myCanvas.addEventListener(endEvtName, () => {
        myCanvas.removeEventListener(moveEvtName, draw, false);
      }, false);
      // 扣除到一定程度 自動打開
      document.addEventListener(endEvtName, () => {
        /* 獲取imageData對象 */
        const imageDate = area.getImageData(0, 0, myCanvas.width, myCanvas.height);
        // 所有像素點
        const allPX = imageDate.width * imageDate.height;
        // 刮開的像素點
        let iNum = 0;
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < allPX; i++) {
          if (imageDate.data[i * 4 + 3] === 0) {
            // eslint-disable-next-line no-plusplus
            iNum++;
          }
        }
        // 刮開多少比例，canvas消失
        // eslint-disable-next-line no-mixed-operators
        if (iNum >= allPX * 3 / 10) {
          $('#myCanvas').fadeOut(500);
        }
      }, true);

      this.getPrize();
    },
    getPrize() {
      const prizes = ['八折', '五折', '九折'];
      const discount = Math.floor(Math.random() * prizes.length);
      // eslint-disable-next-line default-case
      switch (discount) {
        case 0:
          this.prize = '八折';
          this.discount_code = 'puzzle20off';
          break;
        case 1:
          this.prize = '五折';
          this.discount_code = 'puzzle50off';
          break;
        case 2:
          this.prize = '九折';
          this.discount_code = 'puzzle10off';
          break;
      }
    },

  },

};
</script>

<style lang="scss">
.getcoupon{
  min-height: 100vh;
}
// banner
.couponbannerbox {
  position: relative;
  .couponbanner {
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  height: 250px;
  opacity: 0.7;
  }
  h2 {
    background:rgba(62, 115, 188, 0.91);
    color:white;
    padding: 10px 30px;
    position:absolute;
    top:50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
@media (max-width: 767.98px) {
  .couponbannerbox{
    .couponbanner {
      height: 180px;
      margin-top: 15px;
    }
    h2{
      font-size:24px;
    }
  }
}

// main
.couponbox {
  background-size: cover;
  background-position: center center;
  padding:40px 0;
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  justify-content:center;
  align-items: center;
  p {
    font-size:20px;
    max-width: 400px;
    margin-bottom: 40px;
    padding:10px;
  }
  .main {
    border:2px solid white;
    position: relative;
    background-color: white;
    max-width: 360px;
    padding:30px;
    .prize{
      width: 150px;
      height: 150px;
      margin: 0 auto;
      border:2px solid black;
      border-radius: 999em;
      display: flex;
      justify-content:center;
      align-items:center;
      font-size:22px;
      span {
        font-size:26px;
        color: red;
      }
    }
    #myCanvas{
      position:absolute;
      top:0;
      left:0;
      z-index: 999;
      // cursor: pointer;
    }
    .coupon {
      input {
        background-color: transparent;
        border: none;
        text-align: center;
        width: 200px;
        height: 50px;
        font-size: 30px;
        font-weight: 500;
        color: red;
        text-shadow: 2px 1px 3px #eac078;
      }
      input:focus {
        outline: none;
      }
      // .copybtn{
      //   position: absolute;
      //   right:10%;
      //   z-index:998;
      // }
    }
  }
}
@media (max-width: 576px) {
  .couponbox {
    margin-top: 30px;
    .main{
      padding:30px;
    }
  }
  footer {
    margin-top:30px
  }
}

</style>
