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

  firstUpdated(changedProperties) {
    // let elements = this.shadowRoot.querySelectorAll('zen-menu-selection');
    // let i = 0;
    // for(i = 0; i < elements.length; i++) {
    //   elements[i].startWorker();
    // }
  }

  get renderSelections() {
    return this.selectionsArray.map(i => html`<zen-menu-selection id="${i.name}" selectionName=${i.name} isMenu="false"></zen-menu-selection>`);
  }

  updated(changedProperties) {
    this.checkIntervals();
  }

  async addSelection(name) {
    console.log("addSelection");
    console.log(name);
    this.selectionsArray.push(name);
    this.requestUpdate();
  }

  checkIntervals() {
    console.log("checking intervals");
    let i = 0;
    for (i = 0; i < this.selectionsArray.length; i++) {
      console.log(this.selectionsArray[i].name);
      console.log(this.selectionsArray[i].processing);
      if (this.selectionsArray[i].processing === undefined || !this.selectionsArray[i].processing) {
        let element = this.shadowRoot.getElementById(this.selectionsArray[i].name);
        element.startWorker(this.selectionsArray[i].interval, this.selectionsArray[i].xp);
        this.selectionsArray[i].processing = true;
      }
    }
  }
}

customElements.define('zen-status', ZenStatusElement);
