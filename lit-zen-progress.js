import { LitElement, html } from 'lit-element';

class ZenProgressElement extends LitElement {

  static get properties() {
    return {
      xp: {
        type: Number
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

  updated(changedProps) {
    this.checkStorage(changedProps);
  }

  checkStorage(changedProps) {
    if (typeof(Storage) !== "undefined") {
      if (localStorage.xp === undefined || changedProps.get("xp") !== undefined) {
        localStorage.xp = this.xp;
      } else {
          this.xp = Number(localStorage.xp);
      }
    } else {
      // this.shadowRoot.getElementById("result").innerHTML = "Sorry, your browser does not support web storage...";
    }
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
