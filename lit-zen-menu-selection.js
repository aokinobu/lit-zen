import { LitElement, html } from 'lit-element';

class ZenMenuSelectionElement extends LitElement {

  static get properties() {
    return {
      selectionName: {
        type: String
      }
    };
  }

  render() {
    return html`
      <style> .progress { color: blue;   display: block;  float: left;   border: 1px solid red;   } </style>
      <div class="menuselection">
      <span class="title">This is the Zen Menu Selection Component.</br></span>
      <span class="tooltip">Selection Name:${this.selectionName}</span><br />
      </div>
    `;
  }

  constructor() {
    super();
    this.selectionName = "";
    this.running = false;
  }

  // firstUpdated() {
  //   console.log("zen-menu-selection firstUpdated");
  // }

  kickOff() {
    console.log("kickoff");

    console.log(this.selectionName);
  }
}

customElements.define('zen-menu-selection', ZenMenuSelectionElement);
