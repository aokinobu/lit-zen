import { LitElement, html } from 'lit-element';

class ZenStorageElement extends LitElement {

  static get properties() {
    return {
    };
  }

  render() {
    return html`
      <style> .progress { color: black;   display: block;  float: left;   border: 1px solid pink;   } </style>
      <div class="storage">
        <button @click=${this.click}>clear</button> storage then refresh browser</span><br />
      </div>
    `;
  }

  constructor() {
    super();
  }

  async click() {
    await localStorage.clear();
    location.reload();
  }

}
customElements.define('zen-storage', ZenStorageElement);
