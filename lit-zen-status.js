import { LitElement, html } from 'lit-element';
import './lit-zen-menu-selection.js';

class ZenStatusElement extends LitElement {

  static get properties() {
    return {
      selectionsArray: {
        type: Array
      }
    }
  }

  render() {
    let liftSelection = { name: "lift" };
    return html`
      <style> .zen-status { color: DarkBlue;   display: block;  clear: both;   border: 1px solid DarkBlue;   }
      </style>
      <div class="zen-status">
        <span class="title">This is the Zen Status Component.<br /></span>
        <span class="tooltip">Current Selections:</span><br />
        <span class="selections" >${this.renderSelections}</span><br />
      </div>
    `;
  }

  constructor() {
    super();
    // static array of selection type
    this.selectionsArray = [];
  }

  get renderSelections() {
    return this.selectionsArray.map(i => html`<zen-menu-selection id="${i.name}" selectionName=${i.name}></zen-menu-selection>`);
  }

  async addSelection(name) {
    console.log("addSelection");
    console.log(name);
    this.selectionsArray.push(name);
    this.requestUpdate();
  }
}

customElements.define('zen-status', ZenStatusElement);
