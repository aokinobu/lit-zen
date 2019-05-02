import { LitElement, html } from 'lit-element';

class ZenCommanderElement extends LitElement {

  static get properties() {
    return {
      commanderName: {
        type: String
      }
    };
  }

  render() {
    return html`
      <style> .commander { color: DarkGreen;   display: block;  float: left;   border: 1px solid DarkGreen;   } </style>
      <div class="commander">
      <span class="title">This is the Commander component.</br></span>
      <span class="tooltip">Commander Name:${this.commanderName}</span><br />
      </div>
    `;
  }

  constructor() {
    super();
    this.commanderName = "";
  }
}

customElements.define('zen-commander', ZenCommanderElement);
