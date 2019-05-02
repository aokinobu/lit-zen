import { LitElement, html } from 'lit-element';
import './lit-zen-progress.js';
import './lit-zen-menu.js';
import './lit-zen-menu-selection.js';
import './lit-zen-status.js';
import './lit-zen-commander.js';
import './lit-zen-world.js';
import './lit-zen-game.js';

class ZenElement extends LitElement {

  static get properties() {
    return {
      name: { type: String },
    };
  }

  constructor() {
    super();
    this.name = 'Zen Project';
    this.addEventListener('zen-event-xp-changed', this.xpChanged);
    this.addEventListener('zen-event-console-message', this.consoleMessage);
    this.addEventListener('zen-event-selection-purchased', this.selectionPurchased);
    this.elementCount = 0;
  }

  render() {
    return html`
    <style> .title { color: green; } .xp { color: purple;   display: block;  float: left;   border: 1px
solid purple;   } </style>
    <div class="zen">
      <p>Hello, Welcome to ${this.name}!</p>
      <zen-progress></zen-progress>
      <zen-world></zen-world>
      <zen-menu class="xp" ></zen-menu>
      <zen-status></zen-status>
      <zen-console></zen-console>
      console message:${this.message}
    </div>`;
  }

  xpChanged(e) {
    let elementProgress = this.shadowRoot.querySelector('zen-progress');
    elementProgress.xp = elementProgress.xp + e.detail.xp;
    let element = this.shadowRoot.querySelector('zen-menu');
    element.xp = element.xp + e.detail.xp;
    element.checkDisplayCondition();
  }

  consoleMessage(e) {
    this.message = e.detail.message;
  }

  selectionPurchased(e) {
    console.log("selectionPurchased");
    console.log(e.detail.selection);
    let element = this.shadowRoot.querySelector('zen-status');
    element.addSelection(e.detail.selection);
  }
}

customElements.define('lit-zen', ZenElement);
