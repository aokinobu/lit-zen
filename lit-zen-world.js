import { LitElement, html } from 'lit-element';

class ZenWorldElement extends LitElement {

  static get properties() {
    return {
      viewMode: {
        type: String
      }
    };
  }

  render() {
    return html`
      <style> .world { color: black;   display: block;  float: left;   border: 1px solid green;   } </style>
      <div class="world">
      <span class="title">This is the world component.</br></span>
      <zen-game></zen-game>
      </div>
    `;
  }

  constructor() {
    super();
    this.viewMode = "";
  }
}

customElements.define('zen-world', ZenWorldElement);
