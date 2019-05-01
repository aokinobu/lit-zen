import { LitElement, html } from 'lit-element';

class ZenMenuSelectionElement extends LitElement {

  static get properties() {
    return {
      name: {
        type: Boolean
      },
      chosen: {
        type: Boolean
      }
    }
  }

  static get template() {
    return html`
      <style> </style>
      <span class="title">This is a Zen Menu Selection.</br></span>
      ${this.chosen}
    `;
  }

  constructor() {
    super();
    this.name = '';
    this.chosen = false;
  }

  ready() {
    super.ready();
  }

  click() {
    console.log("click");
    this.chosen = true;
  }

  canDisplay() {

  }
}

customElements.define('zen-menu-selection', ZenMenuSelectionElement);
