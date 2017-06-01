<template>
  <div class="callout callout-config-container">
    <div class="configurator__app">
      <img src="../assets/img/checks/l-mp101b_01_pr.jpg" alt="">
      <img id="source" alt="" />
      <canvas width="600" height="248" id="myCanvas" style="position:absolute; top:0; left : 0;"></canvas>
      <span hidden>{{ textName }}</span>
      <span hidden>{{ textAddress }}</span>
      <span hidden>{{ textStartingCheckNumber }}</span>
      <span hidden>{{ textRountingNumber }}</span>
      <span hidden>{{ textBankName }}</span>
      <span hidden>{{ textAccountNumber }}</span>
    </div>
  </div>
</template>

<script>

let stage;
let textName;
let textAddress;
let textStartingCheckNumber;
let textRountingNumber;
let textAccountNumber;
let textBankName;
const imageLogoBase = '../static/img/shared/icons/fraud-armor-logo.png';
const imageCheckBase = '../static/img/checks/l-mp101b_01_pr.jpg';

export default {
  mounted() {
    this.createCanvas();
  },
  props: ['textName',
    'textAddress',
    'textStartingCheckNumber',
    'textRountingNumber',
    'textBankName',
    'textAccountNumber',
  ],
  watch: {
    textName(val) {
      textName.text = val;
      this.updateCheck();
    },
    textAddress(val) {
      textAddress.text = val;
      this.updateCheck();
    },
    textStartingCheckNumber(val) {
      textStartingCheckNumber.text = val;
      this.updateCheck();
    },
    textRountingNumber(val) {
      textRountingNumber.text = val;
      this.updateCheck();
    },
    textBankName(val) {
      textBankName.text = val;
      this.updateCheck();
    },
    textAccountNumber(val) {
      textAccountNumber.text = val;
      this.updateCheck();
    },
  },
  methods: {
    normalizedSize() {
      return this.size.trim().toLowerCase();
    },
    createImage(src) {
      const image = new Image();
      image.src = src;
      return image;
    },
    createBitmap(src, xPosition, yPosition) {
      const image = this.createImage(src);

      const map = new window.createjs.Bitmap(image);
      if (xPosition) {
        map.x = xPosition;
      }
      if (yPosition) {
        map.y = yPosition;
      }
      return map;
    },
    createText(textValue, fontType, fontColor, x, y) {
      const text = new window.createjs.Text(textValue, fontType, fontColor);
      text.x = x;
      text.y = y;
      return text;
    },
    createCanvas() {
      stage = new window.createjs.Stage('myCanvas');
      const logo = this.createBitmap(imageLogoBase, 500, 15);

      const imageBody = this.createBitmap(imageCheckBase, 0, 0);
      imageBody.scaleX = 0.75;
      imageBody.scaleY = 0.75;

      stage.addChild(imageBody);
      stage.addChild(logo);

      textName = this.createText('', '10px Arial', '#0000', 20, 15);
      stage.addChild(textName);

      textAddress = this.createText('', '10px Arial', '#0000', 20, 25);
      stage.addChild(textAddress);

      textBankName = this.createText('', '10px Arial', '#0000', 300, 15);
      stage.addChild(textBankName);

      // Footer lines
      const yFooterLine = 215;
      textStartingCheckNumber = this.createText('12345678', '18px micrenc', '#0000', 150, yFooterLine);
      const textRoutingNumberASymbol = this.createText('A', '22px micrenc', '#0000', 185 + textStartingCheckNumber.lineWidth, yFooterLine);
      textRountingNumber = this.createText('12345678', '18px micrenc', '#0000', 150 + textStartingCheckNumber.lineWidth, yFooterLine);
      textAccountNumber = this.createText('12345678', '18px micrenc', '#0000', 150, yFooterLine);

      stage.addChild(textStartingCheckNumber);
      stage.addChild(textRountingNumber);
      stage.addChild(textAccountNumber);
      stage.addChild(textRoutingNumberASymbol);

      // imageBody.image.onload = function () {
        // stage.update();
      // };
    },
    updateCheck() {
      stage.update();
    },
  },
};
</script>
