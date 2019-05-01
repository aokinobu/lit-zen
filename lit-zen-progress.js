import { LitElement, html } from 'lit-element';

class ZenProgressElement extends LitElement {

  static get properties() {
    return {
      name: {
        type: String
      }, xp: {
        type: Number,
        hasChanged(newVal, oldVal) {
          if (newVal > oldVal) {
            console.log(`${newVal} > ${oldVal}. hasChanged: true.`);
            return true;
          }
          else {
            console.log(`${newVal} <= ${oldVal}. hasChanged: false.`);
            return false;
          }
        }
      }
    };
  }

  render() {
    return html`
      <style> .progress { color: blue;   display: block;  float: left;   border: 1px solid red;   } </style>
      <div class="progress">
      <span class="title">This is the Zen Progress Component.</br></span>
      <span class="tooltip"><button @click=${this.click}>Click</button> for XP:${this.xp}</span><br />
      </div>
    `;
  }

  constructor() {
    super();
    this.name = "Zen Progress";
    this.xp = 0;
  }

  firstUpdated() {
    console.log("zen-progress firstUpdated");

    console.log(this.xp)
  }

  click() {
    this.xp = this.xp + 100;
    let event = new CustomEvent('zen-event-xp-changed', {
      detail: { message: 'xp changed', xp: this.xp },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }

  async getMoreState() {
    return;
  }

  async changeProp() {
    this.prop1 = Math.random();
    await Promise.all(this.updateComplete, this.getMoreState());
    console.log('Update complete. Other state completed.');
  }
}

customElements.define('zen-progress', ZenProgressElement);