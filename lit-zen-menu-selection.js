import { LitElement, html } from 'lit-element';

class ZenMenuSelectionElement extends LitElement {

  static get properties() {
    return {
      selectionName: {
        type: String
      },
      showstop: {
        type: Boolean
      }
    };
  }

  render() {
    return html`
      <style> .menuselection { color: blue;   display: block;  float: left;   border: 1px solid red;   } </style>
      <div class="menuselection">
      <span class="title">This is the Zen Menu Selection Component.<br /></span>
      <span class="tooltip">Selection Name:${this.selectionName}</span><br />
      ${this.renderMenu}
      </div>
    `;
  }

  constructor() {
    super();
    this.selectionName = "";
    this.running = false;
    this.showstop = false;
    this.xp = 0;
    this.time = undefined;
    this.addEventListener('click', this.throwClick);
    this.cost = undefined;
  }

  constructor(name, running, showstop, time, xp, cost) {
    super();
    this.selectionName = name;
    this.running = running;
    this.showstop = showstop;
    this.time = time;
    this.xp = xp;
    this.cost = cost;
    this.addEventListener('click', this.throwClick);
    this.interval = undefined;
  }

  setName(name) {
    this.selectionName = name;
  }

  // setRunning(running) {
  //   this.running = running;
  // }

  setShowstop(showstop) {
    this.showstop = showstop;
  }

  setTime(time) {
    this.time = time;
  }

  setXP(xp) {
    this.xp = xp;
  }

  setCost(cost) {
    this.cost = cost;
  }

  purchase(xp) {
      // this.selectionElements should contain the element.
    console.log("purchase selection");

    // check the cost if xpcost < current xp
    console.log(this.cost + "<" + this.xp);

    if (this.cost < xp) {
      // update xp -cost
      let event = new CustomEvent('zen-event-xp-changed', {
        detail: { message: 'xp changed', xp: -this.cost },
        bubbles: true,
        composed: true
      });
      this.dispatchEvent(event);

      // notify that a menu was selected
      // sending just this will not work, object data gets lost in event handling
      let eventPurchased = new CustomEvent('zen-event-selection-purchased', {
        detail: { message: this.cost + ' selection purchased', selection: this.toBaseJSON },
        bubbles: true,
        composed: true
      });
      this.dispatchEvent(eventPurchased);
      return true;
    }
    return false;
  }

  toBaseJSON() {
    return { name: this.selectionName, time: this.time, xp: this.xp, cost: this.cost};
    // running: this.running, 
  }


  export startWorker() {
    console.log("starting" + this.interval + this.xp);
    this.interval = setInterval(this.throwXp, this.time, this.xp);
  }

  stopWorker() {
    clearInterval(this.interval);
  }

  async throwXp() {
    let event = new CustomEvent('zen-event-xp-changed', {
      detail: { message: 'xp changed', xp: this.xp },
      bubbles: true,
      composed: true
    });
    dat.dispatchEvent(event);
  }

  throwClick() {
    let event = new CustomEvent('zen-event-menu-selection', {
    detail: { message: this.selectionName + ' menu selection', selection: this },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }

  get renderMenu() {
    if (this.showstop)
      return html`<button @click=${this.stopWorker}>stop working</button>`;
    else
      return html``;
  }
}

customElements.define('zen-menu-selection', ZenMenuSelectionElement);
