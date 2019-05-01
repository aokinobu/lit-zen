import { LitElement, html } from 'lit-element';

export class ZenMenuSelectionElement extends LitElement {

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
      Name: ${this.name}
      Chosen: ${this.chosen}
    `;
  }

  constructor() {
    super();
    this.name = '';
    this.chosen = false;
  }

  ZenMenuSelectionElement(name) {
    this.name = name;
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
