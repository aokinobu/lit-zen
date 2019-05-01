import {PolymerElement, html} from '@polymer/polymer';
import 'polymer-zen-progress/index.js';

class MyElement extends PolymerElement {

  static get properties() { }

  static get template() {
    return html`
      <style> .xp { color: green; } </style>
      Welcome to Zen
      <zen-progress />
      <zen-menu />
    `;
  }
}

customElements.define('wc-zen', MyElement);
