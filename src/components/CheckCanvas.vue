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
      <span hidden>{{ textAddressLine2 }}</span>
      <span hidden>{{ textSecondNameCompany }}</span>
      <span hidden>{{ textCity }}</span>
      <span hidden>{{ textState }}</span>
      <span hidden>{{ textZip }}</span>
      <span hidden>{{ textCheckNumberPrefix }}</span>

    </div>
  </div>
</template>

<script>
import EventBus from '../event-bus';

let stage;

let personaInfoContainer;
let textName;
let textSecondNameCompany;
let textAddress;
let textAddress2;
let personaDiretionContainer;
let textCity;
let textState;
let textZip;

let micrInfoContainer;
let textStartingCheckNumber;
let textRountingNumber;
let textAccountNumber;
let textBankName;

let textCheckNumberPrefix;

// let currentpersonalInfoYAlign = 15;

const personalInfoBaseXAlign = 20;
const personalInfoBaseYAlign = 15;
const xFooterLine = 150;
const yFooterLine = 215;

const routingNumberSymbol = 'A';
const acountNumberSymbol = 'C';

export default {
  data() {
    return {
      images: {
        imageLogoBase: '../static/img/shared/icons/fraud-armor-logo.png',
        imageCheckBase: '../static/img/checks/l-mp101b_01_pr.jpg',
      },
      fonts: {
        MICR: '18px micrenc',
      },
      ALIGN_DIRECTION: {
        LEFT_TO_RIGHT: 1,
        TOP_TO_BOTTOM: 2,
      },
      MICR_DEFAULT: {
        STARTING_CK_NUMBER: '101',
        ROUTING_NUMBRE: 'A000000000A',
        ACCOUNT_NUMBER: '1234567890C',
      },
    };
  },
  mounted() {
    this.registerListener();
    this.createCanvas();
  },
  props: [
    'textName',
    'textAddress',
    'textAddressLine2',
    'textStartingCheckNumber',
    'textRountingNumber',
    'textBankName',
    'textSecondNameCompany',
    'textAccountNumber',
    'textCheckNumberPrefix',
    'textCity',
    'textState',
    'textZip',
  ],
  watch: {
    textName(val) {
      textName.text = val;
      this.updateContainerFields(personaInfoContainer, personalInfoBaseYAlign, 10,
       this.ALIGN_DIRECTION.TOP_TO_BOTTOM);
    },
    textAddress(val) {
      textAddress.text = val;
      this.updateContainerFields(personaInfoContainer, personalInfoBaseYAlign, 10,
       this.ALIGN_DIRECTION.TOP_TO_BOTTOM);
    },
    textAddressLine2(val) {
      textAddress2.text = val;
      this.updateContainerFields(personaInfoContainer, personalInfoBaseYAlign, 10,
       this.ALIGN_DIRECTION.TOP_TO_BOTTOM);
    },
    textStartingCheckNumber(val) {
      textStartingCheckNumber.text = val !== '' ? val : this.MICR_DEFAULT.STARTING_CK_NUMBER;
      this.setCheckNumberPrefixValue(this.textCheckNumberPrefix);
      this.updateContainerFields(micrInfoContainer, xFooterLine, 10,
       this.ALIGN_DIRECTION.LEFT_TO_RIGHT);
    },
    textRountingNumber(val) {
      textRountingNumber.text = val !== '' ? routingNumberSymbol + val + routingNumberSymbol : this.MICR_DEFAULT.ROUTING_NUMBRE;
      this.updateContainerFields(micrInfoContainer, xFooterLine, 10,
       this.ALIGN_DIRECTION.LEFT_TO_RIGHT);
    },
    textBankName(val) {
      textBankName.text = val;
      this.updateCheck();
    },
    textAccountNumber(val) {
      textAccountNumber.text = val !== '' ? val + acountNumberSymbol : this.MICR_DEFAULT.ACCOUNT_NUMBER;
      this.updateContainerFields(micrInfoContainer, xFooterLine, 10,
       this.ALIGN_DIRECTION.LEFT_TO_RIGHT);
    },
    textSecondNameCompany(val) {
      textSecondNameCompany.text = val;
      this.updateContainerFields(personaInfoContainer, personalInfoBaseYAlign, 10,
       this.ALIGN_DIRECTION.TOP_TO_BOTTOM);
    },
    textCity(val) {
      textCity.text = val;
      this.updateContainerFields(personaInfoContainer, personalInfoBaseYAlign, 10,
       this.ALIGN_DIRECTION.TOP_TO_BOTTOM);
    },
    textState(val) {
      textState.text = val;
      this.updateContainerFields(personaInfoContainer, personalInfoBaseYAlign, 10,
       this.ALIGN_DIRECTION.TOP_TO_BOTTOM);
    },
    textZip(val) {
      textZip.text = val;
      this.updateContainerFields(personaInfoContainer, personalInfoBaseYAlign, 10,
       this.ALIGN_DIRECTION.TOP_TO_BOTTOM);
    },
    textCheckNumberPrefix(val) {
      this.setCheckNumberPrefixValue(val);
      this.updateContainerFields(micrInfoContainer, xFooterLine, 10,
       this.ALIGN_DIRECTION.LEFT_TO_RIGHT);
    },
  },
  methods: {
    setCheckNumberPrefixValue(val) {
      let value = val;
      if (this.textStartingCheckNumber !== undefined && this.textStartingCheckNumber !== '') {
        value += this.textStartingCheckNumber;
      }
      if (value === '') {
        value = this.MICR_DEFAULT.STARTING_CK_NUMBER;
      }
      textCheckNumberPrefix.text = value;
    },
    registerListener() {
      EventBus.$on('reply', (target) => {
        console.log(target);
      });
    },
    updateContainerFields(container, baseAligment, incremental, direction) {
      const childs = container.children;
      let newBaseAligments = baseAligment;
      for (let i = 0, len = childs.length; i < len; i += 1) {
        const child = childs[i];
        if (child instanceof window.createjs.Text && child.text !== '') {
          if (direction === this.ALIGN_DIRECTION.TOP_TO_BOTTOM) {
            child.y = newBaseAligments;
            newBaseAligments += incremental;
          } else {
            child.x = newBaseAligments;
            newBaseAligments += child.getMetrics().width + incremental;
          }
        } else if (child instanceof window.createjs.Container && child.children.length > 0) {
          // need to think a litle bit more this part of the function,
          // is hardcoded to the personaDiretionContainer
          const childBaseAlign = child.id === this.ALIGN_DIRECTION.TOP_TO_BOTTOM ?
            child.y : child.x;
          this.updateContainerFields(child, childBaseAlign - 20, incremental, child.id);
          // child.y = newBaseAligments;
        }
      }
      this.updateCheck();
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
      const logo = this.createBitmap(this.images.imageLogoBase, 500, personalInfoBaseYAlign);
      const imageBody = this.createBitmap(this.images.imageCheckBase, 0, 0);
      imageBody.scaleX = 0.75;
      imageBody.scaleY = 0.75;

      stage.addChild(imageBody);
      stage.addChild(logo);

      // Create Personal Info Container
      this.createPersonalInfoContainer();

      textBankName = this.createText('', '10px Arial', '#0000', 300, 15);
      stage.addChild(textBankName);

      // Creata Footer Container
      this.createMICRInfoContainer();

      textCheckNumberPrefix = this.createText(this.MICR_DEFAULT.STARTING_CK_NUMBER, '10px Arial', '#0000', 510, personalInfoBaseYAlign + 30);
      stage.addChild(textCheckNumberPrefix);

      imageBody.image.onload = function () {
        stage.update();
      };
      this.updateContainerFields(micrInfoContainer, xFooterLine, 10,
        this.ALIGN_DIRECTION.LEFT_TO_RIGHT);
    },
    createMICRInfoContainer() {
      micrInfoContainer = new window.createjs.Container();
      textStartingCheckNumber = this.createText(this.MICR_DEFAULT.STARTING_CK_NUMBER, this.fonts.MICR, '#0000', xFooterLine, yFooterLine);
      textRountingNumber = this.createText(this.MICR_DEFAULT.ROUTING_NUMBRE, this.fonts.MICR, '#0000', xFooterLine, yFooterLine);
      textAccountNumber = this.createText(this.MICR_DEFAULT.ACCOUNT_NUMBER, this.fonts.MICR, '#0000', xFooterLine, yFooterLine);

      micrInfoContainer.addChild(textStartingCheckNumber, textRountingNumber, textAccountNumber);
      stage.addChild(micrInfoContainer);
    },
    createPersonalInfoContainer() {
      personaInfoContainer = new window.createjs.Container();
      personaInfoContainer.x = 0;

      textName = this.createText('', '10px Arial', '#0000', personalInfoBaseXAlign, personalInfoBaseYAlign);
      textSecondNameCompany = this.createText('', '10px Arial', '#0000', personalInfoBaseXAlign, 25);
      textAddress = this.createText('', '10px Arial', '#0000', personalInfoBaseXAlign, 35);
      textAddress2 = this.createText('', '10px Arial', '#0000', personalInfoBaseXAlign, 45);

      personaDiretionContainer = new window.createjs.Container();

      textCity = this.createText('', '10px Arial', '#0000', 0, 55);
      textState = this.createText('', '10px Arial', '#0000', 0, 55);
      textZip = this.createText('', '10px Arial', '#0000', 0, 55);

      personaDiretionContainer.id = this.ALIGN_DIRECTION.LEFT_TO_RIGHT;
      personaDiretionContainer.addChild(textCity, textState, textZip);
      personaDiretionContainer.x = personalInfoBaseXAlign;
      personaInfoContainer.addChild(textName, textSecondNameCompany, textAddress, textAddress2,
        personaDiretionContainer);

      stage.addChild(personaInfoContainer);
    },
    updateCheck() {
      stage.update();
    },
  },
};
</script>
