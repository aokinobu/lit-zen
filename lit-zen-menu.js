import { LitElement, html } from 'lit-element';
// import { ZenMenuSelectionElement } from './lit-zen-menu-selection.js';

class ZenMenuElement extends LitElement {

  static get properties() {
    return {
      xp: {
        // notify: true,
        type: Number,
         hasChanged(newVal, oldVal) {
          console.log(`${newVal} ${oldVal}. hasChanged: true.`);
          return true;
        }
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
      <span class="tooltip">Current XP:</span><br />
      <span class="xp" >${this.xp}</span><br />
      <span class="tooltip">Current Menu:</span><br />
 ${this.renderSelections}

  ${this.footerTemplate}
      </div>
    `;
        // ${this.renderSelections}
  }

  constructor() {
    super();
    this.xp = 0;
    this.menu = "";
    // static array of selection type
    this.selectionsArray = [ { name: "lift", display: false, displayCondition: 100, cost: 100, purchased: false }, { name: "spell", display: false, displayCondition: 500, cost: 500, purchased: false} ];
    console.log("this.selectionsArray");
    console.log(this.selectionsArray);
    // this.selection = new ZenMenuSelectionElement("weight training");

  }

get renderSelections() {
      return html`
${this.selectionsArray.map(i => i.display? html`<zen-menu-selection selectionName="${i.name}" @click="${this.checkCost}" id="${i.name}">`:html``)}
`;
}

  selectionClick(e) {
    console.log(e);
    let element = this.shadowRoot.querySelector('zen-menu-selection');
    element.click();
    console.log(element.name);
  }

  checkCost(e) {
    console.log("checkCost");
    console.log(e);
    var source = e.target || e.srcElement;
    console.log(source);
    console.log(source.id);
    // id is the same as menuSelectionsArray

    // check the cost if xpcost < current xp
    let i = 0;
    for (i = 0; i < this.selectionsArray.length; ++i) {
      console.log(this.selectionsArray[i]);
      if(this.selectionsArray[i].name === source.id) {
        console.log("source id matches");
        console.log(this.xp);
        console.log(this.selectionsArray[i].cost);
        // remove selection from menu
        // update xp -cost
        if (this.selectionsArray[i].cost < this.xp) {
          this.selectionsArray[i].display=false;
          this.selectionsArray[i].purchased=true;
          this.requestUpdate();
          console.log(this.selectionsArray[i].cost + "<" + this.xp);
          let event = new CustomEvent('zen-event-xp-changed', {
            detail: { message: 'xp changed', xp: -this.selectionsArray[i].cost },
            bubbles: true,
            composed: true
          });
          this.dispatchEvent(event);

          let eventPurchased = new CustomEvent('zen-event-selection-purchased', {
            detail: { message: this.selectionsArray[i].cost + ' selection purchased', selection: this.selectionsArray[i] },
            bubbles: true,
            composed: true
          });
          this.dispatchEvent(eventPurchased);
        }
      }
    }
    let element = this.shadowRoot.getElementById(source.id);
    element.disabled = true;

  }

  checkDisplayCondition() {
    console.log(this.selectionsArray);
    let i = 0;
    for (i = 0; i < this.selectionsArray.length; ++i) {
      console.log(this.selectionsArray[i]);
      if(this.xp > this.selectionsArray[i].displayCondition && !this.selectionsArray[i].purchased) {
        this.selectionsArray[i].display=true;
      }
    }
    this.requestUpdate();
  }

    get footerTemplate() {
    return html`<footer>footer</footer>`;
  }
}

customElements.define('zen-menu', ZenMenuElement);
