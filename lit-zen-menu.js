import { LitElement, html } from 'lit-element';

class ZenMenuElement extends LitElement {

  static get properties() {
    return {
      xp: {
        type: Number
      },
      menu: {
        type: String
      }
    }
  }

  render() {
    return html`
      <style> .menu { color: red;   display: block;  float: left;   border: 1px solid red;   }
       </style>
      <div class="menu">
        <span class="title">This is the Zen Menu Component.<br /></span>
        <span class="tooltip">Current Menu:</span><br />
      </div>
    `;
  }

  constructor() {
    super();
    this.xp = 0;
    this.menu = "";

    // static array of selection data
    this.selections = { "lift": { name: "lift", display: false, displayCondition: 100, cost: 100, purchased: false, xp: 10, interval: 1000 }, "spell": { name: "spell", display: false, displayCondition: 500, cost: 500, purchased: false, xp: 1000, interval: 2000 }, "work": { name: "work", display: false, displayCondition: 600, cost: 1000, purchased: false, xp: 3000, interval: 3000 } };
    this.addEventListener('zen-event-menu-selection', this.purchase);
    // this.selectionElements = {};
  }

  firstUpdated(changedProps) {
    super.firstUpdated(changedProps);
    this.load();
  }

  updateXp(xp) {
    this.xp = xp;
    this.store();
  }

  checkDisplayCondition() {
    console.log("checkDisplayCondition");

    let ZenSelection = customElements.get('zen-menu-selection');

    for (let name in this.selections) {
      if (this.xp > this.selections[name].displayCondition && !this.selections[name].display) {
        
        // let zenSelection = new ZenSelection(this.selections[name].name, this.selections[name].running, this.selections[name].showstop, this.selections[name].interval, this.selections[name].xp, this.selections[name].cost);
        let zenSelection = new ZenSelection();
        zenSelection.setName(name);
        zenSelection.setShowstop(false);
        zenSelection.setTime(this.selections[name].interval);
        zenSelection.setXP(this.selections[name].xp)
        zenSelection.setCost(this.selections[name].cost);
        
        console.log(zenSelection.toBaseJSON());
        zenSelection.id=name;
        // this.selectionElements[name] = this.shadowRoot.appendChild(zenSelection);;
        this.selections[name].display = true;
      }
    }

    this.storeArray();
    this.requestUpdate();
  }

  purchase(e) {
    console.log("purchase");
    console.log(e.detail);
    console.log(e.detail.selection);
    console.log(e.detail.selection.selectionName);

    let result = e.detail.selection.purchase(this.xp);
    console.log(result);
    if (result) {
      // remove selection from menu
      
      console.log(this.selectionElements);
      console.log(this.shadowRoot.getElementById(e.detail.selection.selectionName));
      this.shadowRoot.removeChild(this.shadowRoot.getElementById(e.detail.selection.selectionName));
    } else {
      // cannot purchase;
    }
  }

  store() {
    if (typeof (Storage) !== "undefined") {
      localStorage.menuxp = this.xp;
      this.storeArray();
    } else {
      // this.shadowRoot.getElementById("result").innerHTML = "Sorry, your browser does not support web storage...";
    }
  }

  load() {
    if (typeof (Storage) !== "undefined") {
      if (localStorage.menuxp !== undefined) {
        this.xp = Number(localStorage.menuxp);
      }
      this.loadArray();
    } else {
      // this.shadowRoot.getElementById("result").innerHTML = "Sorry, your browser does not support web storage...";
    }
  }

  storeArray() {
    localStorage.menuSelectionsArray = JSON.stringify(this.selectionsArray);
  }

  loadArray() {
    if (localStorage.menuSelectionsArray !== undefined) {
      this.selectionsArray = JSON.parse(localStorage.menuSelectionsArray);
    }
  }

  get renderSelections() {
    return html`${this.selectionsArray.map(i => i.display ? html`<zen-menu-selection selectionName="${i.name}" @click="${this.checkCost}" id="${i.name}">` : html``)}`;
  }
}

customElements.define('zen-menu', ZenMenuElement);
