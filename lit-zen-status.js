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

  checkStorage(changedProps) {
    console.log(changedProps);
    if (typeof (Storage) !== "undefined") {
      this.checkStorage();
    } else {
      // this.shadowRoot.getElementById("result").innerHTML = "Sorry, your browser does not support web storage...";
    }
  }

  checkStorage() {
    if (localStorage.statusSelectionsArray === undefined) {
      this.storeArray();
    } else {
      this.loadArray();
    }
  }

  storeArray() {
    console.log("store status");
    console.log(this.selectionsArray);
    localStorage.statusSelectionsArray = JSON.stringify(this.selectionsArray);
  }

  loadArray() {
    console.log("load status");
    this.selectionsArray = JSON.parse(localStorage.statusSelectionsArray);
  }

  get renderSelections() {
    return this.selectionsArray.map(i => html`<zen-menu-selection id="${i.name}" selectionName=${i.name} isMenu="false"></zen-menu-selection>`);
  }

  addSelection(name) {
    this.selectionsArray.push(name);
    this.requestUpdate();
    this.storeArray();
  }

  checkIntervals() {
    let i = 0;
    for (i = 0; i < this.selectionsArray.length; i++) {
      if (this.selectionsArray[i].processing === undefined || !this.selectionsArray[i].processing) {
        let element = this.shadowRoot.getElementById(this.selectionsArray[i].name);
        element.startWorker(this.selectionsArray[i].interval, this.selectionsArray[i].xp);
        this.selectionsArray[i].processing = true;
      }
    }
    this.storeArray();
  }
}

customElements.define('zen-status', ZenStatusElement);
