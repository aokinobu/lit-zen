import { LitElement, html } from 'lit-element';

class ZenProgressElement extends LitElement {

  static get properties() {
    return {
      xp: {
        type: Number,
        // hasChanged(newVal, oldVal) {
        //   if (newVal > oldVal) {
        //     // console.log(`${newVal} > ${oldVal}. hasChanged: true.`);
        //     return true;
        //   }
        //   else {
        //     // console.log(`${newVal} <= ${oldVal}. hasChanged: false.`);
        //     return false;
        //   }
        // }
      }
    };
  }

  render() {
    return html`
      <style> .progress { color: blue;   display: block;  float: left;   border: 1px solid red;   } </style>
      <div class="progress">
      <span class="title">This is the Zen Progress Component.</br></span>
      <span class="tooltip"><button @click=${this.click}>Click</button> for XP:${this.xp}</span><br />
      <zen-commander commanderName="Player"></zen-commander>
      </div>
    `;
  }

  constructor() {
    super();
    this.xp = 0;
  }

  click() {
    let event = new CustomEvent('zen-event-xp-changed', {
      detail: { message: 'xp changed', xp: 100 },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }
}

customElements.define('zen-progress', ZenProgressElement);
