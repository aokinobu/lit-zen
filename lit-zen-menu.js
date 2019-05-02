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
      <style> .xp { color: orange;   display: block;  float: left;   border: 1px solid orange;   }
      .menu { color: red;   display: block;  float: left;   border: 1px solid red;   }
       </style>
      <div class="menu">
        <span class="title">This is the Zen Menu Component.<br /></span>
        <span class="tooltip">Current Menu:</span><br />
        ${this.renderSelections}
      </div>
    `;
  }

  constructor() {
    super();
    this.xp = 0;
    this.menu = "";
    // static array of selection data
    this.selectionsArray = [{ name: "lift", display: false, displayCondition: 100, cost: 100, purchased: false, xp: 10, interval: 1000 }, { name: "spell", display: false, displayCondition: 500, cost: 500, purchased: false, xp: 1000, interval: 2000 }];
  }

  firstUpdated(changedProps) {
    super.firstUpdated(changedProps);
    this.load();
  }

  updated(changedProps) {
    super.updated(changedProps);
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

  checkCost(e) {
    var source = e.target || e.srcElement;
    // check the cost if xpcost < current xp
    let i = 0;
    for (i = 0; i < this.selectionsArray.length; ++i) {
      // id of element is the same as menuSelectionsArray
      if (this.selectionsArray[i].name === source.id) {
        if (this.selectionsArray[i].cost < this.xp) {
          // remove selection from menu
          this.selectionsArray[i].display = false;
          this.selectionsArray[i].purchased = true;
          this.storeArray();
          this.requestUpdate();
          // update xp -cost
          let event = new CustomEvent('zen-event-xp-changed', {
            detail: { message: 'xp changed', xp: -this.selectionsArray[i].cost },
            bubbles: true,
            composed: true
          });
          this.dispatchEvent(event);

          // notify that a menu was selected
          let eventPurchased = new CustomEvent('zen-event-selection-purchased', {
            detail: { message: this.selectionsArray[i].cost + ' selection purchased', selection: this.selectionsArray[i] },
            bubbles: true,
            composed: true
          });
          this.dispatchEvent(eventPurchased);
        }
      }
    }
  }

  checkDisplayCondition() {
    let i = 0;
    for (i = 0; i < this.selectionsArray.length; ++i) {
      if (this.xp > this.selectionsArray[i].displayCondition && !this.selectionsArray[i].purchased) {
        this.selectionsArray[i].display = true;
      }
    }
    this.storeArray();
    this.requestUpdate();
  }

  updateXp(xp) {
    this.xp = xp;
    this.store();
  }
}

customElements.define('zen-menu', ZenMenuElement);
