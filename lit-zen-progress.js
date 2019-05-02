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

  firstUpdated(changedProps) {
    super.firstUpdated(changedProps);
    this.load();
  }

  updated(changedProps) {
    super.updated(changedProps);
  }

  checkStorage(changedProps) {
    if (typeof(Storage) !== "undefined") {
      if (localStorage.xp === undefined || changedProps.get("xp") !== undefined) {
        this.store();
      } else {
        this.load();
      }
    } else {
      // this.shadowRoot.getElementById("result").innerHTML = "Sorry, your browser does not support web storage...";
    }
  }

  store() {
    localStorage.xp = Number(this.xp);
  }

  load() {
    if (localStorage.xp !== undefined) {
      this.xp = Number(localStorage.xp);
    }
  }

  updateXp(xp) {
    this.xp = xp;
    this.store();
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
