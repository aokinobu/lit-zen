import { LitElement, html } from 'lit-element';

class ZenMenuSelectionElement extends LitElement {

  static get properties() {
    return {
      selectionName: {
        type: String
      },
      isMenu: {
        type: Boolean
      }
    };
  }

  render() {
    return html`
      <style> .progress { color: blue;   display: block;  float: left;   border: 1px solid red;   } </style>
      <div class="menuselection">
      <span class="title">This is the Zen Menu Selection Component.<br /></span>
      <span class="tooltip">Selection Name:${this.selectionName}</span><br />
      ${this.renderMenu}
      </div>
    `;
  }

  constructor() {
    super();
    this.selectionName = "";
    this.running = false;
    this.isMenu = true;
    this.interval = undefined;
  }

  startWorker(time, xp) {
    this.interval = setInterval(this.throwXp, time, this, xp);
  }

  stopWorker() {
    clearInterval(this.interval);
  }

  async throwXp(dat, xpValue) {
    let event = new CustomEvent('zen-event-xp-changed', {
      detail: { message: 'xp changed', xp: xpValue },
      bubbles: true,
      composed: true
    });
    dat.dispatchEvent(event);
  }

  get renderMenu() {
    if (this.isMenu)
      return html``;
    else
      return `<button @click=${this.stopWorker}>stop working</button>`;
  }
}

customElements.define('zen-menu-selection', ZenMenuSelectionElement);
