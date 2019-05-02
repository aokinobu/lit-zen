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

  firstUpdated(changedProps) {
    super.firstUpdated(changedProps);
    this.loadArray();
    this.updateIntervals();
  }

  updated(changedProps) {
    super.updated(changedProps);
    // this.loadArray();
  }

  checkStorage(changedProps) {
    console.log(changedProps);
    if (typeof (Storage) !== "undefined") {
      this.checkStorageArray();
    } else {
      // this.shadowRoot.getElementById("result").innerHTML = "Sorry, your browser does not support web storage...";
    }
  }

  checkStorageArray() {
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
    if (localStorage.statusSelectionsArray !== undefined) {
      console.log("load status");
      this.selectionsArray = JSON.parse(localStorage.statusSelectionsArray);
    }
  }

  get renderSelections() {
    return this.selectionsArray.map(i => html`<zen-menu-selection id="${i.name}" selectionName=${i.name} isMenu="false"></zen-menu-selection>`);
  }

  async addSelection(name) {
    this.selectionsArray.push(name);
    await this.requestUpdate();
    this.checkIntervals();
  }

  checkIntervals() {
    console.log("checkIntervals");
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

  async updateIntervals() {
    console.log("updateIntervals");
    console.log(this.selectionsArray);
    await this.updateComplete;
    let i = 0;
    for (i = 0; i < this.selectionsArray.length; i++) {
      console.log(this.selectionsArray[i].processing === undefined || this.selectionsArray[i].processing);
      if (this.selectionsArray[i].processing === undefined || this.selectionsArray[i].processing) {
        console.log(this.selectionsArray[i].name);
        let element = this.shadowRoot.getElementById(this.selectionsArray[i].name);
        console.log( element);
        element.startWorker(this.selectionsArray[i].interval, this.selectionsArray[i].xp);
      }
    }
  }
}

customElements.define('zen-status', ZenStatusElement);
