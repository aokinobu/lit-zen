import { LitElement, html } from 'lit-element';

class ZenMenuSelectionElement extends LitElement {

  static get properties() { 
    return {
      chosen: {
        type: Boolean,
        value: ""
      }
    }
  }

  static get template() {
    return html`
      <style> </style>
      <span class="title">This is a Zen Menu Selection.</br></span>
      [[chosen]]
    `;
  }

  constructor() {
    super();
    this.name = 'selection1';
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