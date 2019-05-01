import { LitElement, html } from 'lit-element';
import './polymer-zen-progress.js';
import './polymer-zen-menu.js';

class MyElement extends LitElement {

  static get properties() {
    return {
      name: { type: String },
    };
  }

  constructor() {
    super();
    this.name = 'Zen Project';
    this.addEventListener('zen-event-xp-changed', this.modifyXp);
  }

  render() {
    return html`
    <style> .title { color: green; } .xp { color: purple;   display: block;  float: left;   border: 1px 
solid purple;   } </style>
    <p>Hello, Welcome to ${this.name}!</p>
    <span class="tooltip">Here is your progress</span><br />
    <zen-progress></zen-progress></br> 
    <span class="tooltip">Choose something from the menu</span><br />
    <zen-menu class="xp"></zen-menu>`;
  }

  firstUpdated() {
    console.log("zen-main firstUpdated");
  }

  updated(changedProps) {
    console.log("updated");
    console.log(changedProps.get('xp'));
  }

  onXpChanged() {
    console.log("xp changed");
  }

  modifyXp(e) {
    console.log("xp modified");
    console.log(e);
    console.log(e.detail.message);
    console.log(e.detail.xp);

    // click.detail.xp=this.xp;

    let element = this.shadowRoot.querySelector('zen-menu');
    element.xp = e.detail.xp;
    console.log(element);
    element.updateMenu();
  }

  modifyXpClick(e) {
    console.log("click xp modified");
    console.log(e);
    console.log(e.composedPath()[0])
    let element = this.shadowRoot.querySelector('zen-menu');
    console.log(element);
    element.updateMenu();
  }

  handleEvent(e) {
    console.log(e.bubbles);
  }

}

customElements.define('wc-zen', MyElement);
